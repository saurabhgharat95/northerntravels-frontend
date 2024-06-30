import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  axios,
  ShimmerTable,
  toast,
  ToastContainer,
  Select,
  SimpleReactValidator,
} from "../components/CommonImport";
import {
  BASE_URL,
  FETCH_USER_DETAILS_API,
  UPDATE_USER_API,
} from "../utils/constants";
import { getDateFormatted, toTitleCase,base64ToFile,createFilename } from "../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NoData from "../components/NoData";
import Loader from "../components/Loader";

const UserDetails = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isEdit, setEditForm] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logoImage, setLogoImage] = useState("");

  const [userObj, setUserObj] = useState({
    userRole: "",
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
  const handleCloseModal = () => {
    var modal = document.getElementById("imageModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };
  const openImageModal = (imageURL) => {
    setLogoImage(imageURL);
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
  const navigate = useNavigate();
  const { id } = useParams();
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
  const fetchUserDetails = async (id) => {
    try {
      let url = FETCH_USER_DETAILS_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
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
          setUserDetails(userResponse);
        }
      }
    } catch (e) {}
  };
  const updateUser = async () => {
    console.log("up");
    try {
      let url = UPDATE_USER_API;

      let body = {
        id: userDetails.id,
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
        userIFSC: userObj.userIFSC,
        userCompanyEmail: userObj.userCompanyEmail,
        userCompanyName: userObj.userCompanyName,
        userCompanyWebsite: userObj.userCompanyWebsite,
        userCorporateOffice: userObj.userCorporateOffice,
        userRegionalOffice: "",
        userCompanyHotline: "",
      };
      console.log("body", body);
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
        userDetails.userRole == "4"
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
              userDetails.userRole == "4"
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
        console.log("error");
        setForceUpdate((v) => ++v);
        console.log(
          "11",
          simpleValidator1.current.errorMessages,
          simpleValidator2.current.errorMessages
        );
        userDetails.userRole == "4"
          ? simpleValidator2.current.showMessages()
          : simpleValidator1.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("er");
      toast.error("Something Went Wrong :(" + e.stack, {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    if (id) {
      fetchUserDetails(id);
    }
  }, []);
  return (
    <>
      <div className="container-scroller">
        <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
        <div className="container-fluid page-body-wrapper">
          <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
          <div className="main-panel">
            <div className="content-wrapper">
              {userDetails && (
                <div className="card profile-card">
                  <div className="card-body">
                    <div>
                      <h3 className="card-title mt-1 ml-1">
                        {userDetails.userName}
                      </h3>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setEditForm(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row">
                      {userDetails.userRole != "4" && (
                        <>
                          <div className="col-sm-6">
                            <div className="media">
                              {!isEdit && (
                                <ion-icon name="mail-outline"></ion-icon>
                              )}

                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Email :
                                </p>
                                {!isEdit && (
                                  <span className="value">
                                    {userDetails.userEmail}
                                  </span>
                                )}
                              </div>
                            </div>

                            <p>
                              {isEdit && (
                                <>
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
                                    {userDetails.userRole != "4" &&
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
                                </>
                              )}
                            </p>
                          </div>

                          <div className="col-sm-6">
                            <div className="media">
                              {!isEdit && (
                                <ion-icon name="phone-portrait-sharp"></ion-icon>
                              )}

                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Mobile :
                                </p>
                                {!isEdit && (
                                  <span className="value">
                                    {userDetails.userMobile}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p>
                              {isEdit && (
                                <>
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
                                    {userDetails.userRole != "4" &&
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
                                </>
                              )}
                            </p>
                          </div>
                        </>
                      )}

                      <div className="col-sm-6">
                        <div className="media">
                          {!isEdit && (
                            <ion-icon name="phone-portrait-sharp"></ion-icon>
                          )}

                          <div className="media-body ml-2">
                            <p
                              className="card-text"
                              style={{ marginBottom: 0 }}
                            >
                              Office Mobile :{" "}
                            </p>
                            {!isEdit && (
                              <span className="value">
                                {userDetails.userOfficeMobile}
                              </span>
                            )}
                          </div>
                        </div>
                        <p>
                          {isEdit && (
                            <>
                              <input
                                type="text"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                className="form-control"
                                placeholder="Enter Mobile No."
                                value={userObj.userOfficeMobile}
                                onChange={(event) => {
                                  const newValue = event.target.value.trim();
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
                                {userDetails.userRole != "4" &&
                                  simpleValidator1.current.message(
                                    "userOfficeMobile",
                                    userObj.userOfficeMobile,
                                    ["required"],
                                    {
                                      messages: {
                                        required: "Please enter mobile number",
                                      },
                                    }
                                  )}
                              </>
                            </>
                          )}
                        </p>
                      </div>
                      {userDetails.userRole != "4" && (
                        <div className="col-sm-6">
                          <div className="media">
                            {!isEdit && (
                              <ion-icon name="reader-outline"></ion-icon>
                            )}

                            <div className="media-body ml-2">
                              <p
                                className="card-text"
                                style={{ marginBottom: 0 }}
                              >
                                AADHAAR Number :{" "}
                              </p>
                              {!isEdit && (
                                <span className="value">
                                  {userDetails.userAadhaar}
                                </span>
                              )}
                            </div>
                          </div>
                          <p>
                            {isEdit && (
                              <>
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
                                  {userDetails.userRole != "4" &&
                                    simpleValidator1.current.message(
                                      "userAadhaar",
                                      userObj.userAadhaar,
                                      [
                                        "required",
                                        { regex: /^\d{4}\s?\d{4}\s?\d{4}$/ },
                                      ],
                                      {
                                        messages: {
                                          required: "Please enter Aadhaar No.",
                                          regex: "Enter valid Aadhaar No.",
                                        },
                                      }
                                    )}
                                </>
                              </>
                            )}
                          </p>
                        </div>
                      )}
                      <div className="col-sm-6">
                        <div className="media">
                          {!isEdit && (
                            <ion-icon name="reader-outline"></ion-icon>
                          )}

                          <div className="media-body ml-2">
                            <p
                              className="card-text"
                              style={{ marginBottom: 0 }}
                            >
                              Account Number:{" "}
                            </p>
                            {!isEdit && (
                              <span className="value">
                                {userDetails.userAccountNo}
                              </span>
                            )}
                          </div>
                        </div>
                        <p>
                          {isEdit && (
                            <>
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
                                {userDetails.userRole != "4" &&
                                  simpleValidator1.current.message(
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
                            </>
                          )}
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <div className="media">
                          {!isEdit && (
                            <ion-icon name="reader-outline"></ion-icon>
                          )}

                          <div className="media-body ml-2">
                            <p
                              className="card-text"
                              style={{ marginBottom: 0 }}
                            >
                              IFSC :{" "}
                            </p>
                            {!isEdit && (
                              <span className="value">
                                {userDetails.userIFSC}
                              </span>
                            )}
                          </div>
                        </div>
                        <p>
                          {isEdit && (
                            <>
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
                                {userDetails.userRole != "4" &&
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
                            </>
                          )}
                        </p>
                      </div>
                      {userDetails.userRole != "4" && (
                        <div className="col-sm-12">
                          <div className="media">
                            {!isEdit && (
                              <ion-icon name="location-outline"></ion-icon>
                            )}

                            <div className="media-body ml-2">
                              <p
                                className="card-text"
                                style={{ marginBottom: 0 }}
                              >
                                Address :{" "}
                              </p>
                              {!isEdit && (
                                <span className="value">
                                  {userDetails.userAddress}
                                </span>
                              )}
                            </div>
                          </div>
                          <p>
                            {isEdit && (
                              <>
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
                                  {userDetails.userRole != "4" &&
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
                              </>
                            )}
                          </p>
                        </div>
                      )}
                      {userDetails.userRole == "4" && (
                        <>
                          <div className="col-sm-6">
                            <div className="media">
                              {!isEdit && (
                                <ion-icon name="image-outline"></ion-icon>
                              )}

                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Company Logo :{" "}
                                </p>
                              </div>
                            </div>
                            <p>
                            {isEdit && (
                            <input
                                  type="file"
                                  className="form-control"
                                  placeholder="Enter Name"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                            )}
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
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <div className="media">
                              {!isEdit && (
                                <ion-icon name="business-outline"></ion-icon>
                              )}

                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Corporate Office :{" "}
                                </p>
                                {!isEdit && (
                                  <span className="value">
                                    {userDetails.userCorporateOffice}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p>
                              {isEdit && (
                                <>
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
                                    {userDetails.userRole == "4" &&
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
                                </>
                              )}
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <div className="media">
                              {!isEdit && (
                                <ion-icon name="mail-outline"></ion-icon>
                              )}

                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Company Email :{" "}
                                </p>
                                {!isEdit && (
                                  <span className="value">
                                    {userDetails.userCompanyEmail}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p>
                              {isEdit && (
                                <>
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
                                    {userDetails.userRole == "4" &&
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
                                </>
                              )}
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <div className="media">
                              {!isEdit && (
                                <ion-icon name="globe-outline"></ion-icon>
                              )}

                              <div className="media-body ml-2">
                                <p
                                  className="card-text"
                                  style={{ marginBottom: 0 }}
                                >
                                  Company Website :{" "}
                                </p>

                                {!isEdit && (
                                  <span className="value">
                                    {userDetails.userCompanyWebsite}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p>
                              {isEdit && (
                                <>
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
                                    {userDetails.userRole == "4" &&
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
                                            regex:
                                              "Enter valid company website",
                                          },
                                        }
                                      )}
                                  </>
                                </>
                              )}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <br></br>
                    {isEdit && (
                      <div className="float-right">
                        <button
                          className="btn cancel-btn mr-2"
                          onClick={() => {
                            setEditForm(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            updateUser();
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDetails;
