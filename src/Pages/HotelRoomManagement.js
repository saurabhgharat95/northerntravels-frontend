import { useState } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";
import AddRoomForm from "./AddRoomForm";
const HotelRoomManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [formModule, setFormModule] = useState("hotel");

  const goToAddForm = () => {
    window.location.href = "/add-quotation";
  };
  const viewRooms = () => {
    setFormModule("room");
  };
  const viewCharges = () => {
    setFormModule("charges");
  };
  const cancelForm = () => {
    setFormModule("room");
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
                {(formModule == "room" || formModule == "charges") && (
                  <ol className="breadcrumb bg-primary">
                    <li className="breadcrumb-item">
                      <span onClick={() => setFormModule("hotel")}>
                        Hotel Rooms
                      </span>
                    </li>
                    {(formModule == "room" || formModule == "charges") && (
                      <li
                        onClick={() => viewRooms()}
                        className="breadcrumb-item"
                      >
                        Rooms
                      </li>
                    )}
                    {formModule == "charges" && (
                      <li
                        onClick={() => viewCharges()}
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        <span>Charges</span>
                      </li>
                    )}
                  </ol>
                )}

                <h4 className="card-title"> Hotel Room Management </h4>

                <br></br>
                {formModule == "hotel" && (
                  <>
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
                                        Hotel Name
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
                                        Rooms
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
                                      <td>Budshah Residency</td>
                                      <td>
                                        <span
                                          onClick={() => viewRooms()}
                                          className="badge badge-outline-info"
                                        >
                                          View Rooms
                                        </span>
                                      </td>
                                      <td>
                                        <ion-icon
                                          name="create-outline"
                                          color="primary"
                                          style={{ marginRight: "10px" }}
                                          title="Edit"
                                        ></ion-icon>
                                        <ion-icon
                                          name="trash-outline"
                                          color="danger"
                                          style={{ marginRight: "10px" }}
                                          title="Delete"
                                        ></ion-icon>
                                      </td>
                                    </tr>
                                    <tr className="odd">
                                      <td className="sorting_1">1</td>
                                      <td>Hotel City Grace</td>
                                      <td>
                                        <span
                                          onClick={() => viewRooms()}
                                          className="badge badge-outline-info"
                                        >
                                          View Rooms
                                        </span>
                                      </td>
                                      <td>
                                        <ion-icon
                                          name="create-outline"
                                          color="primary"
                                          style={{ marginRight: "10px" }}
                                          title="Edit"
                                        ></ion-icon>
                                        <ion-icon
                                          name="trash-outline"
                                          color="danger"
                                          style={{ marginRight: "10px" }}
                                          title="Delete"
                                        ></ion-icon>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
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
                  </>
                )}
                {formModule == "room" && (
                  <>
                    <div className="float-right">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setFormModule("roomform")}
                      >
                        Add Room
                      </button>
                    </div>
                    <div className="row">
                      <div className="col-md-4 grid-margin stretch-card">
                        <div className="card border border-primary">
                          <div className="card-body">
                            <div className="media">
                              <ion-icon
                                color="primary"
                                name="business-outline"
                                size="large"
                              ></ion-icon>
                              <div className="media-body ml-2 mt-1">
                                <p className="card-text">
                                  Hotel : <b>Budshah Residency</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                                        aria-label="Customer: activate to sort column ascending"
                                        style={{ width: "127.391px" }}
                                      >
                                        Room Type
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
                                        No. of Rooms
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
                                        Charges
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
                                      <td>Deluxe</td>
                                      <td>12</td>
                                      <td>
                                        <span
                                          className="badge badge-outline-success"
                                          onClick={() => viewCharges()}
                                        >
                                          View Charges
                                        </span>
                                      </td>
                                      <td>
                                        <ion-icon
                                          name="create-outline"
                                          color="primary"
                                          style={{ marginRight: "10px" }}
                                          title="Edit"
                                        ></ion-icon>
                                        <ion-icon
                                          name="trash-outline"
                                          color="danger"
                                          style={{ marginRight: "10px" }}
                                          title="Delete"
                                        ></ion-icon>
                                      </td>
                                    </tr>
                                    <tr className="odd">
                                      <td className="sorting_1">1</td>
                                      <td>Standard</td>
                                      <td>10</td>
                                      <td>
                                        <span
                                          className="badge badge-outline-success"
                                          onClick={() => viewCharges()}
                                        >
                                          View Charges
                                        </span>
                                      </td>
                                      <td>
                                        <ion-icon
                                          name="create-outline"
                                          color="primary"
                                          style={{ marginRight: "10px" }}
                                          title="Edit"
                                        ></ion-icon>
                                        <ion-icon
                                          name="trash-outline"
                                          color="danger"
                                          style={{ marginRight: "10px" }}
                                          title="Delete"
                                        ></ion-icon>
                                      </td>
                                    </tr>
                                    <tr className="odd">
                                      <td className="sorting_1">1</td>
                                      <td>Super Deluxe</td>
                                      <td>5</td>
                                      <td>
                                        <span
                                          className="badge badge-outline-success"
                                          onClick={() => viewCharges()}
                                        >
                                          View Charges
                                        </span>
                                      </td>
                                      <td>
                                        <ion-icon
                                          name="create-outline"
                                          color="primary"
                                          style={{ marginRight: "10px" }}
                                          title="Edit"
                                        ></ion-icon>
                                        <ion-icon
                                          name="trash-outline"
                                          color="danger"
                                          style={{ marginRight: "10px" }}
                                          title="Delete"
                                        ></ion-icon>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
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
                  </>
                )}
                {formModule == "charges" && (
                  <>
                    <div className="row">
                      <div className="col-md-4 grid-margin stretch-card">
                        <div className="card border border-primary">
                          <div className="card-body">
                            <div className="media">
                              <ion-icon
                                style={{ marginTop: "5px" }}
                                color="primary"
                                name="business-outline"
                                size="large"
                              ></ion-icon>
                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Hotel : <b>Budshah Residency</b>
                                </p>
                                <p className="card-text">
                                  Room Type : <b>Deluxe</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
                                  className="table table-bordered dataTable no-footer table-responsive"
                                  aria-describedby="order-listing_info"
                                >
                                  <tr>
                                    <td></td>
                                    <td
                                      className="text-center border-left border-right"
                                      colSpan={4}
                                    >
                                      On Season
                                    </td>
                                    <td
                                      className="text-center border-right"
                                      colSpan={4}
                                    >
                                      Off Season
                                    </td>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      EP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      CP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      MAP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      AP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      EP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      CP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      MAP
                                    </th>
                                    <th
                                      className="sorting sorting_asc"
                                      tabIndex="0"
                                      aria-controls="order-listing"
                                      rowSpan="1"
                                      colSpan="1"
                                      aria-sort="ascending"
                                      aria-label="Order #: activate to sort column descending"
                                      style={{ width: "107.016px" }}
                                      scope="col"
                                    >
                                      AP
                                    </th>
                                  </tr>
                                  <tr className="odd">
                                    <th style={{ width: "171.375px" }}>
                                      Room Charges / Dbl Room
                                    </th>
                                    <td>0</td>
                                    <td>1000</td>
                                    <td>2500</td>
                                    <td>1000</td>
                                    <td>2000</td>
                                    <td>1000</td>
                                    <td>1500</td>
                                    <td>0</td>
                                  </tr>
                                  <tr className="odd">
                                    <th>Extra Bed Charge</th>
                                    <td>1000</td>
                                    <td>0</td>
                                    <td>2500</td>
                                    <td>0</td>
                                    <td>2000</td>
                                    <td>1000</td>
                                    <td>1500</td>
                                    <td>0</td>
                                  </tr>
                                  <tr className="odd">
                                    <th>Child Without Bed Charge</th>
                                    <td>1000</td>
                                    <td>0</td>
                                    <td>2500</td>
                                    <td>1000</td>
                                    <td>3000</td>
                                    <td>1000</td>
                                    <td>1500</td>
                                    <td>0</td>
                                  </tr>
                                  <tr className="odd">
                                    <th>Extra Child Below 5 Yrs Charge</th>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>2500</td>
                                    <td>1000</td>
                                    <td>1000</td>
                                    <td>1000</td>
                                    <td>2500</td>
                                    <td>0</td>
                                  </tr>
                                </table>
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
                  </>
                )}
                {formModule == "roomform" && (
                  <AddRoomForm cancelForm={cancelForm}></AddRoomForm>
                )}
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};
export default HotelRoomManagement;
