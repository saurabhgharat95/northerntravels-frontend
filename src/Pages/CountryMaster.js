import { useEffect, useState, useRef } from "react";
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
  FETCH_COUNTRY_API,
  ADD_COUNTRY_API,
  DELETE_COUNTRY_API,
  UPDATE_COUNTRY_API,
} from "../utils/constants";
import { getDateFormatted } from "../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";

const CountryMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [originalCountriesList, setOriginalCountriesList] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: this })
  );
  const handleCloseModal = () => {
    document.getElementById("countryModal").classList.remove("show", "d-block");
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
          setDataReady(true);
          setCountries(response.data.data);
          setOriginalCountriesList(response.data.data);
        }
      }
    } catch (e) {
      setCountries([]);
      setDataReady(true);
    }
  };

  const addCountry = async () => {
    try {
      let url = ADD_COUNTRY_API;
      let body = {
        countryName: countryName,
      };
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        console.log("response", response);
        if (response) {
          setIsLoading(false);

          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            handleCloseModal();
            setCountryName("");
            fetchCountries();
            simpleValidator.current.hideMessages();
          }
        }
      } else {
        setIsLoading(false);

        simpleValidator.current.showMessages();
      }
    } catch (e) {
      setIsLoading(false);

      console.log("ee", e);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateCountry = async () => {
    try {
      let url = UPDATE_COUNTRY_API;
      let body = {
        countryName: countryName,
        id: updateId,
      };
      setIsLoading(true);

      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            setIsLoading(false);

            handleCloseModal();
            setCountryName("");
            fetchCountries();
            simpleValidator.current.hideMessages();
          }
        }
      } else {
        setIsLoading(false);

        simpleValidator.current.showMessages();
      }
    } catch (e) {
      setIsLoading(false);

      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const deleteCountry = async (id) => {
    try {
      let url = DELETE_COUNTRY_API;
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

          setCountryName("");
          fetchCountries();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  const openModal = (countryName, updateId) => {
    setCountryName(countryName);
    setUpdate(true);
    setUpdateId(updateId);
  };

  const handleConfirm = () => {
    deleteCountry(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setShowConfirmation(false);
  };

  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(countries ? countries.length / itemsPerPage : 1);
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
      var filteredCountries = countries?.filter((row) =>
        row?.countryName
          ?.toLowerCase()
          .includes(escapedSearchValue.toLowerCase())
      );
      setCountries(filteredCountries);
    } else {
      setCountries(originalCountriesList);
    }
  };

  useEffect(() => {
    fetchCountries();
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
                <h4 className="card-title">Countries Master </h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#countryModal"
                    onClick={() => {
                      setCountryName("");
                      setUpdate(false);
                    }}
                  >
                    Add Country
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
                                  {/* <option value="">All</option> */}
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
                            {countries && countries.length > 0 && (
                              <table
                                id="order-listing"
                                className="table dataTable no-footer dataTables_paginate"
                                aria-describedby="order-listing_info"
                              >
                                <thead>
                                  <tr>
                                    <th style={{ width: "107.016px" }}>
                                      Sr. No.
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
                                  {countries &&
                                    countries.length > 0 &&
                                    countries
                                      .slice(startIndex, endIndex)
                                      .map((country, index) => (
                                        <CSSTransition
                                          key={country.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {startIndex + index + 1}
                                            </td>
                                            <td>{country.countryName}</td>
                                            <td>
                                              {getDateFormatted(
                                                country.createdAt
                                              )}
                                            </td>
                                            <td>
                                              <label
                                                className={`badge ${
                                                  country.status == "1"
                                                    ? "badge-success"
                                                    : "badge-danger"
                                                }`}
                                              >
                                                {country.status == "1"
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
                                                  setDeleteId(country.id);
                                                }}
                                              ></ion-icon>
                                              <ion-icon
                                                onClick={() =>
                                                  openModal(
                                                    country.countryName,
                                                    country.id
                                                  )
                                                }
                                                name="create-outline"
                                                color="primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#countryModal"
                                              ></ion-icon>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {countries && countries.length == 0 && (
                              <NoData></NoData>
                            )}

                            <div
                              className="modal fade"
                              id="countryModal"
                              tabIndex="-1"
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
                                      {isUpdate ? "Edit" : "Add"} Country
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
                                  <form>
                                    <div className="modal-body">
                                      <div className="form-group">
                                        <label>Country Name</label>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          placeholder="Enter Country Name"
                                          aria-label="Username"
                                          value={countryName}
                                          onChange={(e) => {
                                            setCountryName(e.target.value);
                                          }}
                                          onBlur={() => {
                                            simpleValidator.current.showMessageFor(
                                              "country_name"
                                            );
                                          }}
                                        />

                                        <>
                                          {simpleValidator.current.element
                                            .length > 0 &&
                                            simpleValidator.current.message(
                                              "country_name",
                                              countryName,
                                              "required|alpha_space",
                                              {
                                                messages: {
                                                  required:
                                                    "Please enter country name",
                                                  alpha_space:
                                                    "Alphabets are allowed only.",
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
                                              ? updateCountry()
                                              : addCountry();
                                          }
                                        }}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-light"
                                        data-bs-dismiss="modal"
                                        onClick={handleCloseModal}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
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
                                data={countries}
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

export default CountryMaster;
