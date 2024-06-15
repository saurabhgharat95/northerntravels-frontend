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
} from "../components/CommonImport";
import {
  FETCH_UPDATED_ROOM_RATES_API,
  FETCH_DASHBOARD_COUNT_API,
  FETCH_TOP_DESTINATIONS_API,
  FETCH_QUOTATION_MONTHLY_COUNT_API,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";

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
    CategoryScale
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

  const fetchDashboardCount = async () => {
    try {
      let url = FETCH_DASHBOARD_COUNT_API;

      let response = await axios.post(url);
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
      let url = FETCH_QUOTATION_MONTHLY_COUNT_API;

      let response = await axios.post(url);
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

          console.log(data);

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

  useEffect(() => {
    fetchDashboardCount();
    fetchUpdatedRoomRates();
    fetchTopDestinations();
    fetchQuotationMonthlyCount();
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
                  {/* <div className="col-12 col-xl-4">
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
                          <i className="mdi mdi-calendar"></i> Today (
                          {getTodaysDate()})
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuDate2"
                        >
                          <a className="dropdown-item" href="#">
                            January - March
                          </a>
                          <a className="dropdown-item" href="#">
                            March - June
                          </a>
                          <a className="dropdown-item" href="#">
                            June - August
                          </a>
                          <a className="dropdown-item" href="#">
                            August - November
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card tale-bg">
                  <div className="card-people mt-auto">
                    <img src="images/dashboard/people.svg" alt="people" />
                    <div className="weather-info"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin transparent dashboard-count-div">
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
              </div>
            </div>
            <div className="row">
              {topDestObj.data.length > 1 && (
                <div className="col-md-6 mb-4 stretch-card transparent dashboard-card">
                  <div className="card ">
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
                  <div className="card ">
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
                          <Line data={topDestObj.lineChart} />
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
