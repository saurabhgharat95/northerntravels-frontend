import { useState } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";

const HotelTypeMaster = () => {
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
                <h4 className="card-title">Hotel Type Master </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#countryModal"
                  >
                    Add Hotel Type
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
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-sort="ascending"
                                    aria-label="Order #: activate to sort column descending"
                                    style={{ width: "107.016px" }}
                                  >
                                    Sr. No.
                                  </th>
                                  <th
                                    className="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Hotel Type
                                  </th>

                                  <th
                                    className="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Customer: activate to sort column ascending"
                                    style={{ width: "127.391px" }}
                                  >
                                    Status
                                  </th>
                                  <th
                                    className="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
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
                                  <td>1 Star</td>

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
                                  <td>2 Star</td>

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
                                  <td>3 Star</td>

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
                                  <td>4 Star</td>

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
                                  <td className="sorting_1">4</td>
                                  <td>5 Star</td>

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
                              tabindex="-1"
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
                                      Add Hotel Type
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
                                      <label>Hotel Type </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Hotel Type "
                                      />
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
                                    tabindex="-1"
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
                                    tabindex="0"
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
                                    tabindex="-1"
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

export default HotelTypeMaster;
