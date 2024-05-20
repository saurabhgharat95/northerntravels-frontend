import { useEffect, useState, useRef, useCallback } from "react";
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
  FETCH_COUNTRIES_API,
  ADD_COUNTRY_API,
  DELETE_COUNTRY_API,
  UPDATE_COUNTRY_API,
} from "../utils/constants";
import { getDateFormatted, toTitleCase } from "../utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";
import debounce from "lodash.debounce";
const CountryMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [state, setState] = useState({
    countryName: "",
    countryData: {
      countries: [],
      originalCountriesList: [],
      isDataReady: false,
    },
    isUpdate: false,
    deleteId: null,
    updateId: "",
    searchValue: "",
    currentPage: 1,
    itemsPerPage: 10,
    showConfirmation: false,
    isLoading: false,
  });

  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;

  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: this })
  );
  const handleCloseModal = () => {
    var modal = document.getElementById("countryModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const fetchCountries = useCallback(async () => {
    try {
      const response = await axios.post(FETCH_COUNTRIES_API);
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          countryData: {
            countries: response.data.data,
            originalCountriesList: response.data.data,
            isDataReady: true,
          },
        }));
      }
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        countryData: {
          countries: [],
          originalCountriesList: [],
          isDataReady: true,
        },
      }));
    }
  }, []);

  const addCountry = async () => {
    try {
      const body = { countryName: state.countryName };
      setState((prevState) => ({ ...prevState, isLoading: true }));
      if (simpleValidator.current.allValid()) {
        const response = await axios.post(ADD_COUNTRY_API, body);
        setState((prevState) => ({ ...prevState, isLoading: false }));
        if (response.status === 200) {
          const { status, message } = response.data.data;
          if (status === false) {
            toast.error(message, { position: "top-right" });
          } else {
            toast.success(message, { position: "top-right" });
            handleCloseModal();
            setState((prevState) => ({ ...prevState, countryName: "" }));
            fetchCountries();
            simpleValidator.current.hideMessages();
          }
        }
      } else {
        setState((prevState) => ({ ...prevState, isLoading: false }));
        simpleValidator.current.showMessages();
      }
    } catch (e) {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      toast.error("Something Went Wrong :(", { position: "top-right" });
    }
  };

  const updateCountry = async () => {
    try {
      const body = { countryName: state.countryName, id: state.updateId };
      setState((prevState) => ({ ...prevState, isLoading: true }));
      if (simpleValidator.current.allValid()) {
        const response = await axios.post(UPDATE_COUNTRY_API, body);
        setState((prevState) => ({ ...prevState, isLoading: false }));
        if (response.status === 200) {
          const { status, message } = response.data.data;
          if (status === false) {
            toast.error(message, { position: "top-right" });
          } else {
            toast.success(message, { position: "top-right" });
            handleCloseModal();
            setState((prevState) => ({ ...prevState, countryName: "" }));
            fetchCountries();
            simpleValidator.current.hideMessages();
          }
        }
      } else {
        setState((prevState) => ({ ...prevState, isLoading: false }));
        simpleValidator.current.showMessages();
      }
    } catch (e) {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      toast.error("Something Went Wrong :(", { position: "top-right" });
    }
  };

  const deleteCountry = async (id) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await axios.post(DELETE_COUNTRY_API, { id });
      setState((prevState) => ({ ...prevState, isLoading: false }));
      if (response.status === 200) {
        toast.success(response.data.message, { position: "top-right" });
        fetchCountries();
      }
    } catch (e) {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      toast.error("Something Went Wrong :(", { position: "top-right" });
    }
  };

  const openModal = (countryName, updateId) => {
    setState((prevState) => ({
      ...prevState,
      countryName,
      isUpdate: true,
      updateId,
    }));
  };

  const handleConfirm = () => {
    deleteCountry(state.deleteId);
    setState((prevState) => ({ ...prevState, showConfirmation: false }));
  };

  const handleCancel = () => {
    setState((prevState) => ({ ...prevState, showConfirmation: false }));
  };

  const handlePagination = (number) => {
    setState((prevState) => ({ ...prevState, currentPage: Number(number) }));
  };

  const totalPages = Math.ceil(
    state.countryData.countries.length / state.itemsPerPage
  );

  const handleNextPage = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: Math.min(prevState.currentPage + 1, totalPages),
    }));
  };

  const handlePrevPage = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: Math.max(prevState.currentPage - 1, 1),
    }));
  };

  const filterData = useCallback(
    debounce((searchValue) => {
      if (searchValue.trim() !== "") {
        const filteredCountries =
          state.countryData.originalCountriesList.filter((row) =>
            row.countryName.toLowerCase().includes(searchValue.toLowerCase())
          );
        setState((prevState) => ({
          ...prevState,
          countryData: {
            ...prevState.countryData,
            countries: filteredCountries,
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          countryData: {
            ...prevState.countryData,
            countries: prevState.countryData.originalCountriesList,
          },
        }));
      }
    }, 300),
    [state.countryData.originalCountriesList]
  );
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    filterData(state.searchValue);
  }, [state.searchValue, filterData]);

  return (
    <div className="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div className="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen} isSubmenuOpen={true}></Sidebar>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="card">
              <div className="card-body">
                <div className="flex">
                  <ion-icon name="earth-outline" color="primary"></ion-icon>{" "}
                  <h4 className="card-title mt-1 ml-1"> Countries Master </h4>
                </div>

                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#countryModal"
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        countryName: "",
                        isUpdate: false,
                      }));
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
                                    setState((prevState) => ({
                                      ...prevState,
                                      itemsPerPage: Number(e.target.value),
                                    }));
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
                                  value={state.searchValue}
                                  onChange={(e) =>
                                    setState((prevState) => ({
                                      ...prevState,
                                      searchValue: e.target.value,
                                    }))
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {!state.countryData.isDataReady && (
                          <ShimmerTable row={10} />
                        )}
                        <div className="row dt-row">
                          <div className="col-sm-12">
                            {state.countryData.countries.length > 0 ? (
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
                                  {state.countryData.countries
                                    .slice(
                                      startIndex,
                                      endIndex
                                    )
                                    .map((country, index) => (
                                      <CSSTransition
                                        key={country.id}
                                        timeout={500}
                                        classNames="item elementdiv"
                                      >
                                        <tr className="odd" key={index}>
                                          <td className="sorting_1">
                                          {startIndex+  index + 1}
                                          </td>
                                          <td>
                                            {toTitleCase(country.countryName)}
                                          </td>
                                          <td>
                                            {getDateFormatted(
                                              country.createdAt
                                            )}
                                          </td>
                                          <td>
                                            <label
                                              className={`badge ${
                                                country.status == "1"
                                                  ? "badge-outline-success"
                                                  : "badge-outline-danger"
                                              }`}
                                            >
                                              {country.status == "1"
                                                ? "Active"
                                                : "Inactive"}
                                            </label>
                                          </td>

                                          <td>
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
                                            <ion-icon
                                              name="trash-outline"
                                              color="danger"
                                              style={{ marginRight: "10px" }}
                                              onClick={() => {
                                                setState((prevState) => ({
                                                  ...prevState,
                                                  showConfirmation: true,
                                                  deleteId: country.id,
                                                }));
                                              }}
                                            ></ion-icon>
                                          </td>
                                        </tr>
                                      </CSSTransition>
                                    ))}
                                </tbody>
                              </table>
                            ) : (
                              <NoData />
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
                                      {state.isUpdate ? "Edit" : "Add"} Country
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
                                          value={state.countryName}
                                          onChange={(e) =>
                                            setState((prevState) => ({
                                              ...prevState,
                                              countryName: e.target.value,
                                            }))
                                          }
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
                                              state.countryName,
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
                                          state.isUpdate
                                            ? updateCountry()
                                            : addCountry();
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
                                data={state.countryData.countries}
                                currentPage={state.currentPage}
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
            show={state.showConfirmation}
          />
          <Loader isLoading={state.isLoading}></Loader>
        </div>
      </div>
    </div>
  );
};

export default CountryMaster;
