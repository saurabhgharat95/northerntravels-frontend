import { useState } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  axios,
  toast,
  ToastContainer,
} from "../components/CommonImport";
import ComponentSelector from "./ComponentSelector";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  ADD_QUOTATION_API,
  UPDATE_QUOTATION_ACCOMMODATION_API,
  UPDATE_QUOTATION_BASIC_API,
  UPDATE_QUOTATION_HOTEL_API,
  FETCH_QUOTATION_HOTELS_DETAILS_API,
  FETCH_QUOTATION_ITINERARY_DETAILS_API,
  UPDATE_QUOTATION_ITINERARY_API,
  UPDATE_QUOTATION_MARKUP_API,
} from "../utils/constants";
import { setQuotationFormData, resetFormData } from "../utils/store";
import {
  getDateFormattedForDB,
  base64ToFile,
  createFilename,
} from "../utils/helpers";

const AddQuotation = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);
  const quotFormData = useSelector((state) => state.form.quotationFormData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [, setForceUpdate] = useState(0);
  const navigate = useNavigate();
  const [tabNames, setTabNames] = useState([
    { id: 1, name: "Basic Details", isDisabled: false },
    { id: 2, name: "Accommodation Details", isDisabled: true },
    { id: 3, name: "Hotel Details", isDisabled: true },
    { id: 4, name: "Itinerary", isDisabled: true },
    { id: 5, name: "Markup", isDisabled: true },
  ]);
  const openFormTab = (tab) => {
    if (tab.isDisabled == false) {
      setSelectedTab(tab.id);
    }
  };
  const setDisabledTab = (tabId) => {
    const updatedTabNames = tabNames.map((tab) => {
      if (tab.id === tabId) {
        return { ...tab, isDisabled: false };
      }
      return tab;
    });

    setTabNames(updatedTabNames);
  };
  const selectForm = (action, selectedTab) => {
    switch (selectedTab) {
      case 1:
        if (action == "prev") {
          setSelectedTab(1);
        } else {
          if (quotFormData.quotId) {
            updateBasicDetails();
          } else {
            addBasicDetails();
          }
        }
        break;
      case 2:
        if (action == "prev") {
          setSelectedTab(1);
        } else {
          updateAccommodationDetails();
        }
        break;

      case 3:
        if (action == "prev") {
          setSelectedTab(2);
        } else {
          updateHotelDetails();
        }
        break;

      case 4:
        if (action == "prev") {
          setSelectedTab(3);
        } else {
          updateItinerary();
        }
        break;

      case 5:
        if (action == "prev") {
          setSelectedTab(4);
        } else {
          updateMarkup(5);
        }
        break;
    }
  };
  const addBasicDetails = async () => {
    try {
      let url = ADD_QUOTATION_API;
      let body = {
        quotPackage:
          quotFormData.quotPackage != "" ? quotFormData.quotPackage : "1",
        quotSeason:
          quotFormData.quotSeason != "" ? quotFormData.quotSeason : "1",
        fkTourId: quotFormData.fkTourId,
        quotClientName: quotFormData.quotClientName,
        fkLeadId: quotFormData.fkLeadId,
        quotMobileNo: quotFormData.quotMobileNo,
        quotWhatsAppNo: quotFormData.quotWhatsAppNo,
        quotEmail: quotFormData.quotEmail,
        quotStartPointId: quotFormData.quotStartPointId,
        quotEndPointId: quotFormData.quotEndPointId,
        quotArrivalDate: quotFormData.quotArrivalDate,
        quotDepartureDate: quotFormData.quotDepartureDate,
        quotDays: quotFormData.quotDays,
        quotNights: quotFormData.quotNights,
      };
      console.log("body", body);
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsLoading(false);
          setSelectedTab(2);
          setDisabledTab(2);
          dispatch(setQuotationFormData("quotId", response.data.data));
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
  const updateBasicDetails = async () => {
    try {
      let url = UPDATE_QUOTATION_BASIC_API;

      let body = {
        quotId: quotFormData.quotId,
        quotPackage: quotFormData.quotPackage,
        quotSeason: quotFormData.quotSeason,
        fkTourId: quotFormData.fkTourId,
        quotClientName: quotFormData.quotClientName,
        fkLeadId: quotFormData.fkLeadId,
        quotMobileNo: quotFormData.quotMobileNo,
        quotWhatsAppNo: quotFormData.quotWhatsAppNo,
        quotEmail: quotFormData.quotEmail,
        quotStartPointId: quotFormData.quotStartPointId,
        quotEndPointId: quotFormData.quotEndPointId,
        quotArrivalDate: quotFormData.quotArrivalDate,
        quotDepartureDate: quotFormData.quotDepartureDate,
        quotDays: quotFormData.quotDays,
        quotNights: quotFormData.quotNights,
      };
      console.log("body", body);
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsLoading(false);
          setSelectedTab(2);
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
  const updateAccommodationDetails = async () => {
    try {
      let url = UPDATE_QUOTATION_ACCOMMODATION_API;

      let body = {
        quotId: quotFormData.quotId,
        quotTotalPeoples: quotFormData.quotTotalPeoples,
        quotRoomsReqd: quotFormData.quotRoomsReqd,
        quotChildAbove9: quotFormData.quotChildAbove9,
        quotChildBtwn8And9: quotFormData.quotChildBtwn8And9,
        quotBlw5: quotFormData.quotBlw5,
      };
      console.log("body", body);
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsLoading(false);
          setSelectedTab(3);
          setDisabledTab(3);
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
  const getQuotationHotelDetails = async () => {
    try {
      let url = FETCH_QUOTATION_HOTELS_DETAILS_API;
      let body = {
        id: quotFormData.quotId,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let hotelDetails = response.data.data;
          if (Array.isArray(hotelDetails)) {
            let quotHotelData = [];
            quotHotelData = hotelDetails.map((element) => ({
              packageName: element.quotPackageName,
              haltingDest: element.haltingPoint.haltingPointName,
              hotelType: element.hotelType.hotelTypeName,
              hotelName: element.hotel.hotelName,
              fromDate: getDateFormattedForDB(element.quotHotelFromDate),
              toDate: getDateFormattedForDB(element.quotHotelToDate),
              noOfNights: element.quotHotelToDate,
              roomType: element.roomType.roomTypeName,
              mealType: element.mealType.mealTypeName,
              haltingDestId: element.fkHaltingDestId,
              hotelTypeId: element.fkHotelTypeId,
              hotelId: element.fkHotelId,
              roomTypeId: element.fkRoomTypeId,
              mealTypeId: element.fkMealTypeId,
              quotHotelId: element.id,
            }));

            dispatch(setQuotationFormData("quotPackageData", quotHotelData));
          } else {
            let quotHotelObject = {
              packageName: hotelDetails.quotPackageName,
              haltingDest: hotelDetails.haltingPoint.haltingPointName,
              hotelType: hotelDetails.hotelType.hotelTypeName,
              hotelName: hotelDetails.hotel.hotelName,
              fromDate: getDateFormattedForDB(element.quotHotelFromDate),
              toDate: getDateFormattedForDB(element.quotHotelToDate),
              noOfNights: hotelDetails.quotHotelToDate,
              roomType: hotelDetails.roomType.roomTypeName,
              mealType: hotelDetails.mealType.mealTypeName,
              haltingDestId: hotelDetails.fkHaltingDestId,
              hotelTypeId: hotelDetails.fkHotelTypeId,
              hotelId: hotelDetails.fkHotelId,
              roomTypeId: hotelDetails.fkRoomTypeId,
              mealTypeId: hotelDetails.fkMealTypeId,
              quotHotelId: hotelDetails.id,
            };

            dispatch(setQuotationFormData("quotPackageData", quotHotelObject));
          }
        }
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const updateHotelDetails = async () => {
    try {
      let url = UPDATE_QUOTATION_HOTEL_API;
      let quotHotelData = [];
      let quotPackageData = quotFormData.quotPackageData;
      if (quotPackageData.length > 0) {
        quotPackageData.forEach((element) => {
          quotHotelData.push({
            quotHotelId: element.quotHotelId,
            quotPackageName: element.packageName,
            fkHaltingDestId: element.haltingDestId,
            fkHotelTypeId: element.hotelTypeId,
            fkHotelId: element.hotelId,
            quotHotelFromDate: element.fromDate,
            quotHotelToDate: element.toDate,
            quotHotelNoOfNights: element.noOfNights,
            fkRoomTypeId: element.roomTypeId,
            fkMealTypeId: element.mealTypeId,
          });
        });
      }
      let body = {
        quotId: quotFormData.quotId,
        quotHotelData: quotHotelData,
      };
      console.log("body", body);
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsLoading(false);
          getQuotationHotelDetails();
          setSelectedTab(4);
          setDisabledTab(4);
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
  const getQuotationItineraryDetails = async () => {
    try {
      let url = FETCH_QUOTATION_ITINERARY_DETAILS_API;
      let body = {
        id: quotFormData.quotId,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let itineraryDetails = response.data.data;
          console.log("itineraryDetails", itineraryDetails);
          if (Array.isArray(itineraryDetails)) {
            let itineraryData = [];

            itineraryData = itineraryDetails.map((element) => ({
              quotItiId: element.id,
              quotItiDay: element.quotItiDay,
              quotItiDate: element.quotItiDate,
              vehicleName: element.vehicle.vehicleName,
              fkVehicleId: element.fkVehicleId,
              pickupPt: element.pickupPoint.transitPointName,
              quotItiPickupPtId: element.quotItiPickupPtId,
              dropPt: element.dropPoint.transitPointName,
              quotItiDropPtId: element.quotItiDropPtId,
              quotItiNoOfVehicles: element.quotItiNoOfVehicles,
              quotItiAddons: element.itiAddonData.map((addOnElement) => ({
                quotItiAddonId: addOnElement.id,
                quotItiService: addOnElement.quotItiService,
                quotItiServicePayable: addOnElement.quotItiServicePayable,
                quotItiServiceAmount: addOnElement.quotItiServiceAmount,
                quotItiServiceRemark: addOnElement.quotItiServiceRemark,
              })),
              quotItiDestinations: element.quotItiDestinations
                .split(",")
                .map((name) => ({
                  destinationName: parseInt(name, 10),
                  destinationDesc: "",
                })),
            }));

            dispatch(setQuotationFormData("quotItineraryData", itineraryData));
          } else {
            itiAddonData = element.itiAddonData.map((element) => ({
              quotItiAddonId: element.id,
              quotItiService: element.quotItiService,
              quotItiServicePayable: element.quotItiServicePayable,
              quotItiServiceAmount: element.quotItiServiceAmount,
              quotItiServiceRemark: element.quotItiServiceRemark,
            }));
            let itineraryObject = {
              quotItiId: element.id,
              quotItiDay: element.quotItiDay,
              quotItiDate: element.quotItiDate,
              vehicleName: element.vehicle.vehicleName,
              fkVehicleId: element.fkVehicleId,
              pickupPt: element.pickupPoint.transitPointName,
              quotItiPickupPtId: element.quotItiPickupPtId,
              dropPt: element.dropPoint.transitPointName,
              quotItiDropPtId: element.quotItiDropPtId,
              quotItiNoOfVehicles: element.quotItiNoOfVehicles,
              quotItiAddons: element.itiAddonData.map((addOnElement) => ({
                quotItiAddonId: addOnElement.id,
                quotItiService: addOnElement.quotItiService,
                quotItiServicePayable: addOnElement.quotItiServicePayable,
                quotItiServiceAmount: addOnElement.quotItiServiceAmount,
                quotItiServiceRemark: addOnElement.quotItiServiceRemark,
              })),
              quotItiDestinations: element.quotItiDestinations
                .split(",")
                .map((name) => ({
                  destinationName: parseInt(name, 10),
                  destinationDesc: "",
                })),
            };
            dispatch(
              setQuotationFormData("quotItineraryData", itineraryObject)
            );
          }
        }
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const updateItinerary = async () => {
    try {
      let url = UPDATE_QUOTATION_ITINERARY_API;
      let quotItineraryData = [];
      let quotItinerarydetails = quotFormData.quotItineraryData;

      if (quotItinerarydetails.length > 0) {
        console.log("quotItinerarydetails", quotItinerarydetails);
        quotItineraryData = quotItinerarydetails.map((element) => ({
          quotItiId: element.quotItiId,
          quotItiDay: element.quotItiDay,
          quotItiDate: getDateFormattedForDB(element.quotItiDate),
          fkVehicleId: element.fkVehicleId,
          quotItiNoOfVehicles: element.quotItiNoOfVehicles,
          quotItiPickupPtId: element.quotItiPickupPtId,
          quotItiDropPtId: element.quotItiDropPtId,
          quotItiDestinations: element.quotItiDestinations
            ? element.quotItiDestinations
                .map((dest) => dest.destinationName)
                .join(",")
            : "",
          quotItiAddons: element.quotItiAddons,
        }));
      }
      let body = {
        quotId: quotFormData.quotId,
        quotItineraryData: quotItineraryData,
      };
      console.log("body", body);
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsLoading(false);
          getQuotationItineraryDetails();
          setSelectedTab(5);
          setDisabledTab(5);
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
  const updateMarkup = async () => {
    try {
      let url = UPDATE_QUOTATION_MARKUP_API;

      const formData = new FormData();

      formData.append("quotId", quotFormData.quotId);
      formData.append("quotBeforeMarkup", quotFormData.quotBeforeMarkup);
      formData.append("quotMarkup", quotFormData.quotMarkup);
      formData.append("quotAfterMarkup", quotFormData.quotAfterMarkup);
      formData.append("quotCompanyName", quotFormData.quotCompanyName);
      formData.append("quotCorporateOffice", quotFormData.quotCorporateOffice);
      formData.append("quotRegionalOffice", quotFormData.quotRegionalOffice);
      formData.append("quotCompanyHotline", quotFormData.quotCompanyHotline);
      formData.append("quotCompanyEmail", quotFormData.quotCompanyEmail);
      formData.append("quotCompanyWebsite", quotFormData.quotCompanyWebsite);
      formData.append(
        "quotLogo",
        base64ToFile(quotFormData.quotLogo, createFilename("logo", "jpeg"))
      );
      formData.append(
        "quotCompanyLogo",
        base64ToFile(
          quotFormData.quotCompanyLogo,
          createFilename("companylogo", "jpeg")
        )
      );

      console.log("body", quotFormData.quotLogo);
      setIsLoading(true);
      let response = await axios.post(url, formData);
      if (response) {
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });

          dispatch(resetFormData());
          setIsLoading(false);
          setTimeout(() => {
            navigate("/quotations");
          }, 1000);
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
                  <h4 className="card-title">Add Quotation </h4>
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
                              onClick={() => openFormTab(tab)}
                              // style={{ opacity: tab.isDisabled ? 0.5 : 1 }}
                            >
                              <a
                                id="steps-uid-0-t-0"
                                href="#steps-uid-0-h-0"
                                aria-controls="steps-uid-0-p-0"
                                style={{
                                  backgroundColor:
                                    selectedTab == tab.id
                                      ? "#2656ab"
                                      : tab.isDisabled
                                      ? "#d6d6d6"
                                      : "#FF9800",
                                }}
                              >
                                <span className="number">{tab.id}.</span>{" "}
                                {tab.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <ComponentSelector selectedTab={selectedTab} />
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
                        {selectedTab != 5 && (
                          <li aria-hidden="false" aria-disabled="false">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                selectForm("next", selectedTab);
                              }}
                            >
                              Next
                            </button>
                          </li>
                        )}
                        {selectedTab == 5 && (
                          <li>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                updateMarkup();
                              }}
                            >
                              Submit
                            </button>
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
      <ToastContainer />

      <Loader isLoading={isLoading}></Loader>
    </>
  );
};
export default AddQuotation;
