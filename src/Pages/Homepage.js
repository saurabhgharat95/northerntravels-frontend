import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  axios,
  ShimmerTitle,
  Marquee,
  ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Pie,
  Line,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  BarElement,
  Bar,
} from "../components/CommonImport";
import {
  FETCH_UPDATED_ROOM_RATES_API,
  FETCH_DASHBOARD_COUNT_API,
  FETCH_TOP_DESTINATIONS_API,
  FETCH_QUOTATION_MONTHLY_COUNT_API,
  FETCH_QUOTATIONS_API,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { getDateFormattedForDB, getCookie } from "../utils/helpers";

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [countObj, setCountObj] = useState({
    quotCount: 0,
    leadsCount: 0,
    tourCount: 0,
    hotelsCount: 0,
    isCountReady: false,
  });
  const [topDestObj, setTopDestObj] = useState({
    data: [],
    chart: null,
    lineChart: null,
    upcomingQuotations: [],
  });
  const currentDate = new Date();
  const todaysDate = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const [filterObj, setFilterObj] = useState({
    selUser: "",
    fromDate: todaysDate,
    toDate: todaysDate,
  });
  const [dateFilterObj, setDateFilterObj] = useState({
    filterName: "1",
  });
  const [roomRateData, setRoomRateData] = useState({});
  const navigate = useNavigate();
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    BarElement
  );

  const getTodaysDate = () => {
    var currentDate = new Date();

    // Array of month names
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract the day, month, and year
    var day = currentDate.getDate();
    var monthIndex = currentDate.getMonth();
    var year = currentDate.getFullYear();

    // Get the month name from the array
    var monthName = monthNames[monthIndex];

    // Concatenate the date components into the desired format
    var formattedDate = day + " " + monthName + ", " + year;
    return formattedDate;
  };
  const getDateTwoWeeksFromToday = () => {
    // Get today's date
    let today = new Date();

    // Add 14 days to today's date (two weeks)
    today.setDate(today.getDate() + 14);

    // Format the date as dd-mm-yyyy
    let day = today.getDate();
    let month = today.getMonth() + 1; // getMonth() returns 0-based index
    let year = today.getFullYear();

    // Pad day and month with leading zeros if necessary
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    // Return the formatted date string
    return `${day}-${month}-${year}`;
  };
  const twoWeeksFromToday = getDateTwoWeeksFromToday();
  const getNavUrl = () => {
    return (
      "/quotations?filter=" +
      (dateFilterObj.filterName == "1" ? "today" : "all" + "")
    );
  };
  const fetchDashboardCount = async (fromDate, toDate) => {
    try {
      let userId = getCookie("ntId");
      let url = FETCH_DASHBOARD_COUNT_API;
      let body = {
        userId: userId,
        fromDate: fromDate,
        toDate: toDate,
      };

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let data = response.data.data;

          setCountObj((prevState) => ({
            ...prevState,
            quotCount: data.quotationsCount,
            hotelsCount: data.hotelsCount,
            tourCount: data.tourCount,
            leadsCount: data.leadsCount,
            isCountReady: true,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchUpdatedRoomRates = async () => {
    try {
      let url = FETCH_UPDATED_ROOM_RATES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setRoomRateData(response.data.data);
        }
      }
    } catch (e) {}
  };
  const fetchTopDestinations = async () => {
    try {
      let url = FETCH_TOP_DESTINATIONS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let topDest = response.data.data;
          if (topDest.length > 0) {
            const labels = topDest.slice(0, 10).map((item) => item.stateName);
            const data = topDest
              .slice(0, 10)
              .map((item) => item.quotation_count);
            const backgroundColor = [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(201, 203, 207, 0.2)",
              "rgba(255, 99, 71, 0.2)",
              "rgba(144, 238, 144, 0.2)",
              "rgba(255, 182, 193, 0.2)",
            ];

            const borderColor = [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(201, 203, 207, 1)",
              "rgba(255, 99, 71, 1)",
              "rgba(144, 238, 144, 1)",
              "rgba(255, 182, 193, 1)",
            ];

            while (backgroundColor.length < data.length) {
              backgroundColor.push("rgba(255, 159, 64, 0.2)");
              borderColor.push("rgba(255, 159, 64, 1)");
            }
            const pieData = {
              labels: labels,
              datasets: [
                {
                  label: "# of Quotations",
                  data: data,
                  backgroundColor: backgroundColor.slice(0, data.length),
                  borderColor: borderColor.slice(0, data.length),
                  borderWidth: 1,
                },
              ],
            };

            setTopDestObj((prevState) => ({
              ...prevState,
              data: topDest,
              chart: pieData,
            }));
          }
        }
      }
    } catch (e) {}
  };
  const fetchQuotationMonthlyCount = async () => {
    try {
      let userId = getCookie("ntId");
      let body = {
        userId: userId,
      };
      let url = FETCH_QUOTATION_MONTHLY_COUNT_API;

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          const monthDataMap = {};
          let monthCount = response.data.data;
          const labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ];

          monthCount.forEach((item) => {
            // Ensure month is two digits
            const month = String(item.month).padStart(2, "0");
            monthDataMap[month] = item.quotation_count;
          });

          // Map month names to their respective numeric values
          const monthMap = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sept: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
          };

          // Prepare the data array ensuring all months are included
          const data = labels.map((label) => {
            const month = monthMap[label]; // Get the month number from the label
            return monthDataMap[month] || 0;
          });

          let lineData = {
            labels,
            datasets: [
              {
                label: "Quotation Count",
                data: data,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          };

          setTopDestObj((prevState) => ({
            ...prevState,
            lineChart: lineData,
          }));
        }
      }
    } catch (e) {
      console.error("Error fetching monthly quotation count:", e);
    }
  };
  const fetchQuotations = async () => {
    try {
      let userId = getCookie("ntId");
      let url =
        FETCH_QUOTATIONS_API +
        "?selUser=" +
        (filterObj.selUser != ""
          ? filterObj.selUser
          : encodeURIComponent(userId)) +
        "&fromDate=" +
        (filterObj.fromDate != "" ? filterObj.fromDate : "") +
        "&toDate=" +
        (filterObj.toDate != "" ? filterObj.toDate : "");
      let body = {
        userId: userId,
      };

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let quotationsObjects = response.data.data;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const twoWeeksLater = new Date(today);
          twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

          // Filter quotations where quotArrivalDate is within the next two weeks
          const filteredQuotations = quotationsObjects.filter((quot) => {
            const arrivalDate = new Date(quot.quotArrivalDate);
            arrivalDate.setHours(0, 0, 0, 0);
            return arrivalDate >= today && arrivalDate <= twoWeeksLater;
          });
          setTopDestObj((prevState) => ({
            ...prevState,
            upcomingQuotations: filteredQuotations,
          }));
        }
      }
    } catch (e) {
      console.error("Error fetching monthly quotation count:", e);
    }
  };

  useEffect(() => {
    fetchDashboardCount(filterObj.fromDate, filterObj.toDate);
    fetchUpdatedRoomRates();
    fetchTopDestinations();
    fetchQuotationMonthlyCount();
    fetchQuotations();
  }, []);
  return (
    <div className="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div className="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="row">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h3 className="font-weight-bold">Welcome Admin</h3>
                  </div>
                  <br></br>
                  <br></br>
                  <div className="col-12 col-xl-4 pr-0">
                    <div className="justify-content-end d-flex">
                      <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                        <button
                          className="btn btn-sm btn-light bg-white dropdown-toggle"
                          type="button"
                          id="dropdownMenuDate2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          {dateFilterObj.filterName == "1"
                            ? "Today (" + getTodaysDate() + ")"
                            : "All Time"}
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuDate2"
                        >
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => {
                              fetchDashboardCount("", "");
                              setDateFilterObj((prevState) => ({
                                ...prevState,
                                filterName: "2",
                              }));
                            }}
                          >
                            All Time
                          </a>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => {
                              setDateFilterObj((prevState) => ({
                                ...prevState,
                                filterName: "1",
                              }));
                              fetchDashboardCount(todaysDate, todaysDate);
                            }}
                          >
                            Today ({getTodaysDate()})
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {roomRateData && roomRateData.length > 0 && (
                    <Marquee pauseOnHover={true} className="marquee-homepage">
                      {roomRateData.map((room) => (
                        <>
                          <div className="flex">
                            <ion-icon
                              size="small"
                              name="star"
                              color="warning"
                              style={{ marginTop: "-2px", marginRight: "8px" }}
                            >
                              {" "}
                            </ion-icon>
                            <h5 className="mb-0">
                              Price for <b>{room.hotelName} </b>{" "}
                              {room.roomTypeName} room{" "}
                              <b>{room.mealPlanName}</b> meal for{" "}
                              <b>{room.rmAccmName}</b>{" "}
                              {room.oldValue > room.newValue
                                ? "decreased"
                                : "increased"}{" "}
                              from <b>Rs.{room.oldValue}</b> to{" "}
                              <b>Rs.{room.newValue}</b>{" "}
                            </h5>
                            <ion-icon
                              size="small"
                              name="star"
                              color="warning"
                              style={{ marginTop: "-2px", marginLeft: "8px" }}
                            ></ion-icon>
                          </div>
                        </>
                      ))}
                    </Marquee>
                  )}
                  
                </div>
              </div>
            </div>
            <div className=" grid-margin transparent dashboard-count-div">
              <div className="row">
                <div className="col-md-3  stretch-card transparent dashboard-card ">
                  <div className="card dashboard-card-1">
                    <div
                      className="card-body"
                      onClick={() => navigate(getNavUrl())}
                    >
                      {!countObj.isCountReady && (
                        <ShimmerTitle line={2} gap={10} variant="primary" />
                      )}
                      <div className="row ml-2">
                        <div className="circle-div-1 mt-1">
                          <ion-icon name="document-text"></ion-icon>
                        </div>
                        <div className="text-container ml-2">
                          <p className="mb-2">Quotations</p>
                          <p className="mb-2 value-txt count-color-1">
                            {countObj.quotCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3  stretch-card transparent dashboard-card">
                  <div
                    className="card dashboard-card-2"
                    onClick={() => navigate("/hotels")}
                  >
                    <div className="card-body">
                      {!countObj.isCountReady && (
                        <ShimmerTitle line={2} gap={10} variant="primary" />
                      )}
                      <div className="row ml-2">
                        <div className="circle-div-2 mt-1">
                          <ion-icon name="business"></ion-icon>
                        </div>
                        <div className="text-container ml-2">
                          <p className="mb-2">Hotels</p>
                          <p className="mb-2 value-txt count-color-2">
                            {countObj.hotelsCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3  stretch-card transparent dashboard-card">
                  <div
                    className="card dashboard-card-3"
                    onClick={() => navigate("/tours")}
                  >
                    <div className="card-body">
                      {!countObj.isCountReady && (
                        <ShimmerTitle line={2} gap={10} variant="primary" />
                      )}

                      <div className="row ml-2">
                        <div className="circle-div-3 mt-1">
                          <ion-icon name="map"></ion-icon>
                        </div>
                        <div className="text-container ml-2">
                          <p className="mb-2">Tours</p>
                          <p className="mb-2 value-txt count-color-3">
                            {countObj.tourCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3  stretch-card transparent dashboard-card">
                  <div
                    className="card dashboard-card-4"
                    onClick={() => navigate("/leads")}
                  >
                    <div className="card-body">
                      {!countObj.isCountReady && (
                        <ShimmerTitle line={2} gap={10} variant="primary" />
                      )}
                      <div className="row ml-2">
                        <div className="circle-div-4 mt-1">
                          <ion-icon name="people"></ion-icon>
                        </div>
                        <div className="text-container ml-2">
                          <p className="mb-2">Leads</p>
                          <p className="mb-2 value-txt count-color-4">
                            {countObj.leadsCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row"> */}

            {/* <div className="col-md-6 grid-margin transparent dashboard-count-div">
                <div className="row">
                  <div className="col-md-6 mb-4 stretch-card transparent dashboard-card">
                    <div className="card card-tale ">
                      <div
                        className="card-body"
                        onClick={() => navigate("/quotations")}
                      >
                                 <img className="circle" src="../../images/circle.svg" alt="image" />
                        {!countObj.isCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isCountReady && (
                          <>
                            <p className="mb-4">Quotations</p>
                            <p className="fs-30 mb-2">{countObj.quotCount}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 stretch-card transparent dashboard-card">
                    <div
                      className="card card-dark-blue"
                      onClick={() => navigate("/hotels")}
                    >
                      <div className="card-body">
                      <img className="circle" src="../../images/circle.svg" alt="image" />
                        {!countObj.isCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isCountReady && (
                          <>
                            <p className="mb-4">Hotels</p>
                            <p className="fs-30 mb-2">{countObj.hotelsCount}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent dashboard-card">
                    <div
                      className="card card-light-blue"
                      onClick={() => navigate("/tours")}
                    >
                      <div className="card-body">
                      <img className="circle" src="../../images/circle.svg" alt="image" />
                        {!countObj.isCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isCountReady && (
                          <>
                            <p className="mb-4">Tours</p>
                            <p className="fs-30 mb-2">{countObj.tourCount}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 stretch-card transparent dashboard-card">
                    <div
                      className="card card-light-danger"
                      onClick={() => navigate("/leads")}
                    >
                      <div className="card-body">
                      <img className="circle" src="../../images/circle.svg" alt="image" />
                        {!countObj.isCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isCountReady && (
                          <>
                            <p className="mb-4">Leads</p>
                            <p className="fs-30 mb-2">{countObj.leadsCount}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
            <div className="row">
              <div className="col-md-6 mb-4 grid-margin stretch-card">
                <div className="card tale-bg dashboard-card-shadow">
                  <div className="card-people mt-auto">
                    <img src="images/dashboard/people.svg" alt="people" />
                    <div className="weather-info"></div>
                  </div>
                </div>
              </div>
              {topDestObj.data.length > 1 && (
                <div className="col-md-6 mb-4 stretch-card transparent ">
                  <div className="card dashboard-card-shadow">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 pl-0">
                          <div class="ml-xl-4 mt-3">
                            <p class="card-title">Top Destinations</p>
                            <p class="mb-2 mb-xl-0">
                              The pie chart displays the top destinations that
                              have been most frequently chosen in travel
                              quotations.
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          {topDestObj.chart && (
                            <Pie
                              style={{ margin: "0 auto" }}
                              data={topDestObj?.chart}
                              options={{
                                responsive: false,
                                maintainAspectRatio: false,
                              }}
                              height={300}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {topDestObj.lineChart && (
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card dashboard-card-shadow">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 pl-0">
                          <div class="ml-xl-4 mt-3">
                            <p class="card-title">Monthly Travel Quotation</p>
                            <p class="mb-2 mb-xl-0">
                              The chart illustrates the monthly count of travel
                              quotations for the current year. Months with no
                              quotations are shown with a count of zero,
                              ensuring a comprehensive view of the entire year.
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <Bar data={topDestObj.lineChart} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {topDestObj.upcomingQuotations.length > 0 && (
                <div className="col-md-6 mb-4 stretch-card transparent ">
                  <div className="card dashboard-card-shadow">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 pl-0">
                          <div class="ml-xl-4 mt-3 mb-4">
                            <p class="card-title">Upcoming Arrivals</p>
                            <p class="mb-3 mb-xl-0">
                              See quotations with arrival dates scheduled
                              between today and {twoWeeksFromToday}
                            </p>
                          </div>
                          <table class="table table">
                            <thead>
                              <tr>
                                <th class="pt-1 ps-0">Quotation No.</th>
                                <th class="pt-1 ps-0">Customer Name</th>
                                <th class="pt-1">Arrival Date</th>
                                <th class="pt-1">Departure Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {topDestObj.upcomingQuotations.map((quot) => (
                                <tr>
                                  <td class="py-1 ps-0">
                                    <div class="d-flex align-items-center">
                                      <div class="ms-3">
                                        <p class="mb-0  text-small">
                                          {quot.quotNo}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{quot.quotClientName}</td>
                                  <td>
                                    {getDateFormattedForDB(
                                      quot.quotArrivalDate
                                    )}
                                  </td>
                                  <td>
                                    {getDateFormattedForDB(
                                      quot.quotDepartureDate
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2024. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
