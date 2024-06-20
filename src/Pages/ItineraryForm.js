import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
  toast,
} from "../components/CommonImport";
import NoData from "../components/NoData";
import {
  FETCH_VEHICLES_API,
  FETCH_TRANSIT_PT_BY_TOUR_API,
  FETCH_TOUR_DETAILS_API,
  FETCH_LOCATIONS_API,
  FETCH_TRANSIT_POINTS_API,
} from "../utils/constants";
import ConfirmationDialog from "../components/ConfirmationDialog";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";
import { getMultipleFilteredDropdownOptions } from "../utils/helpers";
import SwapModal from "../components/SwapModel";

const ItineraryForm = ({ onValidationStatusChange }) => {
  const [locations, setLocations] = useState([]);
  const [transitPts, setTransitPtList] = useState([]);
  const [acionObj, setActionObj] = useState({ deleteId: null, updateId: null });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [, setForceUpdate] = useState(0);
  const [itineraryData, setItineraryData] = useState([]);
  const [originalItineraryData, setOriginalItineraryData] = useState([]);
  const [selectedLocationDescription, setSelectedLocationDescription] =
    useState("");
  const [itineraryObject, setItineraryObject] = useState({
    quotItiId: null,
    quotItiDay: itineraryData.length ? itineraryData.length : 1,
    quotItiDate: new Date().toISOString().split("T")[0],
    vehicleName: "",
    fkVehicleId: "",
    pickupPt: "",
    quotItiPickupPtId: "",
    dropPt: "",
    quotItiDropPtId: "",
    quotItiNoOfVehicles: "",
    quotItiAddons: [],
    quotItiDestinations: [],
    quotItiAmount: "",
  });

  const [optionsObj, setOptionsObj] = useState({
    vehicleOptions: [],
    pickupPtOptions: [],
    dropPtOptions: [],
    destOptions: [],
    addOnServiceOptions: [],
  });

  //redux
  const dispatch = useDispatch();
  const quotFormData = useSelector((state) => state.form.quotationFormData);

  const [destFormValues, setDestFormValues] = useState([
    { destinationName: "", destinationDesc: "" },
  ]);
  const [addOnformValues, setAddOnFormValues] = useState([
    {
      quotItiAddonId: null,
      quotItiService: "",
      quotItiServicePayable: "1",
      quotItiServiceAmount: "",
      quotItiServiceRemark: "",
    },
  ]);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

  let addAddOnServicesFormFields = () => {
    setAddOnFormValues([
      ...addOnformValues,
      {
        quotItiAddonId: null,
        quotItiService: "",
        quotItiServicePayable: "1",
        quotItiServiceAmount: "",
        quotItiServiceRemark: "",
      },
    ]);
  };

  let removeAddOnServicesFormFields = (i) => {
    let newFormValues = [...addOnformValues];
    newFormValues.splice(i, 1);
    setAddOnFormValues(newFormValues);
  };
  let addDestFormFields = () => {
    setDestFormValues([
      ...destFormValues,
      { destinationName: "", destinationDesc: "" },
    ]);
  };

  let removeDestFormFields = (i) => {
    let newFormValues = [...destFormValues];
    newFormValues.splice(i, 1);
    setDestFormValues(newFormValues);
  };
  const resetAddOn = (i) => {
    try {
      let newFormValues = [...addOnformValues];
      newFormValues[i].quotItiAddonId = newFormValues[i].quotItiAddonId
        ? newFormValues[i].quotItiAddonId
        : null;
      newFormValues[i].quotItiService = "";
      newFormValues[i].quotItiServicePayable = "1";
      newFormValues[i].quotItiServiceAmount = "";
      newFormValues[i].quotItiServiceRemark = "";

      setAddOnFormValues(newFormValues);
    } catch (e) {}
  };
  const addItinerary = () => {
    try {
      if (simpleValidator.current.allValid()) {
        let quotArrivalDate = quotFormData.quotArrivalDate
          ? new Date(quotFormData.quotArrivalDate)
          : null;
        let quotDepartureDate = quotFormData.quotDepartureDate
          ? new Date(quotFormData.quotDepartureDate)
          : null;
        let quotItiDate = itineraryObject.quotItiDate
          ? new Date(itineraryObject.quotItiDate)
          : null;
        let quotItiDay = itineraryObject.quotItiDay
          ? itineraryObject.quotItiDay
          : 0;
        let quotDays = quotFormData.quotDays
          ? Number(quotFormData.quotDays)
          : 0;

        if (
          quotItiDate &&
          quotArrivalDate &&
          quotDepartureDate &&
          quotItiDay &&
          quotDays
        ) {
          if (
            quotItiDate >= quotArrivalDate &&
            quotItiDate <= quotDepartureDate &&
            quotItiDay <= quotDays
          ) {
            
            itineraryObject.quotItiAddons = addOnformValues;
            itineraryObject.quotItiDestinations = destFormValues;
            setItineraryData((prevState) => [...prevState, itineraryObject]);
            dispatch(
              setQuotationFormData("quotItineraryData", [
                ...quotFormData.quotItineraryData,
                itineraryObject,
              ])
            );

            setItineraryObject((prevState) => ({
              ...prevState,
              quotItiId: null,
              quotItiDay: parseInt(prevState.quotItiDay) + 1,
              quotItiDate: "",
              vehicleName: null,
              fkVehicleId: "",
              pickupPt: "",
              quotItiPickupPtId: "",
              dropPt: "",
              quotItiDropPtId: "",
              quotItiNoOfVehicles: "",
              quotItiAddons: [],
              quotItiDestinations: [],
              quotItiAmount: "",
            }));
            setDestFormValues([{ destinationName: "", destinationDesc: "" }]);
            setAddOnFormValues([
              {
                quotItiAddonId: null,
                quotItiService: "",
                quotItiServicePayable: "1",
                quotItiServiceAmount: "",
                quotItiServiceRemark: "",
              },
            ]);
            setActionObj((prevState) => ({ ...prevState, updateId: null }));
          } else {
            toast.error(
              "Itinerary date is outside the arrival and departure date range.",
              {
                position: "top-right",
              }
            );
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
      }
    } catch (e) {}
  };
  const editItinerary = () => {
    if (simpleValidator.current.allValid()) {
      let quotArrivalDate = quotFormData.quotArrivalDate
        ? new Date(quotFormData.quotArrivalDate)
        : null;
      let quotDepartureDate = quotFormData.quotDepartureDate
        ? new Date(quotFormData.quotDepartureDate)
        : null;
      let quotItiDate = itineraryObject.quotItiDate
        ? new Date(itineraryObject.quotItiDate)
        : null;
      let quotItiDay = itineraryObject.quotItiDay
        ? itineraryObject.quotItiDay
        : 0;
      let quotDays = quotFormData.quotDays ? Number(quotFormData.quotDays) : 0;
      if (
        quotItiDate &&
        quotArrivalDate &&
        quotDepartureDate &&
        quotItiDay &&
        quotDays
      ) {
        if (
          quotItiDate >= quotArrivalDate &&
          quotItiDate <= quotDepartureDate &&
          quotItiDay <= quotDays
        ) {
          itineraryObject.quotItiAddons = addOnformValues;
          itineraryObject.quotItiDestinations = destFormValues;
          const updatedItineraryData = [...itineraryData];
          updatedItineraryData[acionObj.updateId] = itineraryObject;

          setItineraryData(updatedItineraryData);
          setOriginalItineraryData(updatedItineraryData);
          dispatch(
            setQuotationFormData("quotItineraryData", updatedItineraryData)
          );
          setItineraryObject((prevState) => ({
            ...prevState,
            quotItiId: null,
            quotItiDay: parseInt(prevState.quotItiDay) + 1,
            quotItiDate: "",
            vehicleName: null,
            fkVehicleId: "",
            pickupPt: "",
            quotItiPickupPtId: "",
            dropPt: "",
            quotItiDropPtId: "",
            quotItiNoOfVehicles: "",
            quotItiAddons: [],
            quotItiDestinations: [],
            quotItiAmount: "",
          }));
          setDestFormValues([{ destinationName: "", destinationDesc: "" }]);
          setAddOnFormValues([
            {
              quotItiAddonId: null,
              quotItiService: "",
              quotItiServicePayable: "1",
              quotItiServiceAmount: "",
              quotItiServiceRemark: "",
            },
          ]);
          setActionObj((prevState) => ({ ...prevState, updateId: null }));
        } else {
          toast.error(
            "Itinerary date is outside the arrival and departure date range.",
            {
              position: "top-right",
            }
          );
        }
      }
    } else {
      setForceUpdate((v) => ++v);
      simpleValidator.current.showMessages();
    }
  };
  const handleCloseModal = () => {
    var modal = document.getElementById("locationDescriptionModal");

    if (modal) {
      var modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  const getSetDescription = (index, locationId) => {
    let destObj = locations.filter((location) => {
      return location.fkLocationId == locationId;
    });
    const newFormValues = [...destFormValues];
    newFormValues[index].destinationDesc =
      destObj[0].location.locationDescription;
    setSelectedLocationDescription(destObj[0].location.locationDescription);
    setDestFormValues(newFormValues);
  };

  const handleServicePayableChange = (event, index) => {
    const value = event.target.value;

    const newFormValues = [...addOnformValues];
    newFormValues[index].quotItiServicePayable = value ? value : "";

    setAddOnFormValues(newFormValues);
    setForceUpdate((v) => ++v);
  };
  const handleConfirm = () => {
    handleDelete(acionObj.deleteId);
    setShowConfirmation(false);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handleDelete = (index) => {
    const updatedItineraryData = itineraryData.filter((_, i) => i !== index);
    setItineraryData(updatedItineraryData);
    setOriginalItineraryData(updatedItineraryData);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const validateForm = () => {
    const isValid = simpleValidator.current.allValid();

    if (isValid) {
      onValidationStatusChange(isValid, 4);
    } else {
      simpleValidator.current.showMessages();
      setForceUpdate((v) => ++v);
    }
    return isValid;
  };
  const fetchVehicles = async () => {
    try {
      let url = FETCH_VEHICLES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let vehicles = response.data.data;
          let vehiclesOptionsArray = [];
          vehicles.forEach((vehicle) => {
            vehiclesOptionsArray.push({
              value: vehicle.id,
              label: vehicle.vehicleName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            vehicleOptions: vehiclesOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchTransitPts = async (tourPoints) => {
    try {
      let url = FETCH_TRANSIT_POINTS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let trasitPts = response.data.data;
          setTransitPtList(trasitPts);
          let pickupPtsOptionsArray = [];
          let dropPtsOptionsArray = [];
          const startPointIds =
            tourPoints && tourPoints.map((obj) => obj.startPointId);
          const endPointIds =
            tourPoints && tourPoints.map((obj) => obj.endPointId);

          trasitPts.forEach((trasitPt) => {
            if (startPointIds.includes(trasitPt.id)) {
              pickupPtsOptionsArray.push({
                value: trasitPt.id,
                label: trasitPt.transitPointName,
              });
            }
            if (endPointIds.includes(trasitPt.id)) {
              dropPtsOptionsArray.push({
                value: trasitPt.id,
                label: trasitPt.transitPointName,
              });
            }
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            pickupPtOptions: pickupPtsOptionsArray,
            dropPtOptions: dropPtsOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const getAddonAmount = (addOns) => {
    let addOnTotalAmt = 0;
    if (addOns) {
      if (addOns.length > 0) {
        addOns.forEach((element) => {
          addOnTotalAmt += element.quotItiServiceAmount
            ? Number(element.quotItiServiceAmount)
            : 0;
        });
      }
    }
    return addOnTotalAmt;
  };
  const getAmount = (type, resultType) => {
    let addOnTotalAmt = 0;
    let itineraryAmt = 0;
    if (itineraryData) {
      if (itineraryData.length > 0) {
        itineraryData.forEach((element) => {
          itineraryAmt += element.quotItiAmount
            ? Number(element.quotItiAmount)
            : 0;
          element.quotItiAddons.forEach((element2) => {
            addOnTotalAmt += element2.quotItiServiceAmount
              ? Number(element2.quotItiServiceAmount)
              : 0;
          });
        });
      }
    }
    if (type == "vehicle") {
      if (resultType == "total") {
        return "Rs." + itineraryAmt.toFixed(2);
      } else {
        return (
          "Rs." + (itineraryAmt / quotFormData.quotTotalPeoples).toFixed(2)
        );
      }
    } else if (type == "addon") {
      if (resultType == "total") {
        return "Rs." + addOnTotalAmt.toFixed(2);
      } else {
        return (
          "Rs." + (addOnTotalAmt / quotFormData.quotTotalPeoples).toFixed(2)
        );
      }
    }
  };
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [preselectedDay, setPreselectedDay] = useState(null);

  const handleClose = () => setShowSwapModal(false);
  const handleShow = (index) => {
    setPreselectedDay(index);
    setShowSwapModal(true);
  };

  const handleSwap = (index1, index2) => {
    let newItineraryData = [...itineraryData];
    [newItineraryData[index1], newItineraryData[index2]] = [
      newItineraryData[index2],
      newItineraryData[index1],
    ];
    // Update your state management logic here
    setItineraryData(newItineraryData);
  };
  useEffect(() => {
    fetchVehicles();
  }, []);
  useEffect(() => {
    if (quotFormData) {
      let tourDetails = quotFormData.tourData;

      fetchTransitPts(tourDetails.transportations);

      // if (quotFormData.quotArrivalDate && quotFormData.quotArrivalDate!=''){
      //   setItineraryObject(prevState=>({
      //     ...prevState,
      //     quotItiDate:quotFormData.quotArrivalDate
      //   }))
      // }
      // let vehicles = tourDetails.transportations;
      // if (vehicles && vehicles.length > 0) {
      //   const vehicleMap = new Map();

      //   vehicles.forEach((vehicle) => {
      //     vehicleMap.set(vehicle.fkVehicleId, {
      //       value: vehicle.fkVehicleId,
      //       label: vehicle.vehicle.vehicleName,
      //     });
      //   });

      //   const vehiclesOptionsArray = Array.from(vehicleMap.values());
      //   setOptionsObj((prevState) => ({
      //     ...prevState,
      //     vehicleOptions: vehiclesOptionsArray,
      //   }));
      // }

      // let pickupPtOptionsArray = [];
      // let transitPoints = tourDetails.transitPoints;

      // if (transitPoints && transitPoints.length > 0) {
      //   transitPoints.forEach((point) => {
      //     pickupPtOptionsArray.push({
      //       value: point.fkTransitPointId,
      //       label: point.transitPoint.transitPointName,
      //     });
      //   });
      //   setOptionsObj((prevState) => ({
      //     ...prevState,
      //     pickupPtOptions: pickupPtOptionsArray,
      //     dropPtOptions: pickupPtOptionsArray,
      //   }));
      // }
      let destOptionsArray = [];
      let visitingLocations = tourDetails.visitingLocations;
      setLocations(visitingLocations);
      if (visitingLocations && visitingLocations.length > 0) {
        visitingLocations.forEach((point) => {
          destOptionsArray.push({
            value: point.fkLocationId,
            label: point.location.locationName,
          });
        });
        setOptionsObj((prevState) => ({
          ...prevState,
          destOptions: destOptionsArray,
        }));
      }
      let addOnOptionsArray = [];
      let tourAddOnServices = tourDetails.tourAddOnServices;

      if (tourAddOnServices && tourAddOnServices.length > 0) {
        tourAddOnServices.forEach((service) => {
          addOnOptionsArray.push({
            value: service.serviceName,
            label: service.serviceName,
          });
        });
        setOptionsObj((prevState) => ({
          ...prevState,
          addOnServiceOptions: addOnOptionsArray,
        }));
      }
      if (tourAddOnServices && addOnformValues.length == 0) {
        setAddOnFormValues([
          {
            quotItiAddonId: null,
            quotItiService: "",
            quotItiServicePayable: "1",
            quotItiServiceAmount: "",
            quotItiServiceRemark: "",
          },
        ]);
      }

      let quotItineraryData = quotFormData.quotItineraryData;
      let quotItineraryArray = [];
      for (let index = 0; index < quotItineraryData.length; index++) {
        quotItineraryArray.push({
          quotItiId: quotItineraryData[index].quotItiId,
          quotItiDay: quotItineraryData[index].quotItiDay,
          quotItiDate: quotItineraryData[index].quotItiDate,
          vehicleName: quotItineraryData[index].vehicleName,
          fkVehicleId: quotItineraryData[index].fkVehicleId,
          pickupPt: quotItineraryData[index].pickupPt,
          quotItiPickupPtId: quotItineraryData[index].quotItiPickupPtId,
          dropPt: quotItineraryData[index].dropPt,
          quotItiDropPtId: quotItineraryData[index].quotItiDropPtId,
          quotItiNoOfVehicles: quotItineraryData[index].quotItiNoOfVehicles,
          quotItiAmount: quotItineraryData[index].quotItiAmount,
          quotItiAddons: quotItineraryData[index].quotItiAddons,
          quotItiDestinations: quotItineraryData[index].quotItiDestinations,
          quotItiAmount: quotItineraryData[index].quotItiAmount
            ? quotItineraryData[index].quotItiAmount
            : 0,
        });
      }
      setItineraryData(quotItineraryArray);
      setOriginalItineraryData(quotItineraryArray);
    }
  }, [quotFormData]);
  useEffect(() => {
    if (
      !quotFormData ||
      !quotFormData.tourData ||
      !transitPts ||
      !itineraryObject ||
      !itineraryObject.quotItiPickupPtId
    ) {
      return;
    }
    let tourDetails = quotFormData.tourData;

    let vehicles = tourDetails.transportations;
    let transitPoints = transitPts;
    const filteredEntries = vehicles.filter(
      (item) => item.startPointId === itineraryObject.quotItiPickupPtId
    );

    const uniqueEndPointsSet = new Set(
      filteredEntries.map((item) => item.endPointId)
    );

    const uniqueEndPoints = Array.from(uniqueEndPointsSet);
    const filteredTransitPoints = transitPoints.filter((item) =>
      uniqueEndPoints.includes(item.id)
    );

    const uniqueTransitPointsSet = new Set(
      filteredTransitPoints.map((item) => item.id)
    );

    const dropPointOptions = Array.from(uniqueTransitPointsSet).map((id) => {
      const transitPoint = filteredTransitPoints.find((item) => item.id === id);

      return {
        value: id,
        label: transitPoint.transitPointName,
      };
    });
    setOptionsObj((prevState) => ({
      ...prevState,
      dropPtOptions: dropPointOptions,
    }));
  }, [itineraryObject.quotItiPickupPtId]);

  useEffect(() => {
    if (
      !quotFormData ||
      !quotFormData.tourData ||
      !itineraryObject ||
      !itineraryObject.quotItiPickupPtId ||
      !itineraryObject.quotItiDropPtId
    ) {
      return;
    }
    let tourDetails = quotFormData.tourData;

    let vehicles = tourDetails.transportations;
    let tourItiDescription = vehicles.filter((vehicle) => {
      return (
        vehicle.startPointId === itineraryObject.quotItiPickupPtId &&
        vehicle.endPointId === itineraryObject.quotItiDropPtId
      );
    });
    if (tourItiDescription.length > 0) {
      setSelectedLocationDescription(
        tourItiDescription[0].tourItiDescription
          ? tourItiDescription[0].tourItiDescription
          : ""
      );
    }
  }, [itineraryObject.quotItiPickupPtId, itineraryObject.quotItiDropPtId]);
  return (
    <>
      <section
        id="steps-uid-0-p-0"
        role="tabpanel"
        aria-labelledby="steps-uid-0-h-0"
        className="body current"
        aria-hidden="false"
        style={{ left: "0px" }}
      >
        <h4 className="form-heading itinerary-form-heading">Itinerary</h4>

        <div className="form-group row border p-3">
          <div className="col-sm-4 mb-3">
            <label>Day</label>
            <input
              type="text"
              pattern="[0-9]*"
              className="form-control"
              value={itineraryObject.quotItiDay}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setItineraryObject((prevState) => ({
                    ...prevState,
                    quotItiDay: event.target.value,
                  }));
                  dispatch(setQuotationFormData("quotItiDay", newValue));
                }
              }}
              // onBlur={() => {
              //   simpleValidator.current.showMessageFor("quotItiDay");
              // }}
            />
            <>
              {simpleValidator.current.message(
                "quotItiDay",
                itineraryObject.quotItiDay,
                ["required"],
                {
                  messages: {
                    required: "Please enter day",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-4 mb-3">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Date"
              min={new Date().toISOString().split("T")[0]}
              value={itineraryObject.quotItiDate}
              onChange={(event) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  quotItiDate: event.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotItiDate", event.target.value)
                );
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Vehicle</label>
            <Select
              options={optionsObj.vehicleOptions}
              placeholder="Select Vehicle"
              value={
                itineraryObject.vehicleName
                  ? optionsObj.vehicleOptions.find(
                      (option) => option.label === itineraryObject.vehicleName
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  vehicleName: selectedOption ? selectedOption.label : "",
                  fkVehicleId: selectedOption ? selectedOption.value : null,
                }));
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>No of Vehicles</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter No of Vehicles"
              value={itineraryObject.quotItiNoOfVehicles}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setItineraryObject((prevState) => ({
                    ...prevState,
                    quotItiNoOfVehicles: event.target.value,
                  }));
                }
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Pick up point </label>
            <Select
              options={optionsObj.pickupPtOptions}
              placeholder="Select Pick up point"
              value={
                itineraryObject.pickupPt
                  ? optionsObj.pickupPtOptions.find(
                      (option) => option.label === itineraryObject.pickupPt
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  pickupPt: selectedOption ? selectedOption.label : "",
                  quotItiPickupPtId: selectedOption
                    ? selectedOption.value
                    : null,
                }));
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Drop point </label>
            <Select
              options={optionsObj.dropPtOptions}
              placeholder="Select Drop point"
              value={
                itineraryObject.dropPt
                  ? optionsObj.dropPtOptions.find(
                      (option) => option.label === itineraryObject.dropPt
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  dropPt: selectedOption ? selectedOption.label : "",
                  quotItiDropPtId: selectedOption ? selectedOption.value : null,
                }));
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Amount</label>
            <input
              type="text"
              pattern="[0-9]*"
              className="form-control"
              placeholder="Enter Amount"
              value={itineraryObject.quotItiAmount}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setItineraryObject((prevState) => ({
                    ...prevState,
                    quotItiAmount: event.target.value,
                  }));
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotItiAmount");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotItiAmount",
                itineraryObject.quotItiAmount,
                ["required"],
                {
                  messages: {
                    required: "Please enter amount",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-4 mb-3">
            <label>Description</label>
            <br></br>
            <span
              data-bs-toggle="modal"
              data-bs-target="#locationDescriptionModal"
              className="badge badge-outline-info mt-2"
            >
              View Description
            </span>
          </div>
        </div>
        {/* <div className="form-group row border p-3">
          {destFormValues.map((element, index) => (
            <>
              <div className="col-sm-4 mb-3">
                <label>Destination </label>
                <Select
                  options={optionsObj.destOptions}
                  placeholder="Select Destination"
                  value={
                    element.destinationName
                      ? optionsObj.destOptions.find(
                          (option) => option.value === element.destinationName
                        )
                      : null
                  }
                  onChange={(selectedOption) => {
                    const newFormValues = [...destFormValues];
                    newFormValues[index].destinationName = selectedOption
                      ? selectedOption.value
                      : "";
                    setDestFormValues(newFormValues);
                    getSetDescription(index, selectedOption.value);
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("dest_name");
                  }}
                />
              </div>
              <div className="col-sm-4 mb-3">
                <label>Description </label>
                <br></br>
                {element.destinationName && (
                  <>
                    <span
                      data-bs-toggle="modal"
                      data-bs-target="#locationDescriptionModal"
                      onClick={() =>
                        getSetDescription(index, element.destinationName)
                      }
                      className="badge badge-outline-info mt-2"
                    >
                      View Description
                    </span>
                  </>
                )}
                {!element.destinationName && (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Description"
                      readOnly
                      value={element.destinationDesc}
                      onChange={(e) => {
                        const newFormValues = [...formValues];
                        newFormValues[index].destinationDesc = e.target.value;
                        setFormValues(newFormValues);
                      }}
                    />
                  </>
                )}
              </div>
              <div className="col-sm-1 mb-3">
                <ion-icon
                  style={{ marginTop: "40%" }}
                  name="add-circle-outline"
                  color="success"
                  size="large"
                  onClick={() => addDestFormFields()}
                ></ion-icon>
                {index ? (
                  <ion-icon
                    style={{ marginTop: "40%" }}
                    name="close-circle-outline"
                    color="danger"
                    size="large"
                    onClick={() => removeDestFormFields(index)}
                  ></ion-icon>
                ) : null}
              </div>
            </>
          ))}
        </div> */}

        <h4 className=" form-heading itinerary-form-heading">
          Add On Services
        </h4>
        <div className="form-group row border p-3">
          {/* {addOnformValues && addOnformValues.length == 0 && 
          (
            <>
            <div className="col-sm-4 mb-3">
              <label>Service </label>
              <Select
                options={optionsObj.addOnServiceOptions}
                placeholder="Select Service"
                value={
                  element.quotItiService
                    ? optionsObj.addOnServiceOptions.find(
                        (option) => option.value === element.quotItiService
                      )
                    : null
                }
                onChange={(selectedOption) => {
                  const newFormValues = [...addOnformValues];
                  newFormValues[index].quotItiService = selectedOption
                    ? selectedOption.value
                    : "";
                  setAddOnFormValues(newFormValues);
                }}
              />
            </div>
            <div className="col-sm-4 mb-3">
              <label className=" col-form-label pb-0 mb-0">
                Service Payable
              </label>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`serviceRadio-${index}`}
                        id={`serviceRadio-${index}-1`}
                        value={1}
                        checked={element.quotItiServicePayable == "1"}
                        onChange={(e) => handleServicePayableChange(e, index)}
                      />
                      Inclusion
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`serviceRadio-${index}`}
                        id={`serviceRadio-${index}-2`}
                        value={2}
                        checked={element.quotItiServicePayable == "2"}
                        onChange={(e) => handleServicePayableChange(e, index)}
                      />
                      Exclusion
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {element.quotItiServicePayable == "1" && (
              <div className="col-sm-4 mb-3">
                <label>Amount </label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="form-control"
                  placeholder="Enter Amount"
                  value={element.quotItiServiceAmount}
                  onChange={(event) => {
                    const newValue = event.target.value.trim();
                    if (/^\d*$/.test(newValue)) {
                      const newFormValues = [...addOnformValues];
                      newFormValues[index].quotItiServiceAmount = newValue
                        ? newValue
                        : "";
                      setAddOnFormValues(newFormValues);
                    }
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor(
                      "quotItiServiceAmount"
                    );
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "quotItiAmount",
                    itineraryObject.quotItiAmount,
                    ["required"],
                    {
                      messages: {
                        required: "Please enter amount",
                      },
                    }
                  )}
                </>
              </div>
            )}

            <div className="col-sm-11 mb-3">
              <label>Remark </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                value={element.quotItiServiceRemark}
                onChange={(event) => {
                  const newValue = event.target.value;
                  const newFormValues = [...addOnformValues];
                  newFormValues[index].quotItiServiceRemark = newValue
                    ? newValue
                    : "";
                  setAddOnFormValues(newFormValues);
                }}
              />
            </div>

            <div className="col-sm-1 mb-3">
              <ion-icon
                style={{ marginTop: "40%" }}
                name="add-circle-outline"
                color="success"
                size="large"
                onClick={() => addAddOnServicesFormFields()}
              ></ion-icon>
              {index ? (
                <ion-icon
                  style={{ marginTop: "40%" }}
                  name="close-circle-outline"
                  color="danger"
                  size="large"
                  onClick={() => removeAddOnServicesFormFields(index)}
                ></ion-icon>
              ) : null}
            </div>
            <div className="col-sm-12 mb-3">
              <h1
                style={{
                  borderStyle: "double",
                  border: "1px dotted lightgrey",
                }}
              ></h1>
            </div>
          </>
          )
          } */}
          {addOnformValues.map((element, index) => (
            <>
              <div className="col-sm-4 mb-3">
                <label>Service </label>
                <Select
                  options={optionsObj.addOnServiceOptions}
                  placeholder="Select Service"
                  value={
                    element.quotItiService
                      ? optionsObj.addOnServiceOptions.find(
                          (option) => option.value === element.quotItiService
                        )
                      : null
                  }
                  onChange={(selectedOption) => {
                    const newFormValues = [...addOnformValues];
                    newFormValues[index].quotItiService = selectedOption
                      ? selectedOption.value
                      : "";
                    setAddOnFormValues(newFormValues);
                  }}
                />
              </div>
              <div className="col-sm-4 mb-3">
                <label className=" col-form-label pb-0 mb-0">
                  Service Payable
                </label>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`serviceRadio-${index}`}
                          id={`serviceRadio-${index}-1`}
                          value={1}
                          checked={element.quotItiServicePayable == "1"}
                          onChange={(e) => handleServicePayableChange(e, index)}
                        />
                        Inclusion
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`serviceRadio-${index}`}
                          id={`serviceRadio-${index}-2`}
                          value={2}
                          checked={element.quotItiServicePayable == "2"}
                          onChange={(e) => handleServicePayableChange(e, index)}
                        />
                        Exclusion
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {element.quotItiServicePayable == "1" && (
                <div className="col-sm-4 mb-3">
                  <label>Total Amount for Group</label>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={element.quotItiServiceAmount}
                    onChange={(event) => {
                      const newValue = event.target.value.trim();
                      if (/^\d*$/.test(newValue)) {
                        const newFormValues = [...addOnformValues];
                        newFormValues[index].quotItiServiceAmount = newValue
                          ? newValue
                          : "";
                        setAddOnFormValues(newFormValues);
                      }
                    }}
                    onBlur={() => {
                      simpleValidator.current.showMessageFor(
                        "quotItiServiceAmount"
                      );
                    }}
                  />
                  <>
                    {simpleValidator.current.message(
                      "quotItiAmount",
                      itineraryObject.quotItiAmount,
                      ["required"],
                      {
                        messages: {
                          required: "Please enter amount",
                        },
                      }
                    )}
                  </>
                </div>
              )}

              <div className="col-sm-10 mb-3">
                <label>Remark </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Remark"
                  value={element.quotItiServiceRemark}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    const newFormValues = [...addOnformValues];
                    newFormValues[index].quotItiServiceRemark = newValue
                      ? newValue
                      : "";
                    setAddOnFormValues(newFormValues);
                  }}
                />
              </div>

              <div className="col-sm-2 mb-3">
                <ion-icon
                  style={{ marginTop: "17%" }}
                  name="add-circle-outline"
                  color="success"
                  size="large"
                  title="Add"
                  onClick={() => addAddOnServicesFormFields()}
                ></ion-icon>

                {index ? (
                  <ion-icon
                    style={{ marginTop: "17%" }}
                    name="close-circle-outline"
                    color="danger"
                    size="large"
                    title="Remove"
                    onClick={() => removeAddOnServicesFormFields(index)}
                  ></ion-icon>
                ) : null}
                <ion-icon
                  name="refresh-outline"
                  color="tertiary"
                  size="large"
                  title="Clear"
                  onClick={() => resetAddOn(index)}
                ></ion-icon>
              </div>
              <div className="col-sm-12 mb-3">
                <h1
                  style={{
                    borderStyle: "double",
                    border: "1px dotted lightgrey",
                  }}
                ></h1>
              </div>
            </>
          ))}
        </div>
        {/* <div className="col-sm-12"> */}
        <button
          className="btn btn-success mr-3"
          onClick={() => {
            validateForm();
            {
              acionObj.updateId != null ? editItinerary() : addItinerary();
            }
          }}
        >
          {acionObj.updateId != null ? "Update" : "Add"}
        </button>
        {/* </div> */}
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
                  <div className="col-md-6 grid-margin stretch-card">
                    <div className="card info-card  border border-success box-shadow-none info-card-success">
                      <div className="card-body">
                        <div className="media">
                          <img src="../../images/money.png" alt="image" />{" "}
                          {/* <ion-icon
                            style={{ marginTop: "5px" }}
                            color="success"
                            name="cash-outline"
                            size="large"
                          ></ion-icon> */}
                          <div className="media-body ml-2">
                            <p
                              className="card-text"
                              style={{ marginBottom: 0 }}
                            >
                              Total Vehicle Amount :{" "}
                              <b> {getAmount("vehicle", "total")}</b>
                            </p>
                            <p className="card-text">
                              Total Add On Service Amount :{" "}
                              <b> {getAmount("addon", "total")}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 grid-margin stretch-card">
                    <div className="card info-card border border-success box-shadow-none info-card-success">
                      <div className="card-body">
                        <div className="media">
                          <img src="../../images/money.png" alt="image" />{" "}
                          {/* <ion-icon
                            style={{ marginTop: "5px" }}
                            color="success"
                            name="cash-outline"
                            size="large"
                          ></ion-icon> */}
                          <div className="media-body ml-2">
                            <p
                              className="card-text"
                              style={{ marginBottom: 0 }}
                            >
                              Per Person Vehicle Amount :{" "}
                              <b> {getAmount("vehicle", "pax")}</b>
                            </p>
                            <p className="card-text">
                              Per Person Add On Service Amount :{" "}
                              <b> {getAmount("addon", "pax")}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {itineraryData && itineraryData?.length > 0 && (
                  <div className="row dt-row">
                    <div className="col-sm-12">
                      <table
                        id="order-listing"
                        className="table dataTable no-footer"
                        aria-describedby="order-listing_info"
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "171.375px" }}>Day</th>
                            <th style={{ width: "171.375px" }}>Date</th>
                            <th style={{ width: "127.391px" }}>Vehicle</th>
                            <th style={{ width: "116.672px" }}>
                              Pick Up Point
                            </th>
                            <th style={{ width: "116.672px" }}>Drop Point</th>
                            <th style={{ width: "116.672px" }}>
                              No of Vehicles
                            </th>
                            <th style={{ width: "116.672px" }}>
                              Vehicle Amount
                            </th>
                            <th style={{ width: "116.672px" }}>
                              Add On Amount
                            </th>
                            <th style={{ width: "116.672px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itineraryData &&
                            itineraryData?.length > 0 &&
                            itineraryData.map((itineraryObj, index) => (
                              <tr className="odd" key={index}>
                                <td>{itineraryObj.quotItiDay}</td>
                                <td>
                                  {itineraryObj.quotItiDate
                                    ? itineraryObj.quotItiDate.split("T")[0]
                                    : "N.A"}
                                </td>
                                <td>{itineraryObj.vehicleName}</td>
                                <td>{itineraryObj.pickupPt}</td>
                                <td>{itineraryObj.dropPt}</td>
                                <td>{itineraryObj.quotItiNoOfVehicles}</td>
                                <td>{itineraryObj.quotItiAmount}</td>
                                <td>
                                  {getAddonAmount(itineraryObj.quotItiAddons)}
                                </td>

                                <td>
                                  <ion-icon
                                    name="create-outline"
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                    title="Edit"
                                    onClick={() => {
                                      setItineraryObject(itineraryObj);
                                      itineraryObj.quotItiAddons.length == 0
                                        ? setAddOnFormValues([
                                            {
                                              quotItiAddonId: null,
                                              quotItiService: "",
                                              quotItiServicePayable: "1",
                                              quotItiServiceAmount: "",
                                              quotItiServiceRemark: "",
                                            },
                                          ])
                                        : setAddOnFormValues(
                                            itineraryObj.quotItiAddons
                                          );

                                      setDestFormValues(
                                        itineraryObj.quotItiDestinations
                                      );
                                      setActionObj((prevState) => ({
                                        ...prevState,
                                        updateId: index,
                                      }));
                                      scrollToTop();
                                    }}
                                  ></ion-icon>
                                  {/* <ion-icon
                                    name="swap-horizontal-outline"
                                    color="tertiary"
                                    style={{ marginRight: "10px" }}
                                    title="Swap"
                                    onClick={() => handleShow(index)}
                                  ></ion-icon> */}
                                  <ion-icon
                                    name="trash-outline"
                                    color="danger"
                                    style={{ marginRight: "10px" }}
                                    title="Delete"
                                    onClick={() => {
                                      setShowConfirmation(true);
                                      setActionObj((prevState) => ({
                                        ...prevState,
                                        deleteId: index,
                                      }));
                                    }}
                                  ></ion-icon>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {itineraryData && itineraryData.length == 0 && (
                  <NoData></NoData>
                )}
                <ConfirmationDialog
                  message="Are you sure you want to delete?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  show={showConfirmation}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="locationDescriptionModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Description
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
                <div
                  style={{ maxHeight: "400px", overflowY: "scroll" }}
                  dangerouslySetInnerHTML={{
                    __html: selectedLocationDescription,
                  }}
                ></div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <SwapModal
          show={showSwapModal}
          handleClose={handleClose}
          handleSwap={handleSwap}
          preselectedDay={preselectedDay}
        />
      </section>
    </>
  );
};
export default ItineraryForm;
