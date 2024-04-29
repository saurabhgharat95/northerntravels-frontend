import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { axios, ShimmerTitle } from "../components/CommonImport";
import {
  FETCH_HOTELS_API,
  FETCH_QUOTATIONS_API,
  FETCH_LEADS_API,
  FETCH_TOURS_API,
} from "../utils/constants";
const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [countObj, setCountObj] = useState({
    quotCount: 0,
    leadsCount: 0,
    tourCount: 0,
    hotelsCount: 0,
    isQuotCountReady: false,
    isLeadCountReady: false,
    isTourCountReady: false,
    isHotelCountReady: false,
  });
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
  const fetchQuotations = async () => {
    try {
      let url = FETCH_QUOTATIONS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setCountObj((prevState) => ({
            ...prevState,
            quotCount: response.data.data.length,
            isQuotCountReady: true,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchHotels = async () => {
    try {
      let url = FETCH_HOTELS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setCountObj((prevState) => ({
            ...prevState,
            hotelsCount: response.data.data.length,
            isHotelCountReady: true,
          }));
        }
      }
    } catch (e) {}
  };

  const fetchTours = async () => {
    try {
      let url = FETCH_TOURS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setCountObj((prevState) => ({
            ...prevState,
            tourCount: response.data.data.length,
            isTourCountReady: true,
          }));
        }
      }
    } catch (e) {
      setDataReady(true);
      setTours([]);
    }
  };
  const fetchLeads = async () => {
    try {
      let url = FETCH_LEADS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setCountObj((prevState) => ({
            ...prevState,
            leadsCount: response.data.data.length,
            isLeadCountReady: true,
          }));
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchQuotations();
    fetchHotels();
    fetchTours();
    fetchLeads();
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
                  <div className="col-12 col-xl-4">
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
                  </div>
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
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                      <div className="card-body">
                        {!countObj.isQuotCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isQuotCountReady && (
                          <>
                            <p className="mb-4">Quotations</p>
                            <p className="fs-30 mb-2">{countObj.quotCount}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                      <div className="card-body">
                        {!countObj.isHotelCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isHotelCountReady && (
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
                  <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                    <div className="card card-light-blue">
                      <div className="card-body">
                        {!countObj.isTourCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isTourCountReady && (
                          <>
                            <p className="mb-4">Tours</p>
                            <p className="fs-30 mb-2">{countObj.tourCount}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 stretch-card transparent">
                    <div className="card card-light-danger">
                      <div className="card-body">
                        {!countObj.isLeadCountReady && (
                          <ShimmerTitle line={2} gap={10} variant="primary" />
                        )}
                        {countObj.isLeadCountReady && (
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
