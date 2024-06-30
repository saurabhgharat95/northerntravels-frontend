import { useState, useRef,useContext } from "react";
import { LOGIN_USER_API } from "../utils/constants";
import {
  axios,
  toast,
  SimpleReactValidator,
  ToastContainer,
} from "../components/CommonImport";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { setCookie } from "../utils/helpers";


const LoginPage = () => {
  const [userType, setUserType] = useState("1");
  const [userObj, setUserObj] = useState({
    loginUsername: "",
    userPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  // const usertypes = [
  //   { name: "Admin/Agent", value: "1" },
  //   { name: "Hotel User", value: "2" },
  //   { name: "Driver", value: "3" },
  //   { name: "Confirm Voucher", value: "4" },
  // ];
  const loginUser = async () => {
    try {
      let url = LOGIN_USER_API;

      let body = {
        loginUsername: userObj.loginUsername,
        userPassword: userObj.userPassword,
      };

      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            setIsLoading(false);

            if (response.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              let data = response.data.data;
              setCookie("ntId", data.userId, 7);
              setCookie("userRole", data.userRole, 7);
              toast.success(response.data.message, {
                position: "top-right",
              });
              setIsLoading(false);
              simpleValidator.current.hideMessages();
              window.location.href = process.env.PUBLIC_URL + "/";
              
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
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

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-center">
                  <img src="images/logo.png" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <div className="row">
                  {/* {usertypes &&
                    usertypes.map((user) => (
                      <div
                        className={`${
                          user.value == "3"
                            ? "col-md-2"
                            : user.value == "4"
                            ? "col-md-4"
                            : "col-md-3"
                        }`}
                      > */}
                  {/* <div className="form-group">
                          <div className="form-check form-check-info">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="userTypeRadio"
                                id="userTypeRadio"
                                checked={userType == user.value ? true : false}
                                onClick={() => setUserType(user.value)}
                              />
                              {user.name}
                            </label>
                          </div>
                        </div> */}
                  {/* </div>
                    ))} */}
                </div>

                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Enter Username"
                      value={userObj.loginUsername}
                      onChange={(e) => {
                        setUserObj((prevState) => ({
                          ...prevState,
                          loginUsername: e.target.value,
                        }));
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor("loginUsername");
                      }}
                    />
                    <>
                      {userObj.userRole != "4" &&
                        simpleValidator.current.message(
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
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Enter Password"
                      value={userObj.userPassword}
                      onChange={(e) => {
                        setUserObj((prevState) => ({
                          ...prevState,
                          userPassword: e.target.value,
                        }));
                      }}
                      onBlur={() => {
                        simpleValidator.current.showMessageFor("userPassword");
                      }}
                    />
                    <>
                      {userObj.userRole != "4" &&
                        simpleValidator.current.message(
                          "userPassword",
                          userObj.userPassword,
                          ["required"],
                          {
                            messages: {
                              required: "Please enter password",
                            },
                          }
                        )}
                    </>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={(e) => {
                        loginUser();
                      }}
                    >
                      SIGN IN
                    </button>
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

                  {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a href="#" className="auth-link text-black">Forgot password?</a> 
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
