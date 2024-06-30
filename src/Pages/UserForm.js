import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  axios,
  toast,
  ToastContainer,
  Select,
  SimpleReactValidator,
} from "../components/CommonImport";

import {
  BASE_URL,
  ADD_USER_API,
  FETCH_USER_DETAILS_API,
  UPDATE_USER_API,
} from "../utils/constants";

import { base64ToFile, createFilename } from "../utils/helpers";

import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
const UserForm = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);
  const formData = useSelector((state) => state.form.tourFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [logoImage, setLogoImage] = useState("");
  const [userObj, setUserObj] = useState({
    userRole: 3,
    userType: 1,
    userCompanyName: "",
    userName: "",
    userMobile: "",
    userOfficeMobile: "",
    userAddress: "",
    userAadhaar: "",
    userEmail: "",
    userAccountNo: "",
    userIFSC: "",
    loginUsername: "",
    userPassword: "",
    userCorporateOffice: "",
    userRegionalOffice: "",
    userCompanyHotline: "",
    userCompanyEmail: "",
    userCompanyWebsite: "",
    userCompanyLogo: "",
  });
  const dispatch = useDispatch();
  const [, setForceUpdate] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const userRoleOptions = [
    {
      label: "Super Admin",
      value: "1",
    },
    {
      label: "Admin",
      value: "2",
    },
    {
      label: "Staff",
      value: "3",
    },
    {
      label: "Agent(Outside)",
      value: "4",
    },
  ];
  const handleCloseModal = () => {
    var modal = document.getElementById("imageModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };
  const simpleValidator1 = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const simpleValidator2 = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const openImageModal = (imageURL) => {
    setLogoImage(imageURL);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    try {
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target.result) {
            setUserObj((prevState) => ({
              ...prevState,
              userCompanyLogo: e.target.result,
            }));
          }
        };

        reader.readAsDataURL(file);
      }
    } catch (e) {}
  };
  const resetForm = () => {
    let initialData = {
      userRole: 3,
      userType: 1,
      userCompanyName: "",
      userName: "",
      userMobile: "",
      userOfficeMobile: "",
      userAddress: "",
      userAadhaar: "",
      userEmail: "",
      userAccountNo: "",
      userIFSC: "",
      loginUsername: "",
      userPassword: "",
      userCorporateOffice: "",
      userRegionalOffice: "",
      userCompanyHotline: "",
      userCompanyEmail: "",
      userCompanyWebsite: "",
      userCompanyLogo: "",
    };
    setUserObj(initialData);
  };
  const addUser = async () => {
    try {
      let url = ADD_USER_API;

      let body = {
        userName: userObj.userName,
        userRole: userObj.userRole,
        userEmail: userObj.userEmail,
        userMobile: userObj.userMobile,
        userOfficeMobile: userObj.userOfficeMobile,
        userAadhaar: userObj.userAadhaar,
        userAccountNo: userObj.userAccountNo,
        userIFSC: userObj.userIFSC,
        userAddress: userObj.userAddress,
        loginUsername: userObj.loginUsername,
        userPassword: userObj.userPassword,
        userIFSC: userObj.userIFSC,
        userCompanyEmail: userObj.userCompanyEmail,
        userCompanyName: userObj.userCompanyName,
        userCompanyWebsite: userObj.userCompanyWebsite,
        userCorporateOffice: userObj.userCorporateOffice,
        userRegionalOffice: "",
        userCompanyHotline: "",
      };
      let formData = new FormData();

      for (let key in body) {
        if (body.hasOwnProperty(key)) {
          formData.append(key, body[key]);
        }
      }
      if (userObj.userCompanyLogo) {
        formData.append(
          "userCompanyLogo",
          base64ToFile(userObj.userCompanyLogo, createFilename("logo", "jpeg"))
        );
      }
      setIsLoading(true);

      if (
        userObj.userRole == "4"
          ? simpleValidator2.current.allValid()
          : simpleValidator1.current.allValid()
      ) {
        let response = await axios.post(url, formData);
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
              setIsLoading(false);
              userObj.userRole == "4"
                ? simpleValidator2.current.hideMessages()
                : simpleValidator1.current.hideMessages();
              setTimeout(() => {
                navigate("/users");
              }, 1000);
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        userObj.userRole == "4"
          ? simpleValidator2.current.showMessages()
          : simpleValidator1.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateUser = async () => {
    console.log('up')
    try {
      let url = UPDATE_USER_API;

      let body = {
        id: id,
        userName: userObj.userName,
        userRole: userObj.userRole,
        userEmail: userObj.userEmail,
        userMobile: userObj.userMobile,
        userOfficeMobile: userObj.userOfficeMobile,
        userAadhaar: userObj.userAadhaar,
        userAccountNo: userObj.userAccountNo,
        userIFSC: userObj.userIFSC,
        userAddress: userObj.userAddress,
        loginUsername: userObj.loginUsername,
        userPassword: userObj.userPassword,
        userIFSC: userObj.userIFSC,
        userCompanyEmail: userObj.userCompanyEmail,
        userCompanyName: userObj.userCompanyName,
        userCompanyWebsite: userObj.userCompanyWebsite,
        userCorporateOffice: userObj.userCorporateOffice,
        userRegionalOffice: "",
        userCompanyHotline: "",
      };
      console.log("body",body)
      let formData = new FormData();

      for (let key in body) {
        if (body.hasOwnProperty(key)) {
          formData.append(key, body[key]);
        }
      }
      console.log('logo',userObj.userCompanyLogo)
      if (userObj.userCompanyLogo) {
        formData.append(
          "userCompanyLogo",
          base64ToFile(userObj.userCompanyLogo, createFilename("logo", "jpeg"))
        );
      }

      setIsLoading(true);
      if (
        userObj.userRole == "4"
          ? simpleValidator2.current.allValid()
          : simpleValidator1.current.allValid()
      ) {
        let response = await axios.post(url, formData);
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
              userObj.userRole == "4"
                ? simpleValidator2.current.hideMessages()
                : simpleValidator1.current.hideMessages();

              // setTimeout(() => {
              //   window.location.reload();
              // }, 1000);
              setIsLoading(false);
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        console.log('11',simpleValidator1.current.errorMessages,simpleValidator2.current.errorMessages)
        userObj.userRole == "4"
          ? simpleValidator2.current.showMessages()
          : simpleValidator1.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong :(" + e.stack, {
        position: "top-right",
      });
    }
  };
  const fetchUserDetails = async (id) => {
    try {
      let url = FETCH_USER_DETAILS_API;
      let body = {
        id: id,
      };
      setIsLoading(true);

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          setIsLoading(false);

          let userResponse = response.data.data;
          let userDetails = {
            id: id,
            userName: userResponse.userName,
            userRole: userResponse.userRole.toString(),
            userEmail: userResponse.userEmail,
            userMobile: userResponse.userMobile,
            userOfficeMobile: userResponse.userOfficeMobile,
            userAadhaar: userResponse.userAadhaar,
            userAccountNo: userResponse.userAccountNo,
            userIFSC: userResponse.userIFSC,
            userAddress: userResponse.userAddress,
            loginUsername: userResponse.loginUsername,
            userPassword: userResponse.userPassword,
            userIFSC: userResponse.userIFSC,
            userCompanyEmail: userResponse.userCompanyEmail,
            userCompanyName: userResponse.userCompanyName,
            userCompanyWebsite: userResponse.userCompanyWebsite,
            userCorporateOffice: userResponse.userCorporateOffice,
            userCompanyLogo: userResponse.userCompanyLogo,
            userRegionalOffice: "",
            userCompanyHotline: "",
          };
          setUserObj(userDetails);

          setForceUpdate((v) => ++v);
        }
      }
    } catch (e) {
      setIsLoading(false);

      toast.error("Something Went Wrong :(" + e, {
        position: "top-right",
      });
    }
  };
  const handleUserTypeChange = (event) => {
    const value = event.target.value;
    setUserObj((prevState) => ({
      ...prevState,
      userType: value,
    }));
    setForceUpdate((v) => ++v);
  };
  useEffect(() => {
    if (id) {
      fetchUserDetails(id);
    }
  }, [id]);

  return (
    <>
      <div className="container-scroller">
        <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
        <div className="container-fluid page-body-wrapper">
          <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="card">
                <div className="card-body">
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item"
                      onClick={() => navigate("/users")}
                    >
                      User Management
                    </li>

                    <li className="breadcrumb-item font-weight-bold text-primary">
                      {id ? "Edit" : "Add"} User
                    </li>
                  </ol>

                  <h3 className="card-title ml-1">
                    {id ? "Edit" : "Add"} User{" "}
                  </h3>
                  <div
                    role="application"
                    className="wizard clearfix"
                    id="steps-uid-0"
                  >
                    <div className="content clearfix">
                      <>
                        <section
                          id="steps-uid-0-p-0"
                          role="tabpanel"
                          aria-labelledby="steps-uid-0-h-0"
                          className="body current"
                          aria-hidden="false"
                          style={{ left: "0px" }}
                        >
                          <br></br>
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label>Designation</label>
                              <Select
                                options={userRoleOptions}
                                placeholder="Select Designation"
                                value={
                                  userObj.userRole
                                    ? userRoleOptions.filter(
                                        (option) =>
                                          option.value === userObj.userRole
                                      )
                                    : null
                                }
                                onChange={(selectedOption) => {
                                  setUserObj((prevState) => ({
                                    ...prevState,
                                    userRole: selectedOption
                                      ? selectedOption.value
                                      : null,
                                  }));
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label>Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                value={userObj.userName}
                                onChange={(e) => {
                                  setUserObj((prevState) => ({
                                    ...prevState,
                                    userName: e.target.value,
                                  }));
                                }}
                                onBlur={() => {
                                  simpleValidator1.current.showMessageFor(
                                    "userName"
                                  );
                                }}
                              />
                              <>
                                {simpleValidator1.current.element.length > 0 &&
                                  simpleValidator1.current.message(
                                    "userName",
                                    userObj.userName,
                                    [
                                      "required",
                                      {
                                        regex: /^(?![\. ])[a-zA-Z\. ]+(?<! )$/,
                                      },
                                    ],
                                    {
                                      messages: {
                                        required: "Please enter name",
                                        regex: "Enter valid name",
                                      },
                                    }
                                  )}
                              </>
                            </div>
                            {userObj.userRole != "4" && (
                              <div className="col-sm-6 ">
                                <label>Email</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Email"
                                  value={userObj.userEmail}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      userEmail: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator1.current.showMessageFor(
                                      "userEmail"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole != "4" &&
                                    simpleValidator1.current.element.length >
                                      0 &&
                                    simpleValidator1.current.message(
                                      "userEmail",
                                      userObj.userEmail,
                                      ["required", "email"],
                                      {
                                        messages: {
                                          required: "Please enter email",
                                          email: "Enter valid email",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                            )}
                            {userObj.userRole == "4" && (
                              <>
                                <div className="col-sm-6">
                                  <label>Company Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Company Name"
                                    value={userObj.userCompanyName}
                                    onChange={(e) => {
                                      setUserObj((prevState) => ({
                                        ...prevState,
                                        userCompanyName: e.target.value,
                                      }));
                                    }}
                                    onBlur={() => {
                                      simpleValidator2.current.showMessageFor(
                                        "userCompanyName"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole == "4" &&
                                      simpleValidator2.current.message(
                                        "userCompanyName",
                                        userObj.userCompanyName,
                                        ["required"],
                                        {
                                          messages: {
                                            required:
                                              "Please enter company name",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                              </>
                            )}
                          </div>
                          {userObj.userRole != "4" && (
                            <>
                              <div className="form-group row">
                                <div className="col-sm-6">
                                  <label>
                                    Mobile No. <small>(Personal)</small>
                                  </label>
                                  <input
                                    type="text"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    className="form-control"
                                    placeholder="Enter Mobile No"
                                    value={userObj.userMobile}
                                    onChange={(event) => {
                                      const newValue =
                                        event.target.value.trim();
                                      if (/^\d*$/.test(newValue)) {
                                        setUserObj((prevState) => ({
                                          ...prevState,
                                          userMobile: event.target.value,
                                        }));
                                      }
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "userMobile"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "userMobile",
                                        userObj.userMobile,
                                        ["required"],
                                        {
                                          messages: {
                                            required:
                                              "Please enter mobile number",
                                          },
                                        }
                                      )}
                                  </>
                                </div>

                                <div className="col-sm-6">
                                  <label>
                                    Mobile No. <small>(Official)</small>
                                  </label>
                                  <input
                                    type="text"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    className="form-control"
                                    placeholder="Enter Mobile No."
                                    value={userObj.userOfficeMobile}
                                    onChange={(event) => {
                                      const newValue =
                                        event.target.value.trim();
                                      if (/^\d*$/.test(newValue)) {
                                        setUserObj((prevState) => ({
                                          ...prevState,
                                          userOfficeMobile: event.target.value,
                                        }));
                                      }
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "userOfficeMobile"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "userOfficeMobile",
                                        userObj.userOfficeMobile,
                                        ["required"],
                                        {
                                          messages: {
                                            required:
                                              "Please enter mobile number",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                                <div className="col-sm-6 mt-4">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    value={userObj.userAddress}
                                    onChange={(e) => {
                                      setUserObj((prevState) => ({
                                        ...prevState,
                                        userAddress: e.target.value,
                                      }));
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "userAddress"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "userAddress",
                                        userObj.userAddress,
                                        ["required"],
                                        {
                                          messages: {
                                            required: "Please enter address",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                                <div className="col-sm-6 mt-4">
                                  <label>Aadhaar No</label>
                                  <input
                                    type="text"
                                    pattern="[0-9]{12}"
                                    maxLength={12}
                                    className="form-control"
                                    placeholder="Enter Aadhaar No"
                                    value={userObj.userAadhaar}
                                    onChange={(e) => {
                                      const newValue = e.target.value.trim();
                                      if (/^\d*$/.test(newValue)) {
                                        setUserObj((prevState) => ({
                                          ...prevState,
                                          userAadhaar: e.target.value,
                                        }));
                                      }
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "userAadhaar"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "userAadhaar",
                                        userObj.userAadhaar,
                                        [
                                          "required",
                                          { regex: /^\d{4}\s?\d{4}\s?\d{4}$/ },
                                        ],
                                        {
                                          messages: {
                                            required:
                                              "Please enter Aadhaar No.",
                                            regex: "Enter valid Aadhaar No.",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                                <div className="col-sm-6 mt-4">
                                  <label>Account No.</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Account No"
                                    value={userObj.userAccountNo}
                                    onChange={(e) => {
                                      setUserObj((prevState) => ({
                                        ...prevState,
                                        userAccountNo: e.target.value,
                                      }));
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "userAccountNo"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "userAccountNo",
                                        userObj.userAccountNo,
                                        ["required"],
                                        {
                                          messages: {
                                            required:
                                              "Please enter account no.",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                                <div className="col-sm-6 mt-4">
                                  <label>IFSC </label>
                                  <input
                                    type="text"
                                    maxLength={11}
                                    className="form-control"
                                    placeholder="Enter IFSC"
                                    value={userObj.userIFSC}
                                    onChange={(e) => {
                                      setUserObj((prevState) => ({
                                        ...prevState,
                                        userIFSC: e.target.value,
                                      }));
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "userIFSC"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "userIFSC",
                                        userObj.userIFSC,
                                        [
                                          "required",
                                          { regex: /^[A-Z]{4}0[A-Z0-9]{6}$/ },
                                        ],
                                        {
                                          messages: {
                                            required: "Please enter IFSC",
                                            regex: "Enter valid IFSC",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                                <div className="col-sm-6 mt-4">
                                  <label>Username</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    value={userObj.loginUsername}
                                    onChange={(e) => {
                                      setUserObj((prevState) => ({
                                        ...prevState,
                                        loginUsername: e.target.value,
                                      }));
                                    }}
                                    onBlur={() => {
                                      simpleValidator1.current.showMessageFor(
                                        "loginUsername"
                                      );
                                    }}
                                  />
                                  <>
                                    {userObj.userRole != "4" &&
                                      simpleValidator1.current.message(
                                        "loginUsername",
                                        userObj.loginUsername,
                                        ["required"],
                                        {
                                          messages: {
                                            required: "Please enter username",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                                {!id && (
                                  <div className="col-sm-6 mt-4">
                                    <label>Password</label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      placeholder="Enter Password"
                                      value={userObj.userPassword}
                                      inputMode="numeric"
                                      pattern="\d*"
                                      maxLength={4}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                          setUserObj((prevState) => ({
                                            ...prevState,
                                            userPassword: value,
                                          }));
                                        }
                                      }}
                                      onBlur={() => {
                                        simpleValidator1.current.showMessageFor(
                                          "userPassword"
                                        );
                                      }}
                                    />
                                    <small className="text-muted">
                                      Note: Please enter 4 digit PIN
                                    </small>
                                    <>
                                      {userObj.userRole != "4" && !id &&
                                        simpleValidator1.current.message(
                                          "userPassword",
                                          userObj.userPassword,
                                          [!id?"required":""],
                                          {
                                            messages: {
                                              required: "Please enter password",
                                            },
                                          }
                                        )}
                                    </>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {userObj.userRole == "4" && (
                            <div className="form-group row">
                              <div className="col-sm-6">
                                <label>Mobile No. </label>
                                <input
                                  type="text"
                                  pattern="[0-9]{10}"
                                  maxLength={10}
                                  className="form-control"
                                  placeholder="Enter Name"
                                  value={userObj.userOfficeMobile}
                                  onChange={(e) => {
                                    const newValue = e.target.value.trim();
                                    if (/^\d*$/.test(newValue)) {
                                      setUserObj((prevState) => ({
                                        ...prevState,
                                        userOfficeMobile: e.target.value,
                                      }));
                                    }
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "userOfficeMobile"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.message(
                                      "userOfficeMobile",
                                      userObj.userOfficeMobile,
                                      ["required"],
                                      {
                                        messages: {
                                          required:
                                            "Please enter mobile number",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                              <div className="col-sm-6">
                                <label>Company Logo</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  placeholder="Enter Name"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                                {userObj.userCompanyLogo && (
                                  <>
                                    {!userObj.userCompanyLogo.includes(
                                      "base64"
                                    ) && (
                                      <>
                                        <br></br>
                                        <img
                                          style={{ width: "100px" }}
                                          src={
                                            BASE_URL +
                                            "/uploads/company_logos/" +
                                            userObj.userCompanyLogo +
                                            ".jpeg"
                                          }
                                        />
                                        <span
                                          className="badge  badge-outline-primary"
                                          data-bs-toggle="modal"
                                          data-bs-target="#imageModal"
                                          onClick={() =>
                                            openImageModal(
                                              BASE_URL +
                                                "/uploads/company_logos/" +
                                                userObj.userCompanyLogo +
                                                ".jpeg"
                                            )
                                          }
                                        >
                                          View Image
                                        </span>
                                      </>
                                    )}
                                    {userObj.userCompanyLogo.includes(
                                      "base64"
                                    ) && (
                                      <>
                                        <br></br>
                                        <img
                                          style={{ width: "100px" }}
                                          src={userObj.userCompanyLogo}
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="col-sm-6 mt-4">
                                <label>Email</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Email"
                                  value={userObj.userCompanyEmail}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      userCompanyEmail: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "userCompanyEmail"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.element.length >
                                      0 &&
                                    simpleValidator2.current.message(
                                      "userCompanyEmail",
                                      userObj.userCompanyEmail,
                                      ["required", "email"],
                                      {
                                        messages: {
                                          required: "Please enter email",
                                          email: "Enter valid email",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                              <div className="col-sm-6 mt-4">
                                <label>Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Address"
                                  value={userObj.userCorporateOffice}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      userCorporateOffice: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "userCorporateOffice"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.message(
                                      "userCorporateOffice",
                                      userObj.userCorporateOffice,
                                      ["required"],
                                      {
                                        messages: {
                                          required: "Please enter address",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                              <div className="col-sm-6 mt-4">
                                <label>Account No.</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Account No"
                                  value={userObj.userAccountNo}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      userAccountNo: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "userAccountNo"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.message(
                                      "userAccountNo",
                                      userObj.userAccountNo,
                                      ["required"],
                                      {
                                        messages: {
                                          required: "Please enter account no.",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                              <div className="col-sm-6 mt-4">
                                <label>IFSC</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter IFSC"
                                  value={userObj.userIFSC}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      userIFSC: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "userIFSC"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.message(
                                      "userIFSC",
                                      userObj.userIFSC,
                                      [
                                        "required",
                                        { regex: /^[A-Z]{4}0[A-Z0-9]{6}$/ },
                                      ],
                                      {
                                        messages: {
                                          required: "Please enter IFSC",
                                          regex: "Enter valid IFSC",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                              <div className="col-sm-6 mt-4">
                                <label>Company Website</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Company Website"
                                  value={userObj.userCompanyWebsite}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      userCompanyWebsite: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "userCompanyWebsite"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.element.length >
                                      0 &&
                                    simpleValidator2.current.message(
                                      "userCompanyWebsite",
                                      userObj.userCompanyWebsite,
                                      [
                                        "required",
                                        {
                                          regex:
                                            /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
                                        },
                                      ],
                                      {
                                        messages: {
                                          required:
                                            "Please enter company website ",
                                          regex: "Enter valid company website",
                                        },
                                      }
                                    )}
                                </>
                              </div>

                              <div className="col-sm-6 mt-4">
                                <label>Username</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Username"
                                  value={userObj.loginUsername}
                                  onChange={(e) => {
                                    setUserObj((prevState) => ({
                                      ...prevState,
                                      loginUsername: e.target.value,
                                    }));
                                  }}
                                  onBlur={() => {
                                    simpleValidator2.current.showMessageFor(
                                      "loginUsername"
                                    );
                                  }}
                                />
                                <>
                                  {userObj.userRole == "4" &&
                                    simpleValidator2.current.message(
                                      "loginUsername",
                                      userObj.loginUsername,
                                      ["required"],
                                      {
                                        messages: {
                                          required: "Please enter username",
                                        },
                                      }
                                    )}
                                </>
                              </div>
                              {!id && (
                                <div className="col-sm-6 mt-4">
                                  <label>Password</label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={userObj.userPassword}
                                    maxLength={4}
                                    inputMode="numeric"
                                    pattern="\d*"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (/^\d*$/.test(value)) {
                                        setUserObj((prevState) => ({
                                          ...prevState,
                                          userPassword: value,
                                        }));
                                      }
                                    }}
                                    onBlur={() => {
                                      simpleValidator2.current.showMessageFor(
                                        "userPassword"
                                      );
                                    }}
                                  />
                                  <small className="text-muted">
                                    Note: Please enter 4 digit PIN
                                  </small>
                                  <>
                                    {userObj.userRole == "4"  && !id  &&
                                      simpleValidator2.current.message(
                                        "userPassword",
                                        userObj.userPassword,
                                        [!id?"required":""],
                                        {
                                          messages: {
                                            required: "Please enter password",
                                          },
                                        }
                                      )}
                                  </>
                                </div>
                              )}
                            </div>
                          )}
                        </section>
                      </>
                    </div>
                    <div className="actions clearfix">
                      <ul role="menu" aria-label="Pagination">
                        <li aria-disabled="true">
                          <button
                            className="btn cancel-btn"
                            onClick={() => {
                              navigate("/users");
                              resetForm();
                            }}
                          >
                            Cancel
                          </button>
                        </li>
                        <li aria-hidden="false" aria-disabled="false">
                          <button
                            className="btn btn-success"
                            onClick={(e) => {
                              id ? updateUser() : addUser();
                            }}
                          >
                            {id ? "Update" : "Submit"}
                          </button>
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
      <div
          className="modal fade"
          id="imageModal"
          tabIndex="-1"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Image
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
                <img src={logoImage} style={{ width: "200px" }} />
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

      <Loader isLoading={isLoading}></Loader>
    </>
  );
};
export default UserForm;
