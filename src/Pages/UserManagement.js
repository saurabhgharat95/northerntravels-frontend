import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  CSSTransition,
  axios,
  toast,
  ShimmerTable,
  SimpleReactValidator,
} from "../components/CommonImport";
import {
  ACTIVATE_USER_API,
  DEACTIVATE_USER_API,
  FETCH_USERS_API,
  RESET_USER_PASSWORD_API,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../utils/helpers";

import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";
import RenderPageNumbers from "./RenderPageNumbers";
import Loader from "../components/Loader";
const UserManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [originalUsersList, setOriginalUsersList] = useState([]);
  const [userObj, setUserObj] = useState({
    id: null,
    password: "",
  });
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
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const handleCloseModal = () => {
    var modal = document.getElementById("resetPasswordModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };
  const openModal = (id) => {
    setUserObj((prevState) => ({ ...prevState, id: id }));
  };
  const fetchUsers = async () => {
    try {
      let url = FETCH_USERS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          setDataReady(true);
          setUsers(response.data.data);
          setOriginalUsersList(response.data.data);
        }
      }
    } catch (e) {
      setDataReady(true);
      setUsers([]);
    }
  };
  const setStatus = async (status, id) => {
    try {
      let url = status == "1" ? DEACTIVATE_USER_API : ACTIVATE_USER_API;
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

          fetchUsers();
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const resetPassword = async () => {
    try {
      let url = RESET_USER_PASSWORD_API;
      let body = {
        id: userObj.id,
        userPassword: userObj.password,
      };

      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        setIsLoading(false);
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setUserObj({
            id: "",
            password: "",
          });
          handleCloseModal();

          fetchUsers();
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const handleConfirm = () => {
    deleteUser(deleteId);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handlePagination = (number) => {
    setCurrentPage(Number(number));
  };

  const totalPages = Math.ceil(users ? users.length / itemsPerPage : 1);
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
      var filteredUsers = users?.filter(
        (row) =>
          row?.userName
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.userEmail
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.userMobile
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase()) ||
          row?.loginUsername
            ?.toLowerCase()
            .includes(escapedSearchValue.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(originalUsersList);
    }
  };

  useEffect(() => {
    fetchUsers();
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
                <div className="flex ">
                  <ion-icon
                    name="document-text-outline"
                    color="primary"
                  ></ion-icon>{" "}
                  <h4 className="card-title mt-1 ml-1"> User Management </h4>
                </div>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/add-user")}
                  >
                    Add User
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
                            {users && users.length > 0 && (
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
                                      Username
                                    </th>
                                    <th style={{ width: "171.375px" }}>Name</th>
                                    <th style={{ width: "127.391px" }}>
                                      Mobile No.
                                    </th>
                                    <th style={{ width: "127.391px" }}>
                                      Address
                                    </th>
                                    <th style={{ width: "50.391px" }}>Type</th>
                                    <th style={{ width: "50.672px" }}>
                                      Status
                                    </th>
                                    <th
                                      className="text-center"
                                      style={{ width: "127.672px" }}
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {users &&
                                    users
                                      .slice(startIndex, endIndex)
                                      .map((user, index) => (
                                        <CSSTransition
                                          key={user.id}
                                          timeout={500}
                                          classNames="item elementdiv"
                                        >
                                          <tr className="odd" key={index}>
                                            <td className="sorting_1">
                                              {" "}
                                              {startIndex + index + 1}
                                            </td>
                                            <td>{user.loginUsername}</td>
                                            <td>
                                              {toTitleCase(user.userName)}
                                            </td>

                                            <td>
                                              {user.userMobile == ""
                                                ? user.userOfficeMobile
                                                : user.userMobile}
                                            </td>
                                            <td>{user.userAddress}</td>
                                            <td>
                                              {user.userRole == "1"
                                                ? "Super Admin"
                                                : user.userRole == "2"
                                                ? "Admin"
                                                : user.userRole == "3"
                                                ? "Staff"
                                                : "Outside Agent"}
                                            </td>

                                            <td>
                                              <label
                                                className={`badge ${
                                                  user.status == "1"
                                                    ? "badge-outline-success"
                                                    : "badge-outline-danger"
                                                }`}
                                              >
                                                {user.status == "1"
                                                  ? "Active"
                                                  : "Inactive"}
                                              </label>
                                            </td>
                                            <td>
                                              <label
                                                className={`badge green-badge`}
                                                data-bs-toggle="modal"
                                                data-bs-target="#resetPasswordModal"
                                                onClick={(e) => {
                                                  openModal(user.id);
                                                }}
                                              >
                                                Reset Password
                                              </label>
                                              {user.userRole!="1" && 
                                              <label
                                              className={`ml-2 badge ${user.status == "1"?"badge-danger":"badge-success"}`}
                                              onClick={(e) =>
                                                user.status == "1"
                                                  ? setStatus("1", user.id)
                                                  : setStatus("2", user.id)
                                              }
                                            >
                                              {user.status == "1"
                                                ? "Deactivate"
                                                : "Activate"}{" "}
                                              User
                                            </label>
                                              }
                                              
                                              <label
                                                className={`ml-2 badge dark-blue-badge`}
                                                onClick={() => {
                                                  navigate(
                                                    "/edit-user/" + user.id
                                                  );
                                                }}
                                              >
                                                Edit
                                              </label>
                                            </td>
                                          </tr>
                                        </CSSTransition>
                                      ))}
                                </tbody>
                              </table>
                            )}
                            {users && users.length == 0 && <NoData></NoData>}
                            <div
                              className="modal fade"
                              id="resetPasswordModal"
                              tabIndex="-1"
                              aria-labelledby="resetPasswordModal"
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
                                      Reset Password
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
                                      <label>New Password</label>
                                      <input
                                        type="password"
                                        className="form-control form-control-sm"
                                        placeholder="Enter New Password"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={4}
                                        value={userObj.password}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          if (/^\d*$/.test(value)) {
                                            setUserObj((prevState) => ({
                                              ...prevState,
                                              password: value,
                                            }));
                                          }
                                        }}
                                        onBlur={() => {
                                          simpleValidator.current.showMessageFor(
                                            "password"
                                          );
                                        }}
                                      />
                                      <small className="text-muted">
                                        Note: Please enter 4 digit PIN
                                      </small>
                                      <>
                                        {simpleValidator.current.message(
                                          "password",
                                          userObj.password,
                                          ["required"],
                                          {
                                            messages: {
                                              required: "Please enter password",
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
                                          resetPassword();
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
                                data={users}
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
export default UserManagement;
