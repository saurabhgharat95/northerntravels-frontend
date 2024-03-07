import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
const TransportationMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div class="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div class="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Transportation Master </h4>
                <div class="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#countryModal"
                  >
                    Add Transportation
                  </button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div class="row">
                  <div class="col-12">
                    <div class="table-responsive">
                      <div
                        id="order-listing_wrapper"
                        class="dataTables_wrapper dt-bootstrap5 no-footer"
                      >
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <div
                              class="dataTables_length"
                              id="order-listing_length"
                            >
                              <label>
                                Show{" "}
                                <select
                                  name="order-listing_length"
                                  aria-controls="order-listing"
                                  class="form-select form-select-sm"
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
                          <div class="col-sm-12 col-md-6">
                            <div
                              id="order-listing_filter"
                              class="dataTables_filter"
                            >
                              <label>
                                <input
                                  type="search"
                                  class="form-control"
                                  placeholder="Search"
                                  aria-controls="order-listing"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="row dt-row">
                          <div class="col-sm-12">
                            <table
                              id="order-listing"
                              class="table dataTable no-footer"
                              aria-describedby="order-listing_info"
                            >
                              <thead>
                                <tr>
                                  <th
                                    class="sorting sorting_asc"
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
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Car Name
                                  </th>
                                  <th
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Pickup Point
                                  </th>
                                  <th
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Drop Point
                                  </th>
                                  <th
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    On Season Costing
                                  </th>
                                  <th
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Off Season Costing
                                  </th>
                                  <th
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    State / Location
                                  </th>
                                  <th
                                    class="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Country
                                  </th>

                                  <th
                                    class="sorting"
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
                                    class="sorting"
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
                                <tr class="odd">
                                  <td class="sorting_1">1</td>
                                  <td>Etios</td>
                                  <td>Arrival Srinagar Airport</td>
                                  <td>Gulmarg Overnight Stay</td>
                                  <td>2500</td>
                                  <td>2200</td>
                                  <td>Jammu & Kashmir</td>
                                  <td>India</td>

                                  <td>
                                    <label class="badge badge-success">
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
                                <tr class="odd">
                                  <td class="sorting_1">1</td>
                                  <td>Swift Dzire</td>
                                  <td>Neil To Port Blair Stay</td>
                                  <td>
                                    Port Blair Local Sightseeing Stay Port Blair
                                  </td>
                                  <td>2500</td>
                                  <td>2500</td>
                                  <td>Andaman</td>
                                  <td>India</td>

                                  <td>
                                    <label class="badge badge-success">
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
                                <tr class="odd">
                                  <td class="sorting_1">1</td>
                                  <td>Etios</td>
                                  <td>Port Blair</td>
                                  <td>Port Blair Airport Departure</td>
                                  <td>300</td>
                                  <td>300</td>
                                  <td>Andaman</td>
                                  <td>India</td>

                                  <td>
                                    <label class="badge badge-success">
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
                              class="modal fade"
                              id="countryModal"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              style={{ display: "none" }}
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-md"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Add Transportation
                                    </h5>
                                    <button
                                      type="button"
                                      class="close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <div class="form-group">
                                      <label>Car</label>
                                      <select
                                        class="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabindex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          Etios
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          4 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          3 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          2 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          1 star
                                        </option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label>Pickup Point</label>
                                      <select
                                        class="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabindex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          Srinagar Airport
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          4 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          3 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          2 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          1 star
                                        </option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label>Drop Point</label>
                                      <select
                                        class="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabindex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          Srinagar Airport
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          4 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          3 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          2 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          1 star
                                        </option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label>On Season Costing</label>
                                      <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        placeholder="Enter On Season Costing"
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label>Off Season Costing</label>
                                      <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        placeholder="Enter Off Season Costing"
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label>State</label>
                                      <select
                                        class="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabindex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          Jammu & Kashmir
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          4 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          3 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          2 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          1 star
                                        </option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label>Country</label>
                                      <select
                                        class="js-example-basic-single w-100 select2-hidden-accessible"
                                        data-select2-id="1"
                                        tabindex="-1"
                                        aria-hidden="true"
                                      >
                                        <option value="in" data-select2-id="3">
                                          India
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          4 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          3 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          2 star
                                        </option>
                                        <option value="in" data-select2-id="3">
                                          1 star
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-success"
                                    >
                                      Submit
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-light"
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
                        <div class="row">
                          <div class="col-sm-12 col-md-5">
                            <div
                              class="dataTables_info"
                              id="order-listing_info"
                              role="status"
                              aria-live="polite"
                            >
                              Showing 1 to 10 of 10 entries
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-7">
                            <div
                              class="dataTables_paginate paging_simple_numbers"
                              id="order-listing_paginate"
                            >
                              <ul class="pagination">
                                <li
                                  class="paginate_button page-item previous disabled"
                                  id="order-listing_previous"
                                >
                                  <a
                                    aria-controls="order-listing"
                                    aria-disabled="true"
                                    role="link"
                                    data-dt-idx="previous"
                                    tabindex="-1"
                                    class="page-link"
                                  >
                                    Previous
                                  </a>
                                </li>
                                <li class="paginate_button page-item active">
                                  <a
                                    href="https://demo.bootstrapdash.com/skydash/themes/vertical-default-light/pages/tables/data-table.html#"
                                    aria-controls="order-listing"
                                    role="link"
                                    aria-current="page"
                                    data-dt-idx="0"
                                    tabindex="0"
                                    class="page-link"
                                  >
                                    1
                                  </a>
                                </li>
                                <li
                                  class="paginate_button page-item next disabled"
                                  id="order-listing_next"
                                >
                                  <a
                                    aria-controls="order-listing"
                                    aria-disabled="true"
                                    role="link"
                                    data-dt-idx="next"
                                    tabindex="-1"
                                    class="page-link"
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

export default TransportationMaster;
