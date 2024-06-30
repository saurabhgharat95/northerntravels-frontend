import { useState } from "react";
import { deleteCookie,getCookie } from "../utils/helpers";
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [sidebarOpen,setSidebarOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate()
  const userId = getCookie('ntId')

  const handleSidebar = () =>{
    props.setSidebarOpen(sidebarOpen)
  }
  const logoutUser = () =>{
    deleteCookie("userRole")
    deleteCookie("ntId")
    window.location.href="/login"
  }
  const handleConfirm = () => {
    logoutUser()
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  return (
    <div>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo mr-5" href="/">
            <img src="/images/logo.png" className="mr-2" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="/">
            <img src="/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
            onClick={()=>{
              setSidebarOpen(!sidebarOpen);
              handleSidebar();
            }}
            
          >
            <span className="icon-menu"></span>
          </button>
          <ul className="navbar-nav mr-lg-2">
            {/* <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div
                  className="input-group-prepend hover-cursor"
                  id="navbar-search-icon"
                >
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="navbar-search-input"
                  placeholder="Search now"
                  aria-label="search"
                  aria-describedby="search"
                />
              </div>
            </li> */}
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <i className="icon-bell mx-0"></i>
                <span className="count"></span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">
                  Notifications
                </p>
                <a className="dropdown-item preview-item" href="£">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Application Error
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="ti-settings mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Settings
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="ti-user mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      New users registratio
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      2 days agoo
                    </p>
                  </div>
                </a>
              </div>
            </li> */}
           
            <li
              className={`nav-item nav-profile dropdown `}
              
            >
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                id="profileDropdown"
                
              >
                <i className="icon-ellipsis"></i>
              </a>
              <div
               className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="profileDropdown"
              >
             
                <a className="dropdown-item" onClick={()=>navigate('/user/'+userId)}>
                  <i className="ti-user text-primary"></i>
                  View Profile
                </a>
                <a className="dropdown-item" onClick={()=>setShowConfirmation(true)}>
                  <i className="ti-power-off text-primary"></i>
                  Logout
                </a>
              </div>
            </li>
          
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="icon-menu"></span>
          </button>
          <ConfirmationDialog
            message="Are you sure you want to logout?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            show={showConfirmation}
          />
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
