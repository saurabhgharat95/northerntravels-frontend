import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  CSSTransition,
  axios,
  toast,
  ToastContainer,
  SimpleReactValidator,
  Select
} from "../components/CommonImport";

import {
  FETCH_COUNTRY_API,
  FETCH_STATES_API,
  ADD_STATE_API,
  DELETE_STATE_API,
  UPDATE_STATE_API,
} from "../utils/constants";

import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";

const StateMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
   
    })
  );

  const handleCloseModal = () => {
    document.getElementById("stateModal").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };

  const fetchCountries = async () => {
    try {
      let url = FETCH_COUNTRY_API;

      let response = await axios.post(url);
      console.log("response", response.data.data);
      if (response) {
        if (response.status == 200) {
          let countries = response.data.data;
          let countryOptionsArray = [];
          countries.forEach((country) => {
            countryOptionsArray.push({
              value: country.id,
              label: country.countryName,
            });
          });
          setCountryOptions(countryOptionsArray);
          setCountries(response.data.data);
        }
      }
    } catch (e) {
      setCountries([]);
    }
  };
  const fetchStates = async () => {
    try {
      let url = FETCH_STATES_API;

      let response = await axios.post(url);
      console.log("response", response.data.data);
      if (response) {
        if (response.status == 200) {
          setStates(response.data.data);
        }
      }
    } catch (e) {
      setStates([]);
    }
  };
  const resetForm = () => {
    setCountry(null);
    setStateName("");
  };
  const addState = async () => {
    try {
      let url = ADD_STATE_API;
      let body = {
        stateName: stateName,
        fkCountryId: country,
      };
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        console.log("response", response);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            handleCloseModal();
            resetForm();
            fetchStates();
            simpleValidator.current.hideMessages();
          }
        }
      } else {
        simpleValidator.current.showMessages();
      }
    } catch (e) {
      console.log("ee", e);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateState = async () => {
    try {
      let url = UPDATE_STATE_API;
      let body = {
        id: updateId,
        stateName: stateName,
        fkCountryId: country,
      };
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });

            handleCloseModal();
            resetForm();
            fetchStates();
            simpleValidator.current.hideMessages();
          }
        }
      } else {
        simpleValidator.current.showMessages();
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const deleteState = async (id) => {
    try {
      let url = DELETE_STATE_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      console.log("response", response);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          setStateName("");
          fetchStates();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  const openModal = (updateId) => {
    var stateObj = states.filter((state) => {
      return state.id == updateId;
    })[0];
    if (stateObj) {
      setStateName(stateObj.stateName);
      setCountry(stateObj.fkCountryId);
      setUpdate(true);
      setUpdateId(updateId);
    }
  };

  const handleConfirm = () => {
    deleteState(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setShowConfirmation(false);
  };
  const getCountryName = (countryId) => {
    var countryObj = countries.filter((country) => {
      return country.id == countryId;
    })[0];
    return countryObj ? countryObj.countryName : "";
  };
  useEffect(() => {
    fetchCountries();
    fetchStates();
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
                <h4 className="card-title">State / Location Master </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#stateModal"
                    onClick={() => {
                      setStateName("");
                      setUpdate(false);
                    }}
                  >
                    Add State / Location
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
                            {states && states.length > 0 && (
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
                                      State / Location
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
                                      Country
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
                                  {states &&
                                    states.map((state, index) => (
                                      <CSSTransition
                                        key={state.id}
                                        timeout={500}
                                        classNames="item elementdiv"
                                      >
                                        <tr className="odd" key={index}>
                                          <td className="sorting_1">
                                            {index + 1}
                                          </td>
                                          <td>{state.stateName}</td>
                                          <td>
                                            {getCountryName(state.fkCountryId)}
                                          </td>
                                          <td>
                                            <label
                                              className={`badge ${
                                                state.status == "1"
                                                  ? "badge-success"
                                                  : "badge-danger"
                                              }`}
                                            >
                                              {state.status == "1"
                                                ? "Active"
                                                : "Inactive"}
                                            </label>
                                          </td>
                                          <td>
                                            <ion-icon
                                              name="trash-outline"
                                              color="danger"
                                              style={{ marginRight: "10px" }}
                                              onClick={() => {
                                                setShowConfirmation(true);
                                                setDeleteId(state.id);
                                              }}
                                            ></ion-icon>
                                            <ion-icon
                                              onClick={() =>
                                                openModal(
                                                  state.id
                                                )
                                              }
                                              name="create-outline"
                                              color="primary"
                                              data-bs-toggle="modal"
                                              data-bs-target="#stateModal"
                                            ></ion-icon>
                                          </td>
                                        </tr>
                                      </CSSTransition>
                                    ))}
                                </tbody>
                              </table>
                            )}
                            {states && states.length == 0 && <NoData></NoData>}
                            <div
                              className="modal fade"
                              id="stateModal"
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
                                      {isUpdate ? "Edit" : "Add"} State /
                                      Location
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                      onClick={handleCloseModal}
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="form-group">
                                      <label>State / Location Name</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter State / Location Name"
                                        value={stateName}
                                        onChange={(e) => {
                                          setStateName(e.target.value);
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "state_name"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.element
                                          .length > 0 &&
                                          simpleValidator.current.message(
                                            "state_name",
                                            stateName,
                                            ['required', { regex: /^[A-Za-z\s&-]+$/ }],
                                            {
                                              messages: {
                                                required:
                                                  "Please enter state name",
                                                regex:"Enter valid state name"
                                              },
                                            }
                                          )}
                                      </>
                                    </div>
                                    <div className="form-group">
                                      <label>Country</label>
                                      <Select
                                        options={countryOptions}
                                        placeholder="Select Country"
                                        value={countryOptions.find(
                                          (option) => option.value === country
                                        )}
                                        onChange={(selectedOption) => {
                                          setCountry(
                                            selectedOption
                                              ? selectedOption.value
                                              : ""
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={() => {
                                        {
                                          isUpdate
                                            ? updateState()
                                            : addState();
                                        }
                                      }}
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
          <ToastContainer />

          <ConfirmationDialog
            message="Are you sure you want to delete?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            show={showConfirmation}
          />
        </div>
      </div>
    </div>
  );
};

export default StateMaster;
