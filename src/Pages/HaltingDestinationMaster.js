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
  Select,
  ShimmerTable,
} from "../components/CommonImport";
import {
  FETCH_HALTING_POINTS_API,
  FETCH_COUNTRIES_API,
  FETCH_STATES_API,
  ADD_HALTING_POINT_API,
  UPDATE_HALTING_POINT_API,
  DELETE_HALTING_POINT_API,
} from "../utils/constants";
import { getDateFormatted, getFilteredDropdownOptions,toTitleCase } from "../utils/helpers";

import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";

const HaltingDestinationMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [haltDests, setHaltDests] = useState([]);
  const [originalHaltDestsList, setOriginalHaltDestsList] = useState([]);
  const [haltDestName, setHaltDestName] = useState("");
  const [stateId, setStateId] = useState([]);
  const [statesList, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [, setForceUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const handleCloseModal = () => {
    var modal = document.getElementById("haltDestModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const fetchCountries = async () => {
    try {
      let url = FETCH_COUNTRIES_API;

      let response = await axios.post(url);
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
          let states = response.data.data;
          let stateOptionsArray = [];
          states.forEach((state) => {
            stateOptionsArray.push({
              value: state.id,
              label: state.stateName,
            });
          });
          setStateOptions(stateOptionsArray);
          setStates(response.data.data);
        }
      }
    } catch (e) {
      setStates([]);
    }
  };
  const fetchHaltDestinations = async () => {
    try {
      let url = FETCH_HALTING_POINTS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setDataReady(true);

          setHaltDests(response.data.data);
          setOriginalHaltDestsList(response.data.data);
        }
      }
    } catch (e) {
      setDataReady(true);

      setHaltDests([]);
    }
  };
  const resetForm = () => {
    setCountry(null);
    setStateId(null);
    setHaltDestName("");
  };
  const addHaltingDestination = async () => {
    try {
      let url = ADD_HALTING_POINT_API;
      let body = {
        haltingPointName: haltDestName,
        fkStateId: stateId,
        fkCountryId: country,
      };
      setIsLoading(true);

      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            setIsLoading(false);

            if (response.data.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              toast.success(response.data.message, {
                position: "top-right",
              });
              handleCloseModal();
              resetForm();
              fetchHaltDestinations();
              simpleValidator.current.hideMessages();
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
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
  const updateHaltDestination = async () => {
    try {
      let url = UPDATE_HALTING_POINT_API;
      let body = {
        id: updateId,
        haltingPointName: haltDestName,
        fkStateId: stateId,
        fkCountryId: country,
      };
      setIsLoading(true);

      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            setIsLoading(false);

            if (response.data.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              toast.success(response.data.message, {
                position: "top-right",
              });

              handleCloseModal();
              resetForm();
              fetchHaltDestinations();
              simpleValidator.current.hideMessages();
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);

      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const deleteHaltDestination = async (id) => {
    try {
      let url = DELETE_HALTING_POINT_API;
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

          setHaltDestName("");
          fetchHaltDestinations();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  const openModal = (updateId) => {
    var haltDestObj = haltDests.filter((point) => {
      return point.id == updateId;
    })[0];
    if (haltDestObj) {
      setHotelDestName(haltDestObj.haltingPointName);
      setCountry(haltDestObj.fkCountryId);
      setStateId(haltDestObj.fkStateId);
      setUpdate(true);
      setUpdateId(updateId);
    }
  };

  const handleConfirm = () => {
    deleteHaltDestination(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(haltDests ? haltDests.length / itemsPerPage : 1);
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
      var filteredDest = haltDests?.filter(
        (row) =>
          row?.haltDestName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.countryName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.stateName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase())
      );
      setHaltDests(filteredDest);
    } else {
      setHaltDests(originalHaltDestsList);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchHaltDestinations();
  }, []);
  useEffect(() => {
    let filteredStates = getFilteredDropdownOptions(
      country,
      statesList,
      "country"
    );
    let stateOptionsArray = [];
    filteredStates.forEach((state) => {
      stateOptionsArray.push({
        value: state.id,
        label: state.stateName,
      });
    });
    setStateOptions(stateOptionsArray);
  }, [country]);
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
                  <ion-icon name="location-outline" color="primary"></ion-icon>
                  <h4 className="card-title mt-1 ml-1">
                    Halting Destination Master
                  </h4>
                </div>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#haltDestModal"
                    onClick={() => {
                      resetForm();
                      setUpdate(false);
                    }}
                  >
                    Add Halting Destination
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
                            {haltDests && haltDests.length > 0 && (
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
                                      Halting Destination
                                    </th>
                                    <th style={{ width: "171.375px" }}>
                                      State / Location
                                    </th>
                                    <th style={{ width: "171.375px" }}>
                                      Country
                                    </th>
                                    <th style={{ width: "127.391px" }}>
                                      Created
                                    </th>
                                    <th style={{ width: "127.391px" }}>
                                      Status
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {haltDests &&
                                    haltDests
                                      .slice(startIndex, endIndex)
                                      .map((point, index) => (
                                        <CSSTransition
                                          key={point.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {" "}
                                              {startIndex + index + 1}
                                            </td>
                                            <td>{toTitleCase(point.haltingPointName)}</td>

                                            <td>{toTitleCase(point.stateName)}</td>
                                            <td>{toTitleCase(point.countryName)}</td>
                                            <td>
                                              {getDateFormatted(
                                                point.createdAt
                                              )}
                                            </td>
                                            <td>
                                              <label
                                                className={`badge ${
                                                  point.status == "1"
                                                    ? "badge-outline-success"
                                                    : "badge-outline-danger"
                                                }`}
                                              >
                                                {point.status == "1"
                                                  ? "Active"
                                                  : "Inactive"}
                                              </label>
                                            </td>
                                            <td>
                                              <ion-icon
                                                onClick={() =>
                                                  openModal(point.id)
                                                }
                                                name="create-outline"
                                                color="primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#haltDestModal"
                                              ></ion-icon>
                                              <ion-icon
                                                name="trash-outline"
                                                color="danger"
                                                style={{ marginRight: "10px" }}
                                                onClick={() => {
                                                  setShowConfirmation(true);
                                                  setDeleteId(point.id);
                                                }}
                                              ></ion-icon>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {haltDests && haltDests.length == 0 && (
                              <NoData></NoData>
                            )}
                            <div
                              className="modal fade"
                              id="haltDestModal"
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
                                      {isUpdate ? "Edit" : "Add"} Halting
                                      Destination
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
                                      <label>Halting Destination</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Halting Destination"
                                        value={haltDestName}
                                        onChange={(e) => {
                                          setHaltDestName(e.target.value);
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "halt_dest_name"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.element
                                          .length > 0 &&
                                          simpleValidator.current.message(
                                            "halt_dest_name",
                                            haltDestName,
                                            [
                                              "required",
                                              { regex: /^[A-Za-z\s&-]+$/ },
                                            ],
                                            {
                                              messages: {
                                                required:
                                                  "Please enter halting destination",
                                                regex:
                                                  "Enter valid halting destination",
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
                                        value={
                                          country
                                            ? countryOptions.find(
                                                (option) =>
                                                  option.value === country
                                              )
                                            : null
                                        }
                                        onChange={(selectedOption) => {
                                          setCountry(
                                            selectedOption
                                              ? selectedOption.value
                                              : null
                                          );
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "country_name"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.message(
                                          "country_name",
                                          country,
                                          ["required"],
                                          {
                                            messages: {
                                              required: "Please select country",
                                            },
                                          }
                                        )}
                                      </>
                                    </div>
                                    <div className="form-group">
                                      <label>State / Location</label>
                                      <Select
                                        options={stateOptions}
                                        placeholder="Select State"
                                        value={
                                          stateId
                                            ? stateOptions.find(
                                                (option) =>
                                                  option.value === stateId
                                              )
                                            : null
                                        }
                                        onChange={(selectedOption) => {
                                          setStateId(
                                            selectedOption
                                              ? selectedOption.value
                                              : ""
                                          );
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "state_name"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.message(
                                          "state_name",
                                          stateId,
                                          ["required"],
                                          {
                                            messages: {
                                              required: "Please select state",
                                            },
                                          }
                                        )}
                                      </>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={() => {
                                        {
                                          isUpdate
                                            ? updateHaltDestination()
                                            : addHaltingDestination();
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
                          <div className="col-sm-12 col-md-12">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="order-listing_paginate"
                            >
                              <RenderPageNumbers
                                data={haltDests}
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

export default HaltingDestinationMaster;
