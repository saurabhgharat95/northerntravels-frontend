import { useState, useRef, useEffect } from "react";
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
  FETCH_QUOTATION_DETAILS_API,
  FETCH_TOUR_DETAILS_API,
  GENERATE_QUOTATION_PDF_API,
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
  const { id } = useParams();
  const navigate = useNavigate();
  const componentSelectorRef = useRef();
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
  const setTabDisabledFalse = (tabId) => {
    const updatedTabNames = tabNames.map((tab) => {
      if (tab.id === tabId) {
        return { ...tab, isDisabled: false };
      }
      return tab;
    });

    setTabNames(updatedTabNames);
  };
  const setTabsDisabledFalseArray = (tabIds) => {
    const updatedTabNames = tabNames.map((tab) => {
      if (tabIds.includes(tab.id)) {
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

      const isFormValid =
        componentSelectorRef.current.isBasicDetailsFormValid();
      if (isFormValid) {
        setIsLoading(true);
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            setIsLoading(false);
            setSelectedTab(2);
            setTabDisabledFalse(2);
            dispatch(setQuotationFormData("quotId", response.data.data));
          }
        }
      }
    } catch (e) {
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

      const isFormValid =
        componentSelectorRef.current.isBasicDetailsFormValid();
      if (isFormValid) {
        setIsLoading(true);
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            setTabDisabledFalse(2);
            setIsLoading(false);
            setSelectedTab(2);
          }
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateAccommodationDetails = async () => {
    try {
      let url = UPDATE_QUOTATION_ACCOMMODATION_API;
      let quotRoomData = [];

      let roomData = quotFormData.roomData;
      if (roomData.length > 0) {
        roomData.forEach((element) => {
          if (element.isSingleOccupancy) {
            quotRoomData.push({
              id: element.id,
              isSingleOccupancy: element.isSingleOccupancy ? "1" : "0",
              totalPersonsRoom: 1,
              childAbove9: 0,
              extraBeds: 0,
              noExtraBeds: 0,
              freeBeds: 0,
            });
          } else {
            quotRoomData.push({
              id: element.id,
              isSingleOccupancy: element.isSingleOccupancy ? "1" : "0",
              totalPersonsRoom: element.totalPersonsRoom,
              childAbove9: element.childAbove9,
              extraBeds: element.extraBeds,
              noExtraBeds: element.noExtraBeds,
              freeBeds: element.freeBeds,
            });
          }
        });
      }
      let body = {
        quotId: quotFormData.quotId,
        quotTotalPeoples: quotFormData.quotTotalPeoples,
        quotRoomsReqd: quotFormData.quotRoomsReqd,
        quotChildAbove9: quotFormData.quotTotalExtraBeds,
        quotChildBtwn8And9: quotFormData.quotChildBtwn8And9,
        quotBlw5: quotFormData.quotBlw5,
        quotSingleOccupy: quotFormData.quotSingleOccupy,
        roomData: quotRoomData,
      };

      const isFormValid = componentSelectorRef.current.isAccomFormValid();

      if (isFormValid) {
        setIsLoading(true);
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            setIsLoading(false);
            setSelectedTab(3);
            setTabDisabledFalse(3);
          }
        }
      }
    } catch (e) {
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
              haltingDest: element.halting.haltingPointName,
              hotelType: element.hotel_type.hotelTypeName,
              hotelName: element.hotel.hotelName,
              fromDate: getDateFormattedForDB(element.quotHotelFromDate),
              toDate: getDateFormattedForDB(element.quotHotelToDate),
              noOfNights: element.quotHotelNoOfNights,
              roomType: element.room_type.roomTypeName,
              mealType: element.meal_type.mealTypeName,
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
              haltingDest: hotelDetails.halting.haltingPointName,
              hotelType: hotelDetails.hotel_type.hotelTypeName,
              hotelName: hotelDetails.hotel.hotelName,
              fromDate: getDateFormattedForDB(element.quotHotelFromDate),
              toDate: getDateFormattedForDB(element.quotHotelToDate),
              noOfNights: hotelDetails.quotHotelNoOfNights,
              roomType: hotelDetails.room_type.roomTypeName,
              mealType: hotelDetails.meal_type.mealTypeName,
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
    } catch (e) {}
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

      const isFormValid = componentSelectorRef.current.isHotelFormValid();
      if (isFormValid) {
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
            setTabDisabledFalse(4);
          }
        }
      }
    } catch (e) {
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
          if (Array.isArray(itineraryDetails)) {
            let itineraryData = [];
            itineraryDetails.forEach((element) => {
              itineraryData.push({
                quotItiId: element.id,
                quotItiDay: element.quotItiDay,
                quotItiDate: element.quotItiDate,
                vehicleName: element.vehicle.vehicleName,
                fkVehicleId: element.fkVehicleId,
                pickupPt: element.pickup.transitPointName,
                quotItiPickupPtId: element.quotItiPickupPtId,
                dropPt: element.drop.transitPointName,
                quotItiDropPtId: element.quotItiDropPtId,
                quotItiNoOfVehicles: element.quotItiNoOfVehicles,
                quotItiAmount: element.quotItiAmount
                  ? element.quotItiAmount
                  : 0,
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
              });
            });
            // itineraryData = itineraryDetails.map((element) => ({
            //   quotItiId: element.id,
            //   quotItiDay: element.quotItiDay,
            //   quotItiDate: element.quotItiDate,
            //   vehicleName: element.vehicle.vehicleName,
            //   fkVehicleId: element.fkVehicleId,
            //   pickupPt: element.pickup.transitPointName,
            //   quotItiPickupPtId: element.quotItiPickupPtId,
            //   dropPt: element.drop.transitPointName,
            //   quotItiDropPtId: element.quotItiDropPtId,
            //   quotItiNoOfVehicles: element.quotItiNoOfVehicles,
            //   quotItiAmount: element.quotItiAmount ? element.quotItiAmount : 0,
            //   quotItiAddons: element.itiAddonData.map((addOnElement) => ({
            //     quotItiAddonId: addOnElement.id,
            //     quotItiService: addOnElement.quotItiService,
            //     quotItiServicePayable: addOnElement.quotItiServicePayable,
            //     quotItiServiceAmount: addOnElement.quotItiServiceAmount,
            //     quotItiServiceRemark: addOnElement.quotItiServiceRemark,
            //   })),
            //   quotItiDestinations: element.quotItiDestinations
            //     .split(",")
            //     .map((name) => ({
            //       destinationName: parseInt(name, 10),
            //       destinationDesc: "",
            //     })),
            // }));

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
              quotItiAmount: element.quotItiAmount,
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
    } catch (e) {}
  };
  const updateItinerary = async () => {
    try {
      let url = UPDATE_QUOTATION_ITINERARY_API;
      let quotItineraryData = [];
      let quotItinerarydetails = quotFormData.quotItineraryData;
      let quotItiAddons = [];
      if (quotItinerarydetails.length > 0) {
        quotItinerarydetails.forEach((element) => {
          if (element.quotItiAddons && element.quotItiAddons.length > 0) {
            if (
              element.quotItiAddons[0].quotItiService != "" ||
              element.quotItiAddons[0].quotItiAddonId
            ) {
              quotItiAddons = element.quotItiAddons;
            }
          }

          quotItineraryData.push({
            quotItiId: element.quotItiId,
            quotItiDay: element.quotItiDay,
            quotItiDate: getDateFormattedForDB(element.quotItiDate),
            fkVehicleId: element.fkVehicleId,
            quotItiNoOfVehicles: element.quotItiNoOfVehicles,
            quotItiPickupPtId: element.quotItiPickupPtId,
            quotItiDropPtId: element.quotItiDropPtId,
            quotItiAmount: element.quotItiAmount ? element.quotItiAmount : 0,
            quotItiDestinations: element.quotItiDestinations
              ? element.quotItiDestinations
                  .map((dest) => dest.destinationName)
                  .join(",")
              : "",
            quotItiAddons: quotItiAddons,
          });
        });
      }
      let body = {
        quotId: quotFormData.quotId,
        quotItineraryData: quotItineraryData,
      };

      const isFormValid = componentSelectorRef.current.isItineraryFormValid();

      if (isFormValid) {
        setIsLoading(true);
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            setIsLoading(false);
            setSelectedTab(5);
            setTabDisabledFalse(5);
            getQuotationItineraryDetails();
          }
        }
      }
    } catch (e) {
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
      formData.append("quotBeforeMarkup", "");
      formData.append("quotMarkup", quotFormData.quotMarkup);
      formData.append("quotAfterMarkup", "");
      formData.append("quotCompanyName", quotFormData.quotCompanyName);
      formData.append("quotCorporateOffice", quotFormData.quotCorporateOffice);
      formData.append("quotRegionalOffice", quotFormData.quotRegionalOffice);
      formData.append("quotCompanyHotline", quotFormData.quotCompanyHotline);
      formData.append("quotCompanyEmail", quotFormData.quotCompanyEmail);
      formData.append("quotCompanyWebsite", quotFormData.quotCompanyWebsite);
      formData.append("quotAccData", JSON.stringify(quotFormData.quotAccData));
      formData.append("itineraryPPAmt", quotFormData.itineraryPPAmt);
      formData.append("addOnPPAMt", quotFormData.addOnPPAMt);
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
      // formData.append("quotLogo", "");
      // formData.append("quotCompanyLogo", "");

      //
      const isFormValid = componentSelectorRef.current.isMarkupFormValid();

      if (isFormValid) {
        setIsLoading(true);
        let response = await axios.post(url, formData);
        if (response) {
          if (response.status == 200) {
            generateQuotationPDF(quotFormData.quotId);
          }
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const generateQuotationPDF = async (quotId) => {
    try {
      let url = GENERATE_QUOTATION_PDF_API;

      let body = {
        id: quotId,
      };

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
       
          setTimeout(() => {
            setIsLoading(false);
            toast.success(response.data.message, {
              position: "top-right",
            });
            dispatch(resetFormData());
            window.location.href = "/quotations";
          }, 1000);
        }
      }
    } catch (e) {}
  };
  const fetchTourDetails = async (tourId) => {
    try {
      let url = FETCH_TOUR_DETAILS_API;
      let body = {
        id: tourId,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let stateIds = [];
          let states = response.data.data.states;
          states.forEach((state) => {
            stateIds.push(state.fkLocationId);
          });
          dispatch(setQuotationFormData("stateIds", stateIds));
          dispatch(setQuotationFormData("tourData", response.data.data));
        }
      }
    } catch (e) {}
  };
  const fetchQuotationDetails = async (id) => {
    try {
      let url = FETCH_QUOTATION_DETAILS_API;
      let body = {
        id: id,
      };
      setIsLoading(true);

      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          setIsLoading(false);

          let quotationDetails = response.data.data;
          const tabsToEnable = [];

          if (quotationDetails.quotTotalPeoples) {
            tabsToEnable.push(2);
          }

          if (quotationDetails?.hotels?.length > 0) {
            tabsToEnable.push(3);
          }

          if (quotationDetails?.itinerary?.length > 0) {
            tabsToEnable.push(4);
          }

          if (quotationDetails.quotMarkup) {
            tabsToEnable.push(5);
          }
          setTabsDisabledFalseArray(tabsToEnable);
          fetchTourDetails(quotationDetails.fkTourId);
          const uniquePackageNames = new Set();
          const quotPackageData = [];
          const quotItineraryData = [];
          quotationDetails.hotels.forEach((pkg) => {
            quotPackageData.push({
              packageName: pkg.quotPackageName,
              haltingDest: pkg.halting.haltingPointName,
              hotelType: pkg.hotel_type.hotelTypeName,
              hotelName: pkg.hotel.hotelName,
              fromDate: new Date(pkg.quotHotelFromDate)
                .toISOString()
                .split("T")[0],
              toDate: new Date(pkg.quotHotelToDate).toISOString().split("T")[0],
              noOfNights: pkg.quotHotelNoOfNights,
              roomType: pkg.room_type.roomTypeName,
              mealType: pkg.meal_type.mealTypeName,
              haltingDestId: pkg.fkHaltingDestId,
              hotelTypeId: pkg.fkHotelTypeId,
              hotelId: pkg.fkHotelId,
              roomTypeId: pkg.fkRoomTypeId,
              mealTypeId: pkg.fkMealTypeId,
              quotHotelId: pkg.id,
            });
            uniquePackageNames.add(pkg.quotPackageName);
          });
          quotationDetails.itinerary.forEach((quotItinerary) => {
            let quotItiAddons = [];
            let quotItiDestinations = [];
            quotItinerary.itiAddonData.forEach((addOn) => {
              quotItiAddons.push({
                quotItiAddonId: addOn.id,
                quotItiService: addOn.quotItiService,
                quotItiServicePayable: addOn.quotItiServicePayable,
                quotItiServiceAmount: addOn.quotItiServiceAmount,
                quotItiServiceRemark: addOn.quotItiServiceRemark,
              });
            });
            quotItinerary.quotItiDestinations.split(",").forEach((dest) => {
              quotItiDestinations.push({
                destinationName: Number(dest),
                destinationDesc: "",
              });
            });
            quotItineraryData.push({
              quotItiId: quotItinerary.id,
              quotItiDay: quotItinerary.quotItiDay,
              quotItiDate: new Date(quotItinerary.quotItiDate)
                .toISOString()
                .split("T")[0],
              vehicleName: quotItinerary.vehicle.vehicleName,
              fkVehicleId: quotItinerary.fkVehicleId,
              pickupPt: quotItinerary.pickup.transitPointName,
              quotItiPickupPtId: quotItinerary.quotItiPickupPtId,
              dropPt: quotItinerary.drop.transitPointName,
              quotItiDropPtId: quotItinerary.quotItiDropPtId,
              quotItiNoOfVehicles: quotItinerary.quotItiNoOfVehicles,
              quotItiAmount: quotItinerary.quotItiAmount,
              quotItiAddons: quotItiAddons,
              quotItiDestinations: quotItiDestinations,
            });
          });

          const uniquePackageNamesArray = Array.from(uniquePackageNames);
          const formData = {
            quotId: quotationDetails.id,
            quotPackage: quotationDetails.quotPackage,
            quotSeason: quotationDetails.quotSeason,
            fkTourId: quotationDetails.fkTourId,
            quotClientName: quotationDetails.quotClientName,
            fkLeadId: quotationDetails.fkLeadId,
            quotMobileNo: quotationDetails.quotMobileNo,
            quotWhatsAppNo: quotationDetails.quotWhatsAppNo,
            quotEmail: quotationDetails.quotEmail,
            quotStartPointId: quotationDetails.quotStartPointId,
            quotEndPointId: quotationDetails.quotEndPointId,
            quotArrivalDate: new Date(quotationDetails.quotArrivalDate)
              .toISOString()
              .split("T")[0],
            quotDepartureDate: new Date(quotationDetails.quotDepartureDate)
              .toISOString()
              .split("T")[0],
            quotDays: quotationDetails.quotDays,
            quotNights: quotationDetails.quotNights,
            quotTotalPeoples: quotationDetails.quotTotalPeoples,
            quotRoomsReqd: quotationDetails.quotRoomsReqd,
            quotChildAbove9: quotationDetails.quotChildAbove9,
            quotChildBtwn8And9: quotationDetails.quotChildBtwn8And9,
            quotBlw5: quotationDetails.quotBlw5,
            quotSingleOccupy: quotationDetails.quotSingleOccupy,
            quotTotalExtraBeds: quotationDetails.quotChildAbove9,
            roomData: quotationDetails.rooms,
            quotPackageNameArray: uniquePackageNamesArray,
            quotPackageData: quotPackageData,
            quotItineraryData: quotItineraryData,
            quotBeforeMarkup: quotationDetails.quotBeforeMarkup,
            quotMarkup: quotationDetails.quotMarkup,
            quotAfterMarkup: quotationDetails.quotAfterMarkup,
            quotCompanyName: quotationDetails.quotCompanyName,
            quotCorporateOffice: quotationDetails.quotCorporateOffice,
            quotRegionalOffice: quotationDetails.quotRegionalOffice,
            quotCompanyHotline: quotationDetails.quotCompanyHotline,
            quotCompanyEmail: quotationDetails.quotCompanyEmail,
            quotCompanyWebsite: quotationDetails.quotCompanyWebsite,
            quotLogo: quotationDetails.quotLogo,
            quotCompanyLogo: quotationDetails.quotCompanyLogo,

            // itineraryPPAmt: quotationDetails.itineraryPPAmt,
            // addOnPPAMt: quotationDetails.addOnPPAMt,
            // quotCompanyLogo: quotationDetails.quotCompanyLogo,
          };
          Object.entries(formData).forEach(([field, value]) => {
            dispatch(setQuotationFormData(field, value));
          });
          setForceUpdate((v) => ++v);
        }
      }
    } catch (e) {
      setIsLoading(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (id) {
      fetchQuotationDetails(id);
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
                      onClick={() => navigate("/quotations")}
                    >
                      Quotation Management
                    </li>

                    <li className="breadcrumb-item font-weight-bold text-primary">
                      {id ? "Edit" : "Add"} Quotation
                    </li>
                  </ol>
                  <h3 className="card-title ml-1">
                    {id ? "Edit" : "Add"} Quotation{" "}
                  </h3>

                  <div
                    role="application"
                    className="wizard clearfix"
                    id="steps-uid-0"
                  >
                    <div className="steps clearfix">
                      <ul role="tablist" className="tab-list">
                        {tabNames &&
                          tabNames.map((tab) => (
                            <li
                              key={tab.id}
                              role="tab"
                              className="current"
                              aria-disabled="false"
                              aria-selected="true"
                              onClick={() => {
                                openFormTab(tab);
                                if(tab.id==5){
                                  updateItinerary();
                                }
                              }}
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
                    <div className="actions pt-2 clearfix">
                      <ul role="menu" aria-label="Pagination">
                        <li>
                          <button
                            className="btn cancel-btn"
                            onClick={() => {
                              navigate("/quotations");
                            }}
                          >
                            Cancel
                          </button>
                        </li>
                        <li aria-disabled="true">
                          <button
                            className="btn  previous-btn"
                            onClick={() => {
                              selectForm("prev", selectedTab);
                              scrollToTop();
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
                                scrollToTop();
                              }}
                            >
                              Next
                            </button>
                          </li>
                        )}
                        {selectedTab == 5 && (
                          <li>
                            <button
                              className="btn btn-success"
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
                    <div className="content clearfix">
                      <ComponentSelector
                        selectedTab={selectedTab}
                        ref={componentSelectorRef}
                      />
                    </div>

                    <div className="actions clearfix">
                      <ul role="menu" aria-label="Pagination">
                        <li>
                          <button
                            className="btn cancel-btn"
                            onClick={() => {
                              navigate("/quotations");
                            }}
                          >
                            Cancel
                          </button>
                        </li>
                        <li aria-disabled="true">
                          <button
                             className="btn  previous-btn"
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
                              className="btn btn-success"
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
export default AddQuotation;
