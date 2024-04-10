import { useEffect, useState, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  axios,
  toast,
  ToastContainer,
  SimpleReactValidator,
} from "../components/CommonImport";

import {
  FETCH_COUNTRIES_API,
  FETCH_STATES_API,
  ADD_TOUR_API,
  UPDATE_TOUR_API,
} from "../utils/constants";

import TourComponentSelector from "./TourComponentSelector";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
const AddTourForm = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  

  const tabNames = [
    { id: 1, name: "Basic Details" },
    { id: 2, name: "Transportation" },
  ];
  const openFormTab = (tabId) => {
    setSelectedTab(tabId);
  };
  
  const selectForm = (action, selectedTab) => {
    switch (selectedTab) {
      case 1:
        if (action == "prev") {
          setSelectedTab(1);
        } else {
          setSelectedTab(2);
        }
        break;
      case 2:
        if (action == "prev") {
          setSelectedTab(1);
        } else {
          setSelectedTab(3);
        }
        break;

      case 3:
        if (action == "prev") {
          setSelectedTab(2);
        } else {
          setIsSubmit(true);
        }
        break;
    }
  };

  const resetForm = () => {};
  const addTour = async () => {
    try {
      let url = ADD_TOUR_API;
      let body = {
        tourName: tourName,
        fkStateId: stateId,
        fkCountryId: country,
        
      };
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            resetForm();
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("ee", e);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateTour = async () => {
    try {
      let url = UPDATE_TRANSIT_POINT_API;
      let body = {
        id: updateId,
        tourName: tourName,
        fkStateId: stateId,
        fkCountryId: country,
      };
      setIsLoading(true);

      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });

            resetForm();
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

 
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
                  <h4 className="card-title">Add Tour </h4>
                  <div
                    role="application"
                    className="wizard clearfix"
                    id="steps-uid-0"
                  >
                    <div className="steps clearfix">
                      <ul role="tablist">
                        {tabNames &&
                          tabNames.map((tab) => (
                            <li
                              key={tab.id}
                              role="tab"
                              className="current"
                              aria-disabled="false"
                              aria-selected="true"
                              onClick={() => openFormTab(tab.id)}
                            >
                              <a
                                id="steps-uid-0-t-0"
                                href="#steps-uid-0-h-0"
                                aria-controls="steps-uid-0-p-0"
                              >
                                <span className="number">{tab.id}.</span>{" "}
                                {tab.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TourComponentSelector selectedTab={selectedTab} />
                    </div>
                    <div className="actions clearfix">
                      <ul role="menu" aria-label="Pagination">
                        <li aria-disabled="true">
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              selectForm("prev", selectedTab);
                            }}
                          >
                            Previous
                          </button>
                        </li>
                        <li aria-hidden="false" aria-disabled="false">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              selectForm("next", selectedTab);
                            }}
                          >
                            {selectedTab == 3 ? "Submit" : "Next"}
                          </button>
                        </li>
                        {isSubmit && (
                          <li aria-hidden="true" style={{ display: "none" }}>
                            <a href="#finish" role="menuitem">
                              Submit
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default AddTourForm;
