import { useState } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";

const TourManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const goToAddForm = () => {
    window.location.href = "/add-tour";
  };
  return (
    <div className="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div className="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Tours </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => goToAddForm()}
                  >
                    Add Tour
                  </button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive">
                      <div
                        id="order-listing_wrapper"
                        className="dataTables_wrapper dt-bootstrap5 no-footer"
                      >
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                            <div
                              className="dataTables_length"
                              id="order-listing_length"
                            >
                              <label>
                                Show{" "}
                                <select
                                  name="order-listing_length"
                                  aria-controls="order-listing"
                                  className="form-select form-select-sm"
                                >
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                  <option value="15">15</option>
                                </select>{" "}
                                entries
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                            <div
                              id="order-listing_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder="Search"
                                  aria-controls="order-listing"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row dt-row">
                          <div className="col-sm-12">
                            <table
                              id="order-listing"
                              className="table dataTable no-footer"
                              aria-describedby="order-listing_info"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "107.016px" }}>
                                    Sr. No.
                                  </th>
                                  <th style={{ width: "171.375px" }}>
                                    Tour Name
                                  </th>
                                  <th style={{ width: "127.391px" }}>
                                    Countries
                                  </th>
                                  <th style={{ width: "116.672px" }}>
                                    States / Locations
                                  </th>
                                  <th style={{ width: "116.672px" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="odd">
                                  <td className="sorting_1">1</td>
                                  <td>Jammu & Kashmir Tour</td>
                                  <td>India</td>
                                  <td>Jammu & Kashmir </td>

                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                      title="Delete"
                                    ></ion-icon>

                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                      style={{ marginRight: "10px" }}
                                      title="Edit"
                                    ></ion-icon>
                                    <ion-icon
                                      name="checkbox-outline"
                                      color="success"
                                      style={{ marginRight: "10px" }}
                                      title="Approve"
                                    ></ion-icon>
                                  </td>
                                </tr>

                                <tr className="odd">
                                  <td className="sorting_1">2</td>
                                  <td>Kashmir & Golden Temple Tour</td>
                                  <td>India</td>
                                  <td>Jammu & Kashmir , Punjab</td>
                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                      title="Delete"
                                    ></ion-icon>

                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                      style={{ marginRight: "10px" }}
                                      title="Edit"
                                    ></ion-icon>
                                    <ion-icon
                                      name="checkbox-outline"
                                      color="success"
                                      style={{ marginRight: "10px" }}
                                      title="Approve"
                                    ></ion-icon>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-12">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="order-listing_paginate"
                            >
                              <ul className="pagination">
                                <li
                                  className="paginate_button page-item previous disabled"
                                  id="order-listing_previous"
                                >
                                  <a
                                    aria-controls="order-listing"
                                    aria-disabled="true"
                                    role="link"
                                    data-dt-idx="previous"
                                    tabIndex="-1"
                                    className="page-link"
                                  >
                                    Previous
                                  </a>
                                </li>
                                <li className="paginate_button page-item active">
                                  <a
                                    href="https://demo.bootstrapdash.com/skydash/themes/vertical-default-light/pages/tables/data-table.html#"
                                    aria-controls="order-listing"
                                    role="link"
                                    aria-current="page"
                                    data-dt-idx="0"
                                    tabIndex="0"
                                    className="page-link"
                                  >
                                    1
                                  </a>
                                </li>
                                <li
                                  className="paginate_button page-item next disabled"
                                  id="order-listing_next"
                                >
                                  <a
                                    aria-controls="order-listing"
                                    aria-disabled="true"
                                    role="link"
                                    data-dt-idx="next"
                                    tabIndex="-1"
                                    className="page-link"
                                  >
                                    Next
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};
export default TourManagement;
