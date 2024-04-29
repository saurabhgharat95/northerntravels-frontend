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
  ShimmerTable,
} from "../components/CommonImport";
import {
  FETCH_ROOM_TYPES_API,
  ADD_ROOM_TYPE_API,
  UPDATE_ROOM_TYPE_API,
  DELETE_ROOM_TYPE_API,
} from "../utils/constants";
import { getDateFormatted } from "../utils/helpers";

import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";

const RoomTypeMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [originalRoomTypesList, setOriginalRoomTypesList] = useState([]);

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
    document
      .getElementById("roomTypeModal")
      .classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };
  const fetchRoomTypes = async () => {
    try {
      let url = FETCH_ROOM_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setDataReady(true);
          setRoomTypes(response.data.data);
          setOriginalRoomTypesList(response.data.data);
        }
      }
    } catch (e) {
      setDataReady(true);
      setRoomTypes([]);
    }
  };
  const resetForm = () => {
    setRoomType("");
  };
  const addRoomType = async () => {
    try {
      let url = ADD_ROOM_TYPE_API;
      let body = {
        roomTypeName: roomType,
      };
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            handleCloseModal();
            resetForm();
            fetchRoomTypes();
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
  const updateRoomType = async () => {
    try {
      let url = UPDATE_ROOM_TYPE_API;
      let body = {
        id: updateId,
        roomTypeName: roomType,
      };
      setIsLoading(true);

      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });

            handleCloseModal();
            resetForm();
            fetchRoomTypes();
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
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
  const deleteRoomType = async (id) => {
    try {
      let url = DELETE_ROOM_TYPE_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          setRoomType("");
          fetchRoomTypes();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  const openModal = (updateId) => {
    var roomTypeObj = roomTypes.filter((roomType) => {
      return roomType.id == updateId;
    })[0];
    if (roomTypeObj) {
      setRoomType(roomTypeObj.roomTypeName);
      setUpdate(true);
      setUpdateId(updateId);
    }
  };

  const handleConfirm = () => {
    deleteRoomType(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(roomTypes ? roomTypes.length / itemsPerPage : 1);
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
      var filteredRoomType = roomTypes?.filter((row) =>
        row?.roomTypeName
          ?.toLowerCase()
          .includes(escapedSearchValue.toLowerCase())
      );
      setRoomTypes(filteredRoomType);
    } else {
      setRoomTypes(originalRoomTypesList);
    }
  };
  useEffect(() => {
    fetchRoomTypes();
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
                  <ion-icon
                    name="bed-outline"
                    color="primary"
                  ></ion-icon>
                  <h4 className="card-title mt-1 ml-1">Room Type Master</h4>
                </div>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#roomTypeModal"
                    onClick={() => {
                      setRoomType("");
                      setUpdate(false);
                    }}
                  >
                    Add Room Type
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
                            {roomTypes && roomTypes.length > 0 && (
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
                                      Room Type
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
                                  {roomTypes &&
                                    roomTypes
                                      .slice(startIndex, endIndex)
                                      .map((roomType, index) => (
                                        <CSSTransition
                                          key={roomType.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {startIndex + index + 1}
                                            </td>
                                            <td>{roomType.roomTypeName}</td>
                                            <td>
                                              {getDateFormatted(
                                                roomType.createdAt
                                              )}
                                            </td>
                                            <td>
                                              <label
                                                className={`badge ${
                                                  roomType.status == "1"
                                                    ? "badge-success"
                                                    : "badge-danger"
                                                }`}
                                              >
                                                {roomType.status == "1"
                                                  ? "Active"
                                                  : "Inactive"}
                                              </label>
                                            </td>
                                            <td>
                                              <ion-icon
                                                onClick={() =>
                                                  openModal(roomType.id)
                                                }
                                                name="create-outline"
                                                color="primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#roomTypeModal"
                                              ></ion-icon>
                                              <ion-icon
                                                name="trash-outline"
                                                color="danger"
                                                style={{ marginRight: "10px" }}
                                                onClick={() => {
                                                  setShowConfirmation(true);
                                                  setDeleteId(roomType.id);
                                                }}
                                              ></ion-icon>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {roomTypes && roomTypes.length == 0 && (
                              <NoData></NoData>
                            )}
                            <div
                              className="modal fade"
                              id="roomTypeModal"
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
                                      {isUpdate ? "Edit" : "Add"} Room Type
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
                                      <label>Room Type</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Room Type"
                                        value={roomType}
                                        onChange={(e) => {
                                          setRoomType(e.target.value);
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "room_type"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.element
                                          .length > 0 &&
                                          simpleValidator.current.message(
                                            "room_type",
                                            roomType,
                                            [
                                              "required",
                                              { regex: /^[A-Za-z\s&-]+$/ },
                                            ],
                                            {
                                              messages: {
                                                required:
                                                  "Please enter room type",
                                                regex: "Enter valid room type",
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
                                            ? updateRoomType()
                                            : addRoomType();
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
                                data={roomTypes}
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
          <ToastContainer />

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

export default RoomTypeMaster;
