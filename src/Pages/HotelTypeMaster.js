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
} from "../components/CommonImport";

import {
  FETCH_HOTEL_TYPES_API,
  ADD_HOTEL_TYPE_API,
  UPDATE_HOTEL_TYPE_API,
  DELETE_HOTEL_TYPE_API,
} from "../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";

const HotelTypeMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [hotelType, setHotelType] = useState("");
  const [hotelTypes, setHotelTypes] = useState([]);
  const [originalHotelTypesList, setOriginalHotelTypesList] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const handleCloseModal = () => {
    document
      .getElementById("hotelTypeModal")
      .classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };
  const fetchHotelTypes = async () => {
    try {
      let url = FETCH_HOTEL_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setHotelTypes(response.data.data);
          setOriginalHotelTypesList(response.data.data);
        }
      }
    } catch (e) {
      setHotelTypes([]);
    }
  };
  const resetForm = () => {
    setHotelType("");
  };
  const addHotelType = async () => {
    try {
      let url = ADD_HOTEL_TYPE_API;
      let body = {
        hotelTypeName: hotelType,
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
            fetchHotelTypes();
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
  const updateHotelType = async () => {
    try {
      let url = UPDATE_HOTEL_TYPE_API;
      let body = {
        id: updateId,
        hotelTypeName: hotelType,
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
            fetchHotelTypes();
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
  const deleteHotelType = async (id) => {
    try {
      let url = DELETE_HOTEL_TYPE_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          setHotelType("");
          fetchHotelTypes();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  const openModal = (updateId) => {
    var hotelTypeObj = hotelTypes.filter((hotelType) => {
      return hotelType.id == updateId;
    })[0];
    if (hotelTypeObj) {
      setHotelType(hotelTypeObj.hotelTypeName);
      setUpdate(true);
      setUpdateId(updateId);
    }
  };

  const handleConfirm = () => {
    deleteHotelType(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(
    hotelTypes ? hotelTypes.length / itemsPerPage : 1
  );
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
      var filteredHotelTypes = hotelTypes?.filter((row) =>
        row?.hotelTypeName
          ?.toLowerCase()
          .includes(escapedSearchValue.toLowerCase())
      );
      setHotelTypes(filteredHotelTypes);
    } else {
      setHotelTypes(originalHotelTypesList);
    }
  };

  useEffect(() => {
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
                <h4 className="card-title">Hotel Type Master </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#hotelTypeModal"
                    onClick={() => {
                      setHotelType("");
                      setUpdate(false);
                    }}
                  >
                    Add Hotel Type
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
                        <div className="row dt-row">
                          <div className="col-sm-12">
                            {hotelTypes && hotelTypes.length > 0 && (
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
                                      Hotel Type
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
                                  {hotelTypes &&
                                    hotelTypes
                                      .slice(startIndex, endIndex)
                                      .map((hotelType, index) => (
                                        <CSSTransition
                                          key={hotelType.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {" "}
                                              {index + 1}
                                            </td>
                                            <td>{hotelType.hotelTypeName}</td>
                                            <td>
                                              <label
                                                className={`badge ${
                                                  hotelType.status == "1"
                                                    ? "badge-success"
                                                    : "badge-danger"
                                                }`}
                                              >
                                                {hotelType.status == "1"
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
                                                  setDeleteId(hotelType.id);
                                                }}
                                              ></ion-icon>
                                              <ion-icon
                                                onClick={() =>
                                                  openModal(hotelType.id)
                                                }
                                                name="create-outline"
                                                color="primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#hotelTypeModal"
                                              ></ion-icon>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {hotelTypes && hotelTypes.length == 0 && (
                              <NoData></NoData>
                            )}
                            <div
                              className="modal fade"
                              id="hotelTypeModal"
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
                                      {isUpdate ? "Edit" : "Add"} Hotel Type
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
                                      <label>Hotel Type </label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Hotel Type "
                                        value={hotelType}
                                        onChange={(e) => {
                                          setHotelType(e.target.value);
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "hotel_type"
                                          );
                                        }}
                                      />
                                      <>
                                        {simpleValidator.current.element
                                          .length > 0 &&
                                          simpleValidator.current.message(
                                            "hotel_type",
                                            hotelType,
                                            [
                                              "required",
                                              { regex: /^[A-Za-z\s&-]+$/ },
                                            ],
                                            {
                                              messages: {
                                                required:
                                                  "Please enter hotel type",
                                                regex: "Enter valid hotel type",
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
                                            ? updateHotelType()
                                            : addHotelType();
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
                                data={hotelTypes}
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
        </div>
      </div>
    </div>
  );
};

export default HotelTypeMaster;
