import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  CSSTransition,
  axios,
  toast,
  ShimmerTable,
  SimpleReactValidator,
  Select,
  ToastContainer,

} from "../components/CommonImport";
import {
  FETCH_LEADS_API,
  FETCH_LEAD_STATUSES_API,
  ADD_LEAD_API,
  UPDATE_LEAD_API,
  DELETE_LEAD_API,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { getDateFormatted } from "../utils/helpers";

import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";

const LeadManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFormOpen, setFormOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [leadsOptions, setLeadsOptions] = useState([]);
  const [originalLeadsList, setOriginalLeadsList] = useState([]);
  const [leadFormObject, setLeadFormObject] = useState({
    leadCustomerName: "",
    leadContactNo: "",
    leadEmail: "",
    leadAddress: "",
    leadDescription: "",
    fkLeadStatusId: "",
    leadAddedBy: "1",
  });
  const [isUpdate, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const navigate = useNavigate();
  const todaysDate = new Date().toISOString().split("T")[0];
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

  const openForm = () => {
    setFormOpen(!isFormOpen);
  };
  const fetchLeads = async () => {
    try {
      let url = FETCH_LEADS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setDataReady(true);
          setLeads(response.data.data);
          setOriginalLeadsList(response.data.data);
        }
      }
    } catch (e) {
      setDataReady(true);
      setLeads([]);
    }
  };
  const fetchLeadStatuses = async () => {
    try {
      let url = FETCH_LEAD_STATUSES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let leads = response.data.data;
          let leadsOptions = [];
          leads.forEach((lead) => {
            leadsOptions.push({
              value: lead.id,
              label: lead.leadStatusName,
            });
          });
          setLeadsOptions(leadsOptions);
        }
      }
    } catch (e) {
      setLeadsOptions([]);
    }
  };
  const deleteLead = async (id) => {
    try {
      let url = DELETE_LEAD_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          fetchLeads();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const handleConfirm = () => {
    deleteLead(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(leads ? leads.length / itemsPerPage : 1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escaping special characters
  };
  const filterData = (searchValue) => {
    setSearchValue(searchValue);
    if (searchValue && searchValue.trim() !== "") {
      var escapedSearchValue = escapeRegExp(searchValue); // Escaping searchValue
      var filteredLeads = leads?.filter(
        (row) =>
          row?.leadCustomerName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.leadContactNo?.toLowerCase().includes(escapedSearchValue.toLowerCase()) ||
          row?.leadEmail?.toLowerCase().includes(escapedSearchValue.toLowerCase()) ||
          row?.leadstatus.leadStatusName?.toLowerCase().includes(escapedSearchValue.toLowerCase())
      );
      setLeads(filteredLeads);
    } else {
      setLeads(originalLeadsList);
    }
  };
  const resetForm = () => {
    setLeadFormObject({
      leadCustomerName: "",
      leadContactNo: "",
      leadEmail: "",
      leadAddress: "",
      leadDescription: "",
      fkLeadStatusId: "",
      leadAddedBy: "1",
    });
  };
  const addLead = async () => {
    try {
      let url = ADD_LEAD_API;

      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, leadFormObject);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            resetForm();
            fetchLeads();
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("ee", e);
      setIsLoading(false);

      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateLead = async () => {
    try {
      let url = UPDATE_LEAD_API;
      let body = {
        id: updateId,
        leadCustomerName: leadFormObject.leadCustomerName,
        leadContactNo: leadFormObject.leadContactNo,
        leadEmail: leadFormObject.leadEmail,
        leadAddress: leadFormObject.leadAddress,
        leadDescription: leadFormObject.leadDescription,
        fkLeadStatusId: leadFormObject.fkLeadStatusId,
        leadAddedBy: "1",
      };
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });

            fetchLeads();
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("ee", e);

      setIsLoading(false);

      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const mapLeadData = (updateId) => {
    var leadObj = leads.filter((lead) => {
      return lead.id == updateId;
    })[0];
    if (leadObj) {
      setLeadFormObject((prevState) => ({
        ...prevState,
        leadCustomerName: leadObj.leadCustomerName,
        leadContactNo: leadObj.leadContactNo,
        leadEmail: leadObj.leadEmail,
        leadAddress: leadObj.leadAddress,
        leadDescription: leadObj.leadDescription,
        fkLeadStatusId: leadObj.fkLeadStatusId,
      }));
      setUpdate(true);
      setUpdateId(updateId);
      openForm()
    }
  };
  useEffect(() => {
    fetchLeads();
    fetchLeadStatuses();
  }, []);
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
                    onClick={() =>{
                      resetForm();
                      openForm();
                      setUpdate(false);
                      setUpdateId(null)
                    } }
                  >
                    Add Lead
                  </button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                {isFormOpen && (
                  <SlideDown className={"my-dropdown-slidedown"}>
                    <div
                      className={`form-div show-box ${
                        isFormOpen ? "visible" : "hidden"
                      }`}
                    >
                      <div className="card">
                        <div className="card-body">
                          <form className="form-sample">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Lead Date
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="date"
                                      className="form-control"
                                      min={todaysDate}
                                      value={todaysDate}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Customer Name
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={leadFormObject.leadCustomerName}
                                      onChange={(e) => {
                                        setLeadFormObject((prevState) => ({
                                          ...prevState,
                                          leadCustomerName: e.target.value,
                                        }));
                                      }}
                                      onBlur={() => {
                                        simpleValidator.current.showMessageFor(
                                          "leadCustomerName"
                                        );
                                      }}
                                    />
                                    <>
                                      {simpleValidator.current.element.length >
                                        0 &&
                                        simpleValidator.current.message(
                                          "leadCustomerName",
                                          leadFormObject.leadCustomerName,
                                          [
                                            "required",
                                            {
                                              regex:
                                                /^(?![\. ])[a-zA-Z\. ]+(?<! )$/,
                                            },
                                          ],
                                          {
                                            messages: {
                                              required:
                                                "Please enter customer name",
                                              regex:
                                                "Enter valid customer name",
                                            },
                                          }
                                        )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Contact No
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      pattern="[0-9]{10}"
                                      className="form-control"
                                      maxLength="10"
                                      value={leadFormObject.leadContactNo}
                                      onChange={(event) => {
                                        const newValue =
                                          event.target.value.trim();
                                        if (/^\d*$/.test(newValue)) {
                                          setLeadFormObject((prevState) => ({
                                            ...prevState,
                                            leadContactNo: event.target.value,
                                          }));
                                        }
                                      }}
                                      onBlur={() => {
                                        simpleValidator.current.showMessageFor(
                                          "leadContactNo"
                                        );
                                      }}
                                    />
                                    <>
                                      {simpleValidator.current.message(
                                        "leadContactNo",
                                        leadFormObject.leadContactNo,
                                        ["required"],
                                        {
                                          messages: {
                                            required:
                                              "Please enter mobile number",
                                          },
                                        }
                                      )}
                                    </>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Email
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Email"
                                      value={leadFormObject.leadEmail}
                                      onChange={(e) => {
                                        setLeadFormObject((prevState) => ({
                                          ...prevState,
                                          leadEmail: e.target.value,
                                        }));
                                      }}
                                      onBlur={() => {
                                        simpleValidator.current.showMessageFor(
                                          "leadEmail"
                                        );
                                      }}
                                    />
                                    <>
                                      {simpleValidator.current.element.length >
                                        0 &&
                                        simpleValidator.current.message(
                                          "leadEmail",
                                          leadFormObject.leadEmail,
                                          ["required", "email"],
                                          {
                                            messages: {
                                              required:
                                                "Please enter customer email",
                                              email:
                                                "Enter valid customer email",
                                            },
                                          }
                                        )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Location / Address
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter  Location / Address"
                                      value={leadFormObject.leadAddress}
                                      onChange={(e) => {
                                        setLeadFormObject((prevState) => ({
                                          ...prevState,
                                          leadAddress: e.target.value,
                                        }));
                                      }}
                                      onBlur={() => {
                                        simpleValidator.current.showMessageFor(
                                          "leadAddress"
                                        );
                                      }}
                                    />
                                    <>
                                      {simpleValidator.current.element.length >
                                        0 &&
                                        simpleValidator.current.message(
                                          "leadAddress",
                                          leadFormObject.leadAddress,
                                          ["required"],
                                          {
                                            messages: {
                                              required: "Please enter  address",
                                            },
                                          }
                                        )}
                                    </>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Lead Status
                                  </label>
                                  <div className="col-sm-9">
                                    <Select
                                      placeholder="Select Lead Status"
                                      options={leadsOptions}
                                      value={
                                        leadFormObject.fkLeadStatusId
                                          ? leadsOptions.filter(
                                              (option) =>
                                                option.value ===
                                                leadFormObject.fkLeadStatusId
                                            )
                                          : null
                                      }
                                      onChange={(selectedOption) => {
                                        setLeadFormObject((prevState) => ({
                                          ...prevState,
                                          fkLeadStatusId: selectedOption
                                            ? selectedOption.value
                                            : null,
                                        }));
                                      }}
                                      onBlur={() => {
                                        simpleValidator.current.showMessageFor(
                                          "fkLeadStatusId"
                                        );
                                      }}
                                    />
                                    <>
                                      {simpleValidator.current.message(
                                        "fkLeadStatusId",
                                        leadFormObject.fkLeadStatusId,
                                        ["required"],
                                        {
                                          messages: {
                                            required:
                                              "Please select lead status",
                                          },
                                        }
                                      )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">
                                    Details
                                  </label>
                                  <div className="col-sm-9">
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Details"
                                      value={leadFormObject.leadDescription}
                                      onChange={(e) => {
                                        setLeadFormObject((prevState) => ({
                                          ...prevState,
                                          leadDescription: e.target.value,
                                        }));
                                      }}
                                      onBlur={() => {
                                        simpleValidator.current.showMessageFor(
                                          "leadDescription"
                                        );
                                      }}
                                    />
                                    <>
                                      {simpleValidator.current.element.length >
                                        0 &&
                                        simpleValidator.current.message(
                                          "leadDescription",
                                          leadFormObject.leadDescription,
                                          ["required"],
                                          {
                                            messages: {
                                              required:
                                                "Please enter lead details",
                                            },
                                          }
                                        )}
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-success mr-2"
                          onClick={() => {
                            isUpdate ? updateLead() : addLead();
                          }}
                        >
                          {isUpdate ? "Edit" : "Add"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            openForm() 
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </SlideDown>
                )}
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
                                  onChange={(e) => {
                                    setItemsPerPage(e.target.value);
                                  }}
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
                                  value={searchValue}
                                  onChange={(e) => filterData(e.target.value)}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        {isDataReady == false && <ShimmerTable row={10} />}
                        <div className="row dt-row">
                          <div className="col-sm-12">
                            {leads && leads.length > 0 && (
                              <table
                                id="order-listing"
                                className="table dataTable no-footer"
                                aria-describedby="order-listing_info"
                              >
                                <thead>
                                  <tr>
                                    <th style={{ width: "20.016px" }}>
                                      Sr. No.
                                    </th>
                                    <th style={{ width: "127.391px" }}>
                                      Lead Date
                                    </th>
                                    <th style={{ width: "150.375px" }}>
                                      Customer Name
                                    </th>
                                    <th style={{ width: "50.672px" }}>
                                      Status
                                    </th>
                                    <th style={{ width: "80.672px" }}>
                                      Contact No.
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Email
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Address
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Description
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {leads &&
                                    leads
                                      .slice(startIndex, endIndex)
                                      .map((lead, index) => (
                                        <CSSTransition
                                          key={lead.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {" "}
                                              {startIndex + index + 1}
                                            </td>
                                            <td>
                                              {getDateFormatted(
                                                lead.leadDateTime
                                              )}
                                            </td>
                                            <td>{lead.leadCustomerName}</td>
                                            <td>
                                              <span
                                                className={`badge ${lead.leadstatus.leadStatusName.toLowerCase()}`}
                                              >
                                                {lead.leadstatus.leadStatusName}
                                              </span>
                                            </td>
                                            <td>{lead.leadContactNo}</td>
                                            <td>{lead.leadEmail}</td>
                                            <td>{lead.leadAddress}</td>
                                            <td>{lead.leadDescription}</td>
                                            <td>
                                             
                                              <ion-icon
                                                name="create-outline"
                                                color="primary"
                                                style={{ marginRight: "10px" }}
                                                title="Edit"
                                                onClick={() =>
                                                  mapLeadData(lead.id)
                                                }
                                              ></ion-icon>
                                              <ion-icon
                                                name="checkbox-outline"
                                                color="success"
                                                style={{ marginRight: "10px" }}
                                                title="Change Status"
                                              ></ion-icon>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {leads && leads.length == 0 && <NoData></NoData>}
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
                          <div className="col-sm-12 col-md-12">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="order-listing_paginate"
                            >
                              <RenderPageNumbers
                                data={leads}
                                currentPage={currentPage}
                                handlePagination={handlePagination}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                totalPages={totalPages}
                              ></RenderPageNumbers>
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
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="colored"
          />
          <ConfirmationDialog
            message="Are you sure you want to delete?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            show={showConfirmation}
          />
          <Loader isLoading={isLoading}></Loader>
        </div>
      </div>
    </div>
  );
};
export default LeadManagement;
