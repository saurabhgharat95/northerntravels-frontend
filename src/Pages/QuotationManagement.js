import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  CSSTransition,
  axios,
  toast,
  ShimmerTable,
} from "../components/CommonImport";
import {
  BASE_URL,
  FETCH_QUOTATIONS_API,
  DELETE_QUOTATION_API,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { getDateFormatted,toTitleCase } from "../utils/helpers";

import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";
const QuotationManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [quotations, setQuotations] = useState([]);
  const [originalQuotationsList, setOriginalQuotationsList] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
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

  const fetchQuotations = async () => {
    try {
      let url = FETCH_QUOTATIONS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setDataReady(true);
          setQuotations(response.data.data);
          setOriginalQuotationsList(response.data.data);
        }
      }
    } catch (e) {
      setDataReady(true);
      setQuotations([]);
    }
  };
  const deleteQuotation = async (id) => {
    try {
      let url = DELETE_QUOTATION_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          fetchQuotations();
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const handleConfirm = () => {
    deleteQuotation(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(
    quotations ? quotations.length / itemsPerPage : 1
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
      var filteredQuotations = quotations?.filter(
        (row) =>
          row?.quotClientName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.quotNo?.toLowerCase().includes(escapedSearchValue.toLowerCase())
      );
      setQuotations(filteredQuotations);
    } else {
      setQuotations(originalQuotationsList);
    }
  };

  useEffect(() => {
    fetchQuotations();
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
                    name="document-text-outline"
                    color="primary"
                  ></ion-icon>{" "}
                  <h4 className="card-title mt-1 ml-1">
                    {" "}
                    Quotation Management{" "}
                  </h4>
                </div>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/add-quotation")}
                  >
                    Add Quotation
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
                            {quotations && quotations.length > 0 && (
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
                                      Quotation No
                                    </th>
                                    <th style={{ width: "127.391px" }}>
                                      Quotation Date
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Customer Name
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Status
                                    </th>
                                    <th style={{ width: "116.672px" }}>
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {quotations &&
                                    quotations
                                      .slice(startIndex, endIndex)
                                      .map((quotation, index) => (
                                        <CSSTransition
                                          key={quotation.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {" "}
                                              {startIndex + index + 1}
                                            </td>
                                            <td>{quotation.quotNo}</td>
                                            <td>
                                              {getDateFormatted(
                                                quotation.quotDate
                                              )}
                                            </td>
                                            <td>{toTitleCase(quotation.quotClientName)}</td>
                                            <td>
                                              <label
                                                className={`badge ${
                                                  quotation.status == "1"
                                                    ? "badge-outline-success"
                                                    : "badge-outline-danger"
                                                }`}
                                              >
                                                {quotation.status == "1"
                                                  ? "Active"
                                                  : "Inactive"}
                                              </label>
                                            </td>
                                            <td>
                                              <ion-icon
                                                name="checkbox-outline"
                                                color="success"
                                                style={{ marginRight: "10px" }}
                                                title="Approve"
                                              ></ion-icon>

                                              <a
                                                href={`${BASE_URL}/uploads/quotations/${quotation.quotFile}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <ion-icon
                                                  name="print-outline"
                                                  color="secondary"
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                  title="Print"
                                                ></ion-icon>
                                              </a>
                                              <ion-icon
                                                name="mail-outline"
                                                color="tertiary"
                                                style={{ marginRight: "10px" }}
                                                title="Email"
                                              ></ion-icon>
                                              <ion-icon
                                                name="create-outline"
                                                color="primary"
                                                style={{ marginRight: "10px" }}
                                                title="Edit"
                                                onClick={() => {
                                                  navigate(
                                                    "/edit-quotation/" +
                                                      quotation.id
                                                  );
                                                }}
                                              ></ion-icon>

                                              <ion-icon
                                                name="trash-outline"
                                                color="danger"
                                                style={{ marginRight: "10px" }}
                                                title="Delete"
                                                onClick={() => {
                                                  setShowConfirmation(true);
                                                  setDeleteId(quotation.id);
                                                }}
                                              ></ion-icon>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {quotations && quotations.length == 0 && (
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
                                data={quotations}
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
export default QuotationManagement;
