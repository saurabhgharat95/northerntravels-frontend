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
} from "../components/CommonImport";
import {
  FETCH_HOTELS_API,
  FETCH_HOTEL_TYPES_API,
  FETCH_HALTING_POINTS_API,
  FETCH_COUNTRY_API,
  FETCH_STATES_API,
  ADD_HOTEL_API,
  UPDATE_HOTEL_API,
  DELETE_HOTEL_API,
} from "../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";

const HotelMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [hotelName, setHotelName] = useState("");
  const [hotels, setHotels] = useState([]);
  const [hotelAddress, setHotelAddress] = useState("");

  const [stateId, setStateId] = useState(null);
  const [statesList, setStates] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const [haltDestId, setHaltDestId] = useState(null);
  const [haltDests, setHaltDests] = useState([]);
  const [haltDestOptions, setHaltDestOptions] = useState([]);

  const [hotelTypeId, setHotelTypeId] = useState(null);
  const [hotelTypes, setHotelTypes] = useState([]);
  const [hotelTypeOptions, setHotelTypeOptions] = useState([]);

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
    document.getElementById("hotelModal").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };

  const fetchCountries = async () => {
    try {
      let url = FETCH_COUNTRY_API;

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
          let haltDestinations = response.data.data;
          let haltDestinationsArray = [];
          haltDestinations.forEach((dest) => {
            haltDestinationsArray.push({
              value: dest.id,
              label: dest.haltingPointName,
            });
          });
          setHaltDestOptions(haltDestinationsArray);
          setHaltDests(response.data.data);
        }
      }
    } catch (e) {
      setHaltDests([]);
    }
  };
  const fetchHotelTypes = async () => {
    try {
      let url = FETCH_HOTEL_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let hotelTypes = response.data.data;
          let hotelTypesArray = [];
          hotelTypes.forEach((dest) => {
            hotelTypesArray.push({
              value: dest.id,
              label: dest.hotelTypeName,
            });
          });
          setHotelTypeOptions(hotelTypesArray);
          setHotelTypes(response.data.data);
        }
      }
    } catch (e) {
      setHotelTypes([]);
    }
  };
  const fetchHotels = async () => {
    try {
      let url = FETCH_HOTELS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setHotels(response.data.data);
        }
      }
    } catch (e) {
      setHotels([]);
    }
  };
  const resetForm = () => {
    setCountry(null);
    setStateId(null);
    setHaltDestId(null);
    setHotelTypeId(null);
    setHotelAddress("");
    setHotelName("");
  };
  const addHotel = async () => {
    try {
      let url = ADD_HOTEL_API;
      let body = {
        hotelName: hotelName,
        hotelAddress: hotelAddress,
        fkHotelTypeId: hotelTypeId,
        fkHaltingPointId: haltDestId,
        fkStateId: stateId,
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
            fetchHotels();
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
  const updateHotel = async () => {
    try {
      let url = UPDATE_HOTEL_API;
      let body = {
        id: updateId,
        hotelName: hotelName,
        hotelAddress: hotelAddress,
        fkHotelTypeId: hotelTypeId,
        fkHaltingPointId: haltDestId,
        fkStateId: stateId,
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
            fetchHotels();
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
  const deleteHotel = async (id) => {
    try {
      let url = DELETE_HOTEL_API;
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

          setHotelName("");
          fetchHotels();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  const openModal = (updateId) => {
    var hotelObj = hotels.filter((hotel) => {
      return hotel.id == updateId;
    })[0];
    if (hotelObj) {
      setHotelName(hotelObj.hotelName);
      setCountry(hotelObj.fkCountryId);
      setStateId(hotelObj.fkStateId);
      setHaltDestId(hotelObj.fkHaltingPointId);
      setHotelTypeId(hotelObj.fkHotelTypeId);
      setUpdate(true);
      setUpdateId(updateId);
    }
  };

  const handleConfirm = () => {
    deleteHotel(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const getCountryName = (countryId) => {
    var countryObj = countries.filter((country) => {
      return country.id == countryId;
    })[0];
    return countryObj ? countryObj.countryName : "";
  };
  const getStateName = (stateId) => {
    var stateObj = statesList.filter((state) => {
      return state.id == stateId;
    })[0];
    return stateObj ? stateObj.stateName : "";
  };
  const getHaltDest = (haltDestId) => {
    var haltObj = haltDests.filter((haltDest) => {
      return haltDest.id == haltDestId;
    })[0];
    return haltObj ? haltObj.haltingPointName : "";
  };
  const getHotelType = (hotelTypeId) => {
    var hotelTypeObj = hotelTypes.filter((hotel) => {
      return hotel.id == hotelTypeId;
    })[0];
    return hotelTypeObj ? hotelTypeObj.hotelTypeName : "";
  };
  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchHaltDestinations();
    fetchHotels();
    fetchHotelTypes();
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
                <h4 className="card-title">Hotel Master </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#hotelModal"
                    onClick={() => {
                      resetForm();
                      setUpdate(false);
                    }}
                  >
                    Add Hotel
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
                            {hotels && hotels.length > 0 && (
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
                                      Hotel Name
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
                                      aria-label="Purchased On: activate to sort column ascending"
                                      style={{ width: "171.375px" }}
                                    >
                                      Halting Destination
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
                                  {hotels &&
                                    hotels.map((hotel, index) => (
                                      <CSSTransition
                                        key={hotel.id}
                                        timeout={500}
                                        classNames="item elementdiv"
                                      >
                                        <tr className="odd" key={index}>
                                          <td className="sorting_1">
                                            {" "}
                                            {index + 1}
                                          </td>
                                          <td>{hotel.hotelName}</td>
                                          <td>
                                            {getHotelType(hotel.fkHotelTypeId)}
                                          </td>
                                          <td>
                                            {getHaltDest(
                                              hotel.fkHaltingPointId
                                            )}
                                          </td>
                                          <td>
                                            {getStateName(hotel.fkStateId)}
                                          </td>
                                          <td>
                                            {getCountryName(hotel.fkCountryId)}
                                          </td>
                                          <td>
                                            <label
                                              className={`badge ${
                                                hotel.status == "1"
                                                  ? "badge-success"
                                                  : "badge-danger"
                                              }`}
                                            >
                                              {hotel.status == "1"
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
                                                setDeleteId(hotel.id);
                                              }}
                                            ></ion-icon>
                                            <ion-icon
                                              onClick={() =>
                                                openModal(hotel.id)
                                              }
                                              name="create-outline"
                                              color="primary"
                                              data-bs-toggle="modal"
                                              data-bs-target="#hotelModal"
                                            ></ion-icon>
                                          </td>
                                        </tr>
                                      </CSSTransition>
                                    ))}
                                </tbody>
                              </table>
                            )}
                            {hotels && hotels.length == 0 && <NoData></NoData>}
                            <div
                              className="modal fade"
                              id="hotelModal"
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
                                      {isUpdate ? "Edit" : "Add"} Hotel
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
                                      <label>Hotel Name</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Hotel Name"
                                        value={hotelName}
                                        onChange={(e) => {
                                          setHotelName(e.target.value);
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "hotel_name"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.element
                                          .length > 0 &&
                                          simpleValidator.current.message(
                                            "hotel_name",
                                            hotelName,
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
                                      <label>Hotel Type</label>
                                      <Select
                                        options={hotelTypeOptions}
                                        placeholder="Select Hotel Type"
                                        value={
                                          hotelTypeId
                                            ? hotelTypeOptions.find(
                                                (option) =>
                                                  option.value === hotelTypeId
                                              )
                                            : null
                                        }
                                        onChange={(selectedOption) => {
                                          setHotelTypeId(
                                            selectedOption
                                              ? selectedOption.value
                                              : ""
                                          );
                                        }}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Halting Destination</label>
                                      <Select
                                        options={haltDestOptions}
                                        placeholder="Select Halting Destination"
                                        value={
                                          haltDestId
                                            ? haltDestOptions.find(
                                                (option) =>
                                                  option.value === haltDestId
                                              )
                                            : null
                                        }
                                        onChange={(selectedOption) => {
                                          setHaltDestId(
                                            selectedOption
                                              ? selectedOption.value
                                              : ""
                                          );
                                        }}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>State / Location</label>
                                      <Select
                                        options={stateOptions}
                                        placeholder="Select State / Location"
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
                                      />
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
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={() => {
                                        {
                                          isUpdate ? updateHotel() : addHotel();
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

export default HotelMaster;
