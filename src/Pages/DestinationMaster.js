import { useState } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";

const DestinationMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div className="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Destinations Master </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#countryModal"
                  >
                    Add Destinations
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
                                  <option value="-1">All</option>
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
                                  <th
                                    className="sorting sorting_asc"
                                    tabIndex="0"
                                    aria-controls="order-listing"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-sort="ascending"
                                    aria-label="Order #: activate to sort column descending"
                                    style={{ width: "107.016px" }}
                                  >
                                    Sr. No.
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="order-listing"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Destination Name
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="order-listing"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    State / Location
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="order-listing"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Country
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="order-listing"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Customer: activate to sort column ascending"
                                    style={{ width: "127.391px" }}
                                  >
                                    Status
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex="0"
                                    aria-controls="order-listing"
                                    rowSpan="1"
                                    colSpan="1"
                                    aria-label="Ship to: activate to sort column ascending"
                                    style={{ width: "116.672px" }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="odd">
                                  <td className="sorting_1">1</td>
                                  <td>Mumbai Airport</td>
                                  <td>Maharashtra</td>
                                  <td>India</td>
                                  <td>
                                    <label className="badge badge-success">
                                      Active
                                    </label>
                                  </td>
                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                    ></ion-icon>
                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                    ></ion-icon>
                                  </td>
                                </tr>
                                <tr className="odd">
                                  <td className="sorting_1">2</td>
                                  <td>Srinagar Airport</td>
                                  <td>Jammu & Kashmir </td>
                                  <td>India</td>
                                  <td>
                                    <label className="badge badge-success">
                                      Active
                                    </label>
                                  </td>
                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                    ></ion-icon>
                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                    ></ion-icon>
                                  </td>
                                </tr>
                                <tr className="odd">
                                  <td className="sorting_1">3</td>
                                  <td>Port Blair Airport</td>
                                  <td>Andaman & Nicobar Islands</td>

                                  <td>India</td>
                                  <td>
                                    <label className="badge badge-danger">
                                      Inactive
                                    </label>
                                  </td>
                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                    ></ion-icon>
                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                    ></ion-icon>
                                  </td>
                                </tr>
                                <tr className="odd">
                                  <td className="sorting_1">4</td>
                                  <td>Shimla Airport</td>

                                  <td>Himachal Pradesh</td>

                                  <td>India</td>
                                  <td>
                                    <label className="badge badge-success">
                                      Active
                                    </label>
                                  </td>
                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                    ></ion-icon>
                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                    ></ion-icon>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <div
                              className="modal fade"
                              id="countryModal"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              style={{ display: "none" }}
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-md"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Add Destinations
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="form-group">
                                      <label>Destination Name</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Destination Name"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>State / Location</label>
                                      <select
                                        className="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabIndex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          Maharashtra
                                        </option>
                                        <option
                                          value="uae"
                                          data-select2-id="16"
                                        >
                                          Jammu & Kashmir
                                        </option>
                                        <option
                                          value="eng"
                                          data-select2-id="18"
                                        >
                                          Himachal Pradesh
                                        </option>
                                      </select>
                                    </div>
                                    <div className="form-group">
                                      <label>Country</label>
                                      <select
                                        className="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabIndex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          India
                                        </option>
                                        <option
                                          value="uae"
                                          data-select2-id="16"
                                        >
                                          UAE
                                        </option>
                                        <option
                                          value="eng"
                                          data-select2-id="18"
                                        >
                                          England
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                    >
                                      Submit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-light"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div
                              className="dataTables_info"
                              id="order-listing_info"
                              role="status"
                              aria-live="polite"
                            >
                              Showing 1 to 10 of 10 entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
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

export default DestinationMaster;
