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
  FETCH_HOTELS_API,
  FETCH_HOTEL_TYPES_API,
  FETCH_HALTING_POINTS_API,
  FETCH_COUNTRIES_API,
  FETCH_STATES_API,
  ADD_HOTEL_API,
  UPDATE_HOTEL_API,
  DELETE_HOTEL_API,
} from "../utils/constants";
import { getDateFormatted, getFilteredDropdownOptions,toTitleCase } from "../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";
const HotelMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [hotelName, setHotelName] = useState("");
  const [hotelContact, setHotelContact] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotels, setHotels] = useState([]);
  const [originalHotelsList, setOriginalHotelsList] = useState([]);

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

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    var modal = document.getElementById("hotelModal");

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
          setDataReady(true);
          setHotels(response.data.data);
          setOriginalHotelsList(response.data.data);
        }
      }
    } catch (e) {
      setDataReady(true);
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
        hotelEmail: hotelEmail,
        hotelContactNo: hotelContact,
        fkHotelTypeId: hotelTypeId,
        fkHaltingPointId: haltDestId,
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
              fetchHotels();
              simpleValidator.current.hideMessages();
              setIsLoading(false);
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
        hotelEmail: hotelEmail,
        hotelContactNo: hotelContact,
        fkHotelTypeId: hotelTypeId,
        fkHaltingPointId: haltDestId,
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
              fetchHotels();
              simpleValidator.current.hideMessages();
              setIsLoading(false);
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
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
      setHotelAddress(hotelObj.hotelAddress);
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

  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(hotels ? hotels.length / itemsPerPage : 1);
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
      var filteredHotels = hotels?.filter(
        (row) =>
          row?.hotelName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.countryName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.stateName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.hotelTypeName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.haltingPointName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase())
      );
      setHotels(filteredHotels);
    } else {
      setHotels(originalHotelsList);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchHaltDestinations();
    fetchHotels();
    fetchHotelTypes();
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

  useEffect(() => {
    let filteredDestinations = getFilteredDropdownOptions(
      stateId,
      haltDests,
      "state"
    );
    let destinationsOptionsArray = [];
    filteredDestinations.forEach((haltDest) => {
      destinationsOptionsArray.push({
        value: haltDest.id,
        label: haltDest.haltingPointName,
      });
    });
    setHaltDestOptions(destinationsOptionsArray);
  }, [stateId]);
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
                  <ion-icon name="business-outline" color="primary"></ion-icon>
                  <h4 className="card-title mt-1 ml-1">Hotel Master</h4>
                </div>
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
                            {hotels && hotels.length > 0 && (
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
                                      Hotel Name
                                    </th>
                                    <th style={{ width: "171.375px" }}>
                                      Hotel Type
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
                                    <th style={{ width: "171.375px" }}>
                                      Contact Number
                                    </th>
                                    <th style={{ width: "171.375px" }}>
                                      Email
                                    </th>
                                    <th style={{ width: "171.375px" }}>
                                      Address
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
                                  {hotels &&
                                    hotels
                                      .slice(startIndex, endIndex)
                                      .map((hotel, index) => (
                                        <CSSTransition
                                          key={hotel.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {" "}
                                              {startIndex + index + 1}
                                            </td>
                                            <td>{toTitleCase(hotel.hotelName)}</td>
                                            <td>{toTitleCase(hotel.hotelTypeName)}</td>
                                            <td>{toTitleCase(hotel.haltingPointName)}</td>
                                            <td>{toTitleCase(hotel.stateName)}</td>
                                            <td>{toTitleCase(hotel.countryName)}</td>
                                            <td>
                                              {hotel.hotelContactNo
                                                ? hotel.hotelContactNo
                                                : "N.A."}
                                            </td>
                                            <td>
                                              {hotel.hotelEmail
                                                ? hotel.hotelEmail
                                                : "N.A."}
                                            </td>
                                            <td>
                                              {hotel.hotelAddress
                                                ? hotel.hotelAddress
                                                : "N.A."}
                                            </td>
                                            <td>
                                              {getDateFormatted(
                                                hotel.createdAt
                                              )}
                                            </td>
                                            <td>
                                              <label
                                                className={`badge ${
                                                  hotel.status == "1"
                                                    ? "badge-outline-success"
                                                    : "badge-outline-danger"
                                                }`}
                                              >
                                                {hotel.status == "1"
                                                  ? "Active"
                                                  : "Inactive"}
                                              </label>
                                            </td>
                                            <td>
                                              <ion-icon
                                                onClick={() =>
                                                  openModal(hotel.id)
                                                }
                                                name="create-outline"
                                                color="primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#hotelModal"
                                              ></ion-icon>
                                              <ion-icon
                                                name="trash-outline"
                                                color="danger"
                                                style={{ marginRight: "10px" }}
                                                onClick={() => {
                                                  setShowConfirmation(true);
                                                  setDeleteId(hotel.id);
                                                }}
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
                                    <div className="form-group row">
                                      <div className="col-sm-6">
                                        <label>Hotel Contact No.</label>
                                        <input
                                          type="text"
                                          pattern="[0-9]{10}"
                                          className="form-control form-control-sm"
                                          placeholder="Enter Hotel Contact No."
                                          value={hotelContact}
                                          onBlur={() => {
                                            simpleValidator.current.showMessageFor(
                                              "hotelContact"
                                            );
                                          }}
                                          onChange={(event) => {
                                            const newValue =
                                              event.target.value.trim();
                                            if (/^\d*$/.test(newValue)) {
                                              setHotelContact(
                                                event.target.value
                                              );
                                            }
                                          }}
                                        />
                                        <>
                                          {simpleValidator.current.element
                                            .length > 0 &&
                                            simpleValidator.current.message(
                                              "hotelContact",
                                              hotelContact,
                                              [
                                                "required",
                                                { regex: /^[0-9]+$/ },
                                              ],
                                              {
                                                messages: {
                                                  required:
                                                    "Please enter hotel contact number ",
                                                  regex:
                                                    "Enter valid hotel contact number",
                                                },
                                              }
                                            )}
                                        </>
                                      </div>
                                      <div className="col-sm-6">
                                        <label>Hotel Email</label>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          placeholder="Enter Hotel Email"
                                          value={hotelEmail}
                                          onChange={(e) => {
                                            setHotelEmail(e.target.value);
                                          }}
                                          onBlur={() => {
                                            simpleValidator.current.showMessageFor(
                                              "hotelEmail"
                                            );
                                          }}
                                        />
                                        <>
                                          {simpleValidator.current.element
                                            .length > 0 &&
                                            simpleValidator.current.message(
                                              "hotelEmail",
                                              hotelEmail,
                                              ["required", "email"],
                                              {
                                                messages: {
                                                  required:
                                                    "Please enter  email",
                                                  email: "Enter valid  email",
                                                },
                                              }
                                            )}
                                        </>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label>Hotel Type</label>
                                      <Select
                                        options={hotelTypeOptions}
                                        placeholder="Select Hotel Type"
                                        name="hotel_type"
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
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "hotel_type"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.message(
                                          "hotel_type",
                                          country,
                                          ["required"],
                                          {
                                            messages: {
                                              required:
                                                "Please select hotel type",
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
                                        name="state_name"
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
                                    <div className="form-group">
                                      <label>Halting Destination</label>
                                      <Select
                                        options={haltDestOptions}
                                        placeholder="Select Halting Destination"
                                        name="halt_dest"
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
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "halt_dest"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.message(
                                          "halt_dest",
                                          country,
                                          ["required"],
                                          {
                                            messages: {
                                              required:
                                                "Please select halting destination",
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
                          <div className="col-sm-12 col-md-12">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="order-listing_paginate"
                            >
                              <RenderPageNumbers
                                data={hotels}
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

export default HotelMaster;
