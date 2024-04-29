import { useState,useRef } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
const LeadManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFormOpen, setFormOpen] = useState(false);
  const todaysDate = new Date().toISOString().split("T")[0]
  const openForm = () => {
    setFormOpen(!isFormOpen)
   
  }
  return (
    <div className="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div className="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="card">
              <div className="card-body">
              <div className="flex">
                  <ion-icon name="people-outline" color="primary"></ion-icon>
                  <h4 className="card-title mt-1 ml-1">Lead Management</h4>
                </div>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={()=>openForm()}
                  >
                    Add Lead
                  </button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                {isFormOpen && 
                 <SlideDown className={'my-dropdown-slidedown'}>
                <div  className={`form-div show-box ${isFormOpen ? 'visible' : 'hidden'}`}>
                <div className="card">
                <div className="card-body">
                 
                  <form className="form-sample">
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Lead Date</label>
                          <div className="col-sm-9">
                            <input type="date" className="form-control" min={todaysDate} value={todaysDate}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Customer Name</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                 
                 
                   
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Contact No</label>
                          <div className="col-sm-9">
                            <input type="number" className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Location / Address</label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Lead Status</label>
                          <div className="col-sm-9">
                            <select className="form-control">
                              <option>Hot</option>
                              <option>Warm</option>
                              <option>Cold</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Details</label>
                          <div className="col-sm-9">
                            <textarea type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-success mr-2">
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
                </SlideDown>
                }
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
                                    Lead Date
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
                                    Customer Name
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
                                    Contact No.
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
                                  <td>01-03-2024</td>
                                  <td>John Doe</td>
                                  <td>9920254462</td>
                                  <td>Hot</td>
                                  <td>
                                    <ion-icon
                                      name="eye-outline"
                                      color="secondary"
                                      style={{ marginRight: "10px" }}
                                      title="View Details"
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
                                      title="Change Status"
                                    ></ion-icon>
                                  </td>
                                </tr>
                                <tr className="odd">
                                  <td className="sorting_1">1</td>
                                  <td>02-03-2024</td>
                                  <td>Jane Price</td>
                                  <td>9887776676</td>
                                  <td>Cold</td>
                                  <td>
                                    <ion-icon
                                      name="eye-outline"
                                      color="secondary"
                                      style={{ marginRight: "10px" }}
                                      title="View Details"
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
                                      title="Change Status"
                                    ></ion-icon>
                                  </td>
                                </tr>
                                <tr className="odd">
                                  <td className="sorting_1">1</td>
                                  <td>01-03-2024</td>
                                  <td>Mark Millett</td>
                                  <td>8787667677</td>
                                  <td>Warm</td>
                                  <td>
                                    <ion-icon
                                      name="eye-outline"
                                      color="secondary"
                                      style={{ marginRight: "10px" }}
                                      title="View Details"
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
                                      title="Change Status"
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
                                      Add Country
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
                                      <label>Country Name</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Country Name"
                                        aria-label="Username"
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
export default LeadManagement;
