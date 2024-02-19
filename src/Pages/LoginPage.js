import { useState } from "react";

const LoginPage = () => {
  const [userType, setUserType] = useState("1");
  const usertypes = [
    { name: "Admin/Agent", value: "1" },
    { name: "Hotel User", value: "2" },
    { name: "Driver", value: "3" },
    { name: "Confirm Voucher", value: "4" },
  ];
  const onSubmit = (e) => {
    e.preventDefault()
    window.location.href = process.env.PUBLIC_URL+"/";
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
                  {usertypes &&
                    usertypes.map((user) => (
                      <div
                        className={`${
                          user.value == "3"
                            ? "col-md-2"
                            : user.value == "4"
                            ? "col-md-4"
                            : "col-md-3"
                        }`}
                      >
                        <div className="form-group">
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
                        </div>
                      </div>
                    ))}
                </div>

                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={(e) => {
                        onSubmit(e);
                      }}
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    {/* <a href="#" className="auth-link text-black">Forgot password?</a>  */}
                  </div>
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
