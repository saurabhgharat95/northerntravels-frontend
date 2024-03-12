import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
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
                    <h6 className="font-weight-normal mb-0">
                      All systems are running smoothly! You have{" "}
                      <span className="text-primary">3 unread alerts!</span>
                    </h6>
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
                    <div className="weather-info">
                      <div className="d-flex">
                        <div>
                          <h2 className="mb-0 font-weight-normal">
                            <i className="icon-sun mr-2"></i>31<sup>C</sup>
                          </h2>
                        </div>
                        <div className="ml-2">
                          <h4 className="location font-weight-normal">Mumbai</h4>
                          <h6 className="font-weight-normal">India</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin transparent">
                <div className="row">
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                      <div className="card-body">
                        <p className="mb-4">Quotations</p>
                        <p className="fs-30 mb-2">4006</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                      <div className="card-body">
                        <p className="mb-4">Customers</p>
                        <p className="fs-30 mb-2">61344</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                    <div className="card card-light-blue">
                      <div className="card-body">
                        <p className="mb-4">Vouchers</p>
                        <p className="fs-30 mb-2">34040</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 stretch-card transparent">
                    <div className="card card-light-danger">
                      <div className="card-body">
                        <p className="mb-4">Hotels</p>
                        <p className="fs-30 mb-2">47033</p>
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
