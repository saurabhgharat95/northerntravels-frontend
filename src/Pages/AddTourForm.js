import { useState, useEffect } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  axios,
  toast,
  ToastContainer,
} from "../components/CommonImport";

import {
  ADD_TOUR_API,
  UPDATE_TOUR_API,
  FETCH_TOUR_DETAILS_API,
} from "../utils/constants";

import TourComponentSelector from "./TourComponentSelector";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { resetFormData, setTourFormData } from "../utils/store";
import { useParams, useNavigate } from "react-router-dom";
const AddTourForm = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);
  const formData = useSelector((state) => state.form.tourFormData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [, setForceUpdate] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

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
          if (id) {
            updateTour();
          } else {
            addTour();
          }
        }
        break;
    }
  };

  const resetForm = () => {};
  const addTour = async () => {
    try {
      let url = ADD_TOUR_API;
      console.log("formData", formData);
      let transportationData = [];
      let vehicleArray = formData.tourVehicle;
      for (let index = 0; index < vehicleArray.length; index++) {
        transportationData.push({
          fkVehicleId: vehicleArray[index],
          startPointId: formData.tourStartPt[index],
          endPointId: formData.tourEndPt[index],
          onSeasonRate: formData.tourOnSeason[index],
          offSeasonRate: formData.tourOffSeason[index],
        });
      }
      let body = {
        tourName: formData.tourName,
        tourDescription: "",
        tourAddOnServices: formData.tourAddOnServices,
        countryIds: formData.countryIds,
        stateIds: formData.stateIds,
        transitPointIds: formData.transitPointIds,
        locationIds: formData.locationIds.join(","),
        transportationData: transportationData,
      };
      console.log("body", body);
      setIsLoading(true);
      let response = await axios.post(url, body);
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
            dispatch(resetFormData());
            setIsLoading(false);
            setTimeout(() => {
              navigate("/tours");
            }, 1000);
          }
        }
      }
    } catch (e) {
      console.log("ee", e);
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateTour = async () => {
    try {
      let url = UPDATE_TOUR_API;
      let transportationData = [];
      let vehicleArray = formData.tourVehicle;
      for (let index = 0; index < vehicleArray.length; index++) {
        transportationData.push({
          fkVehicleId: vehicleArray[index],
          startPointId: formData.tourStartPt[index],
          endPointId: formData.tourEndPt[index],
          onSeasonRate: formData.tourOnSeason[index],
          offSeasonRate: formData.tourOffSeason[index],
        });
      }
      let body = {
        id: id,
        tourName: formData.tourName,
        tourDescription: "",
        tourAddOnServices: formData.tourAddOnServices,
        countryIds:
          typeof formData.countryIds === "string"
            ? formData.countryIds
            : formData.countryIds.join(","),
        stateIds:
          typeof formData.stateIds === "string"
            ? formData.stateIds
            : formData.stateIds.join(","),
        transitPointIds:
          typeof formData.transitPointIds === "string"
            ? formData.transitPointIds
            : formData.transitPointIds.join(","),
        locationIds:
          typeof formData.locationIds === "string"
            ? formData.locationIds
            : formData.locationIds.join(","),
        transportationData: transportationData,
      };
      setIsLoading(true);

      let response = await axios.post(url, body);
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
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setIsLoading(false);
          }
        }
      }
    } catch (e) {
      toast.error("Something Went Wrong :(" + e.stack, {
        position: "top-right",
      });
    }
  };
  const fetchTourDetails = async (id) => {
    try {
      let url = FETCH_TOUR_DETAILS_API;
      let body = {
        id: id,
      };
      setIsLoading(true);

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          setIsLoading(false);

          let tourDetails = response.data.data;
          const formData = {
            tourName: tourDetails.tourName || "",
            tourDescription: tourDetails.tourDescription || "",
            tourAddOnServices: tourDetails.tourAddOnServices
              ? tourDetails.tourAddOnServices
              : "",
            countryIds: tourDetails.countries
              ? tourDetails.countries
                  .map((country) => country.fkCountryId)
                  .join(", ")
                  .split(",")
                  .map(Number)
              : "",
            stateIds: tourDetails.states
              ? tourDetails.states
                  .map((state) => state.fkLocationId)
                  .join(", ")
                  .split(",")
                  .map(Number)
              : "",
            transitPointIds: tourDetails.transitPoints
              ? tourDetails.transitPoints
                  .map((point) => point.fkTransitPointId)
                  .join(", ")
                  .split(",")
                  .map(Number)
              : "",
            locationIds: tourDetails.visitingLocations
              ? tourDetails.visitingLocations
                  .map((location) => location.fkLocationId)
                  .join(", ")
                  .split(",")
                  .map(Number)
              : "",
            tourVehicle:
              tourDetails.transportations &&
              tourDetails.transportations.length > 0
                ? tourDetails.transportations
                    .map((transport) => transport.fkVehicleId)
                    .join(", ")
                    .split(",")
                    .map(Number)
                : "",
            tourStartPt:
              tourDetails.transportations &&
              tourDetails.transportations.length > 0
                ? tourDetails.transportations
                    .map((transport) => transport.startPointId)
                    .join(", ")
                    .split(",")
                    .map(Number)
                : "",
            tourEndPt:
              tourDetails.transportations &&
              tourDetails.transportations.length > 0
                ? tourDetails.transportations
                    .map((transport) => transport.endPointId)
                    .join(", ")
                    .split(",")
                    .map(Number)
                : "",
            tourOnSeason:
              tourDetails.transportations &&
              tourDetails.transportations.length > 0
                ? tourDetails.transportations
                    .map((transport) => transport.onSeasonRate)
                    .join(", ")
                    .split(",")
                    .map(Number)
                : "",
            tourOffSeason:
              tourDetails.transportations &&
              tourDetails.transportations.length > 0
                ? tourDetails.transportations
                    .map((transport) => transport.offSeasonRate)
                    .join(", ")
                    .split(",")
                    .map(Number)
                : "",
          };
          Object.entries(formData).forEach(([field, value]) => {
            dispatch(setTourFormData(field, value));
          });
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
  useEffect(() => {
    if (id) {
      fetchTourDetails(id);
    }
  }, [id]);
  useEffect(() => {
    if (!id) {
      dispatch(resetFormData());
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
              <div className="card">
                <div className="card-body">
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item"
                      onClick={() => navigate("/tours")}
                    >
                      Tour Management
                    </li>

                    <li className="breadcrumb-item font-weight-bold text-primary">
                      {id ? "Edit" : "Add"} Tour
                    </li>
                  </ol>

                  <h4 className="card-title ml-1">
                    {id ? "Edit" : "Add"} Tour{" "}
                  </h4>
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
                            {selectedTab == 2 ? "Submit" : "Next"}
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
export default AddTourForm;
