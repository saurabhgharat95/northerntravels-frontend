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
  FETCH_HOTEL_ROOMS_API,
  DELETE_HOTEL_ROOM_API,
  FETCH_HOTEL_ROOM_DETAILS_API,
  FETCH_MEAL_TYPES_API,
} from "../utils/constants";
import { getDateFormatted } from "../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";
import AddRoomForm from "./AddRoomForm";
const HotelRoomManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [formModule, setFormModule] = useState("hotel");

  const [hotels, setHotels] = useState([]);
  const [originalHotelsList, setOriginalHotelsList] = useState([]);
  const [thElements, setThElements] = useState([]);

  const [selectedHotel, setSelectHotel] = useState({
    id: null,
    name: "",
    roomType: "",
  });
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotelRoomDetails, setHotelRoomDetails] = useState([]);
  const [originalHotelRooms, setOriginalHotelRooms] = useState([]);

  const [isUpdate, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [isRoomDataReady, setRoomDataReady] = useState(false);

  const [formType, setFormType] = useState("add");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const accomodationObj = {
    1: "Room Charges/Double Room",
    2: "Extra Bed",
    3: "Child Without Bed Charge",
    4: "Extra Child Below 5 Yrs Charge",
    5: "Single Occupancy",
  };
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const [, setForceUpdate] = useState(0);

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
  const fetchHotelRooms = async (id, hotelName) => {
    try {
      let url = FETCH_HOTEL_ROOMS_API;
      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          if (response.data.data.length > 0) {
            var hotelRooms = response.data.data.filter((room) => {
              return room.fkHotelId == id;
            });
            setHotelRooms(hotelRooms);
            setOriginalHotelRooms(response.data.data);
          }
          setSelectHotel((prev) => ({ ...prev, id: id, name: hotelName }));
        }
      }
    } catch (e) {
      setHotelRooms([]);
    }
  };
  const groupedData = (data) => {
    return data.reduce((acc, item) => {
      const { fkRoomAccommodationId, ...rest } = item;
      if (!acc[fkRoomAccommodationId]) {
        acc[fkRoomAccommodationId] = [];
      }
      acc[fkRoomAccommodationId].push(rest);

      return acc;
    }, {});
  };
  const fetchHotelRoomDetails = async (id) => {
    try {
      let url = FETCH_HOTEL_ROOM_DETAILS_API;
      let body = {
        id: id,
      };
      setRoomDataReady(false);
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          if (response.data.data) {
            if (response.data.data.roomChargesData.length > 0) {
              let roomDetails = groupedData(response.data.data.roomChargesData);
              setRoomDataReady(true);

              // console.log("roomDetails", truncatedData);
              setHotelRoomDetails(roomDetails);
            }
          }
        }
      }
    } catch (e) {
      setHotelRooms([]);
      setRoomDataReady(true);
    }
  };
  const deleteHotelRoom = async (id) => {
    try {
      let url = DELETE_HOTEL_ROOM_API;
      let body = {
        id: id,
      };
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        setIsLoading(false);
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          fetchHotelRooms(selectedHotel.id, selectedHotel.name);
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const viewRooms = (id, hotelName) => {
    setFormModule("room");
    fetchHotelRooms(id, hotelName);
  };
  const viewCharges = (id, roomType) => {
    fetchHotelRoomDetails(id);
    setSelectHotel((prev) => ({ ...prev, roomType: roomType }));

    setFormModule("charges");
  };
  const cancelForm = () => {
    setForceUpdate((v) => ++v);
    fetchHotelRooms(selectedHotel.id, selectedHotel.name);
    setFormModule("room");
  };
  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(hotels ? hotels.length / itemsPerPage : 1);
  const totalPagesRooms = Math.ceil(
    hotelRooms ? hotelRooms.length / itemsPerPage : 1
  );
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleConfirm = () => {
    deleteHotelRoom(deleteId);
    setShowConfirmation(false);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escaping special characters
  };
  const filterData = (searchValue, type) => {
    setSearchValue(searchValue);
    if (searchValue && searchValue.trim() !== "") {
      var escapedSearchValue = escapeRegExp(searchValue); // Escaping searchValue
      if (type == "hotels") {
        var filteredHotels = hotels?.filter((row) =>
          row?.hotelName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase())
        );
        setHotels(filteredHotels);
      } else {
        var filteredRoom = hotelRooms?.filter((row) =>
          row?.roomtypes.roomTypeName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase())
        );
        setHotelRooms(filteredRoom);
      }
    } else {
      if (type == "hotels") {
        setHotels(originalHotelsList);
      } else {
        setHotelRooms(originalHotelRooms);
      }
    }
  };
  const fetchMealTypes = async () => {
    try {
      let url = FETCH_MEAL_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let mealTypes = response.data.data;
          let mealTypesOptionsArray = [];
          mealTypes.forEach((type) => {
            mealTypesOptionsArray.push({
              value: type.id,
              label: type.mealTypeName,
            });
          });
          let elements = [];
          for (let i = 0; i < 1; i++) {
            for (let j = 0; j < mealTypesOptionsArray.length; j++) {
              elements.push(
                <th
                  key={`${mealTypesOptionsArray[j].value}-1`}
                  style={{ width: "25%" }}
                  scope="col"
                >
                  {mealTypesOptionsArray[j].label}
                </th>
              );
            }
          }
          setThElements(elements);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchHotels();
    fetchMealTypes();
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
                {(formModule == "room" ||
                  formModule == "charges" ||
                  formModule == "roomform") && (
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <span onClick={() => setFormModule("hotel")}>
                        Hotel Rooms
                      </span>
                    </li>
                    {(formModule == "room" ||
                      formModule == "charges" ||
                      formModule == "roomform") && (
                      <li
                        onClick={() =>
                          viewRooms(selectedHotel.id, selectedHotel.name)
                        }
                        className={`breadcrumb-item ${
                          formModule == "room"
                            ? "font-weight-bold text-primary"
                            : ""
                        } `}
                      >
                        Rooms
                      </li>
                    )}
                    {formModule == "charges" && (
                      <li
                        onClick={() =>
                          viewCharges(selectedHotel.id, selectedHotel.roomType)
                        }
                        className={`breadcrumb-item ${
                          formModule == "charges"
                            ? "font-weight-bold text-primary"
                            : ""
                        } `}
                        // className="breadcrumb-item active font-weight-bold text-primary"
                        aria-current="page"
                      >
                        <span>Charges</span>
                      </li>
                    )}
                  </ol>
                )}
                <div className="flex">
                  <ion-icon name="business-outline" color="primary"></ion-icon>
                  <h4 className="card-title mt-1 ml-1">
                    Hotel Room Management
                  </h4>
                </div>

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
                                      onChange={(e) =>
                                        filterData(e.target.value, "hotels")
                                      }
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
                                        <th style={{ width: "127.391px" }}>
                                          Rooms
                                        </th>
                                        <th style={{ width: "127.375px" }}>
                                          Halting Dest
                                        </th>
                                        <th style={{ width: "127.375px" }}>
                                          State
                                        </th>
                                        <th style={{ width: "127.375px" }}>
                                          Country
                                        </th>
                                        <th style={{ width: "127.391px" }}>
                                          Created
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
                                                <td>{hotel.hotelName}</td>
                                                <td>
                                                  <span
                                                    onClick={() =>
                                                      viewRooms(
                                                        hotel.id,
                                                        hotel.hotelName
                                                      )
                                                    }
                                                    className="badge badge-info"
                                                  >
                                                    View Rooms
                                                  </span>
                                                </td>
                                                <td>
                                                  {hotel.haltingPointName}
                                                </td>
                                                <td>{hotel.stateName}</td>
                                                <td>{hotel.countryName}</td>
                                                <td>
                                                  {getDateFormatted(
                                                    hotel.createdAt
                                                  )}
                                                </td>
                                              </tr>
                                            </CSSTransition>
                                          ))}
                                    </tbody>
                                  </table>
                                )}
                                {hotels && hotels.length == 0 && (
                                  <NoData></NoData>
                                )}
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
                  </>
                )}
                {formModule == "room" && (
                  <>
                    <div className="float-right">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setFormType("add");
                          setFormModule("roomform");
                        }}
                      >
                        Add Room
                      </button>
                    </div>
                    <div className="row">
                      <div className="pl-0 col-md-4 grid-margin stretch-card">
                        <div className="card border border-primary box-shadow-none info-card-primary">
                          <div className="card-body">
                            
                            <div className="media">
                            <img src="../../images/building.png" alt="image" />{" "}
                              {/* <ion-icon
                                color="primary"
                                name="business-outline"
                                size="large"
                              ></ion-icon> */}
                              <div className="media-body ml-2 mt-1">
                                <p className="card-text">
                                  Hotel : 
                                </p>
                                <h5><b>{selectedHotel.name}</b></h5>
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
                                      onChange={(e) =>
                                        filterData(e.target.value, "room")
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                            {isDataReady == false && <ShimmerTable row={10} />}
                            <div className="row dt-row">
                              <div className="col-sm-12">
                                {hotelRooms && hotelRooms.length > 0 && (
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
                                        <th style={{ width: "127.391px" }}>
                                          Room Type
                                        </th>
                                        <th style={{ width: "127.391px" }}>
                                          No. of Rooms
                                        </th>
                                        <th style={{ width: "127.391px" }}>
                                          AC / Non AC
                                        </th>
                                        <th style={{ width: "127.391px" }}>
                                          Charges
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
                                      {hotelRooms &&
                                        hotelRooms
                                          .slice(startIndex, endIndex)
                                          .map((hotelRoom, index) => (
                                            <CSSTransition
                                              key={hotelRoom.id}
                                              timeout={500}
                                              classNames="item elementdiv"
                                            >
                                              <tr className="odd" key={index}>
                                                <td className="sorting_1">
                                                  {" "}
                                                  {startIndex + index + 1}
                                                </td>
                                                <td>
                                                  {
                                                    hotelRoom.roomtypes
                                                      .roomTypeName
                                                  }
                                                </td>
                                                <td>{hotelRoom.noOfRooms}</td>
                                                <td>
                                                  {hotelRoom.hasAC == "1"
                                                    ? "AC"
                                                    : "Non AC"}
                                                </td>
                                                <td>
                                                  <span
                                                    className="badge badge-secondary text-light"
                                                    onClick={() =>
                                                      viewCharges(
                                                        hotelRoom.id,
                                                        hotelRoom.roomtypes
                                                          .roomTypeName
                                                      )
                                                    }
                                                  >
                                                    View Charges
                                                  </span>
                                                </td>
                                                <td>
                                                  {getDateFormatted(
                                                    hotelRoom.createdAt
                                                  )}
                                                </td>
                                                <td>
                                                  <label
                                                    className={`badge ${
                                                      hotelRoom.status == "1"
                                                        ? "badge-outline-success"
                                                        : "badge-outline-danger"
                                                    }`}
                                                  >
                                                    {hotelRoom.status == "1"
                                                      ? "Active"
                                                      : "Inactive"}
                                                  </label>
                                                </td>
                                                <td>
                                                  <ion-icon
                                                    onClick={() => {
                                                      setFormType("update");
                                                      setUpdateId(hotelRoom.id);
                                                      setFormModule("roomform");
                                                    }}
                                                    name="create-outline"
                                                    color="primary"
                                                  ></ion-icon>
                                                  <ion-icon
                                                    name="trash-outline"
                                                    color="danger"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                    onClick={() => {
                                                      setShowConfirmation(true);
                                                      setDeleteId(hotelRoom.id);
                                                    }}
                                                  ></ion-icon>
                                                </td>
                                              </tr>
                                            </CSSTransition>
                                          ))}
                                    </tbody>
                                  </table>
                                )}
                                {hotelRooms && hotelRooms.length == 0 && (
                                  <NoData></NoData>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-12">
                                <div
                                  className="dataTables_paginate paging_simple_numbers"
                                  id="order-listing_paginate"
                                >
                                  <RenderPageNumbers
                                    data={hotelRooms}
                                    currentPage={currentPage}
                                    handlePagination={handlePagination}
                                    handlePrevPage={handlePrevPage}
                                    handleNextPage={handleNextPage}
                                    totalPages={totalPagesRooms}
                                  ></RenderPageNumbers>
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
                    {isRoomDataReady && (
                      <div className="row">
                        <div className="col-md-4 grid-margin stretch-card">
                          <div className="card border border-primary box-shadow-none info-card-primary">
                            <div className="card-body">
                              <div className="media">
                                <img
                                  src="../../images/building.png"
                                  alt="image"
                                />
                                {/* <ion-icon
                                  style={{ marginTop: "5px" }}
                                  color="primary"
                                  name="business-outline"
                                  size="large"
                                ></ion-icon> */}
                                <div className="media-body ml-3">
                                  <p
                                    className="card-text"
                                    style={{ marginBottom: 0 }}
                                  >
                                    Hotel : <b>{selectedHotel.name}</b>
                                  </p>
                                  <p className="card-text">
                                    Room Type : <b>{selectedHotel.roomType}</b>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <p>
                        <b>Filter Year :</b>{" "}
                      </p>
                      <span
                        className={`badge border border-primary text-primary mr-2`}
                      >
                        2023
                      </span>
                      <span
                        className={`badge  badge-secondary text-light mr-2`}
                      >
                        2024
                      </span>
                      <span
                        className={`badge border border-info text-info mr-2`}
                      >
                        2025
                      </span>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col-12">
                        <div className="table-responsive">
                          <div
                            id="order-listing_wrapper"
                            className="dataTables_wrapper dt-bootstrap5 no-footer"
                          >
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
                                      colSpan={8}
                                    >
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="media">
                                            <ion-icon
                                              style={{ marginTop: "8px" }}
                                              color="secondary"
                                              name="calendar-outline"
                                              size="large"
                                            ></ion-icon>
                                            <div className="media-body ml-2">
                                              <p className="card-text text-left">
                                                From Date :
                                              </p>
                                              <p className="text-left">
                                                <b>01-01-2024</b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="media">
                                            <ion-icon
                                              style={{ marginTop: "8px" }}
                                              color="secondary"
                                              name="calendar-outline"
                                              size="large"
                                            ></ion-icon>
                                            <div className="media-body ml-2">
                                              <p className="card-text text-left">
                                                To Date :
                                              </p>
                                              <p className="text-left">
                                                <b>30-04-2024</b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    {thElements}
                                  </tr>
                                  {hotelRoomDetails &&
                                    isRoomDataReady &&
                                    Object.entries(hotelRoomDetails).map(
                                      ([key, value]) => (
                                        <>
                                          <tr>
                                            <th>{accomodationObj[key]}</th>
                                            {value
                                              ?.slice(0, 4)
                                              .map((item, index) => (
                                                <td key={index}>
                                                  {item["charges"]}
                                                </td>
                                              ))}
                                          </tr>
                                        </>
                                      )
                                    )}
                                  {isRoomDataReady == false && (
                                    <ShimmerTable row={7} />
                                  )}
                                </table>
                                <br></br>

                                <table
                                  id="order-listing"
                                  className="table table-bordered dataTable no-footer table-responsive"
                                  aria-describedby="order-listing_info"
                                >
                                  <tr>
                                    <td></td>
                                    <td
                                      className="text-center border-left border-right"
                                      colSpan={8}
                                    >
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="media">
                                            <ion-icon
                                              style={{ marginTop: "8px" }}
                                              color="tertiary"
                                              name="calendar-outline"
                                              size="large"
                                            ></ion-icon>
                                            <div className="media-body ml-2">
                                              <p className="card-text text-left">
                                                From Date :
                                              </p>
                                              <p className="text-left">
                                                <b>01-05-2024</b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="media">
                                            <ion-icon
                                              style={{ marginTop: "8px" }}
                                              color="tertiary"
                                              name="calendar-outline"
                                              size="large"
                                            ></ion-icon>
                                            <div className="media-body ml-2">
                                              <p className="card-text text-left">
                                                To Date :
                                              </p>
                                              <p className="text-left">
                                                <b>30-09-2024</b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    {thElements}
                                  </tr>
                                  {hotelRoomDetails &&
                                    isRoomDataReady &&
                                    Object.entries(hotelRoomDetails).map(
                                      ([key, value]) => (
                                        <>
                                          <tr>
                                            <th>{accomodationObj[key]}</th>
                                            {value
                                              ?.slice(0, 4)
                                              .map((item, index) => (
                                                <td key={index}>
                                                  {item["charges"]}
                                                </td>
                                              ))}
                                          </tr>
                                        </>
                                      )
                                    )}
                                  {isRoomDataReady == false && (
                                    <ShimmerTable row={7} />
                                  )}
                                </table>
                                <br></br>
                                <table
                                  id="order-listing"
                                  className="table table-bordered dataTable no-footer table-responsive"
                                  aria-describedby="order-listing_info"
                                >
                                  <tr>
                                    <td></td>
                                    <td
                                      className="text-center border-left border-right"
                                      colSpan={8}
                                    >
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="media">
                                            <ion-icon
                                              style={{ marginTop: "8px" }}
                                              color="primary"
                                              name="calendar-outline"
                                              size="large"
                                            ></ion-icon>
                                            <div className="media-body ml-2">
                                              <p className="card-text text-left">
                                                From Date :
                                              </p>
                                              <p className="text-left">
                                                <b>01-10-2024</b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="media">
                                            <ion-icon
                                              style={{ marginTop: "8px" }}
                                              color="primary"
                                              name="calendar-outline"
                                              size="large"
                                            ></ion-icon>
                                            <div className="media-body ml-2">
                                              <p className="card-text text-left">
                                                To Date :
                                              </p>
                                              <p className="text-left">
                                                <b>31-12-2024</b>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th></th>
                                    {thElements}
                                  </tr>
                                  {hotelRoomDetails &&
                                    isRoomDataReady &&
                                    Object.entries(hotelRoomDetails).map(
                                      ([key, value]) => (
                                        <>
                                          <tr>
                                            <th>{accomodationObj[key]}</th>
                                            {value
                                              ?.slice(0, 4)
                                              .map((item, index) => (
                                                <td key={index}>
                                                  {item["charges"]}
                                                </td>
                                              ))}
                                          </tr>
                                        </>
                                      )
                                    )}
                                  {isRoomDataReady == false && (
                                    <ShimmerTable row={7} />
                                  )}
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {formModule == "roomform" && (
                  <AddRoomForm
                    cancelForm={cancelForm}
                    hotelId={selectedHotel.id}
                    formType={formType}
                    updateId={formType == "update" ? updateId : ""}
                  ></AddRoomForm>
                )}
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
export default HotelRoomManagement;
