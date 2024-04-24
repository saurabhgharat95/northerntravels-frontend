import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import NoData from "../components/NoData";
import {
  FETCH_VEHICLES_API,
  FETCH_TRANSIT_PT_BY_TOUR_API,
  FETCH_TOUR_DETAILS_API,
  FETCH_LOCATIONS_API,
} from "../utils/constants";
import ConfirmationDialog from "../components/ConfirmationDialog";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";

const ItineraryForm = ({ onValidationStatusChange }) => {
  const [locations, setLocations] = useState([]);
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
  });

  const [optionsObj, setOptionsObj] = useState({
    vehicleOptions: [],
    transitPtOptions: [],
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
      quotItiServicePayable: "",
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
        quotItiServicePayable: "",
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
  const addItinerary = () => {
    if (simpleValidator.current.allValid()) {
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
        quotItiDay: prevState.quotItiDay + 1,
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
      }));
      setDestFormValues([{ destinationName: "", destinationDesc: "" }]);
      setAddOnFormValues([
        {
          quotItiAddonId: null,
          quotItiService: "",
          quotItiServicePayable: "",
          quotItiServiceAmount: "",
          quotItiServiceRemark: "",
        },
      ]);
      setActionObj((prevState) => ({ ...prevState, updateId: null }));
    } else {
      setForceUpdate((v) => ++v);
      simpleValidator.current.showMessages();
    }
  };
  const editItinerary = () => {
    if (simpleValidator.current.allValid()) {
      itineraryObject.quotItiAddons = addOnformValues;
      itineraryObject.quotItiDestinations = destFormValues;
      const updatedItineraryData = [...itineraryData];
      updatedItineraryData[acionObj.updateId] = itineraryObject;
      setItineraryData(updatedItineraryData);
      setOriginalItineraryData(updatedItineraryData);
      dispatch(setQuotationFormData("quotItineraryData", updatedItineraryData));
      setItineraryObject((prevState) => ({
        ...prevState,
        quotItiId: null,
        quotItiDay: prevState.quotItiDay + 1,
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
      }));
      setDestFormValues([{ destinationName: "", destinationDesc: "" }]);
      setAddOnFormValues([
        {
          quotItiAddonId: null,
          quotItiService: "",
          quotItiServicePayable: "",
          quotItiServiceAmount: "",
          quotItiServiceRemark: "",
        },
      ]);
      setActionObj((prevState) => ({ ...prevState, updateId: null }));
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
    console.log("addon", addOnformValues);
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
    console.log("isValid", simpleValidator.current.errorMessages);
    if (isValid) {
      onValidationStatusChange(isValid, 4);
    } else {
      simpleValidator.current.showMessages();
      setForceUpdate((v) => ++v);
    }
    return isValid;
  };

  useEffect(() => {
    if (quotFormData) {
      let tourDetails = quotFormData.tourData;
      let vehiclesOptionsArray = [];
      let vehicles = tourDetails.transportations;
      if (vehicles && vehicles.length > 0) {
        vehicles.forEach((vehicle) => {
          vehiclesOptionsArray.push({
            value: vehicle.fkVehicleId,
            label: vehicle.vehicle.vehicleName,
          });
        });
        setOptionsObj((prevState) => ({
          ...prevState,
          vehicleOptions: vehiclesOptionsArray,
        }));
      }

      let transitPtOptionsArray = [];
      let transitPoints = tourDetails.transitPoints;

      if (transitPoints && transitPoints.length > 0) {
        transitPoints.forEach((point) => {
          transitPtOptionsArray.push({
            value: point.fkTransitPointId,
            label: point.transitPoint.transitPointName,
          });
        });
        setOptionsObj((prevState) => ({
          ...prevState,
          transitPtOptions: transitPtOptionsArray,
        }));
      }
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
          quotItiAddons: quotItineraryData[index].quotItiAddons,
          quotItiDestinations: quotItineraryData[index].quotItiDestinations,
        });
      }
      setItineraryData(quotItineraryArray);
      setOriginalItineraryData(quotItineraryArray);
    }
  }, [quotFormData]);
  // useEffect(()=>{
  //   transitPoints.forEach((point) => {
  //     transitPtOptionsArray.push({
  //       value: point.fkTransitPointId,
  //       label: point.transitPoint.transitPointName,
  //     });
  //   });
  //   setOptionsObj((prevState) => ({
  //     ...prevState,
  //     transitPtOptions: transitPtOptionsArray,
  //   }));
  // },[itineraryObject.fkVehicleId])
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
        <h3>Itinerary</h3>
        <br></br>
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
              options={optionsObj.transitPtOptions}
              placeholder="Select Pick up point"
              value={
                itineraryObject.pickupPt
                  ? optionsObj.transitPtOptions.find(
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
              options={optionsObj.transitPtOptions}
              placeholder="Select Drop point"
              value={
                itineraryObject.dropPt
                  ? optionsObj.transitPtOptions.find(
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
        </div>
        <div className="form-group row border p-3">
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
        </div>
        <div className="col-sm-12 mb-3">
          <br></br>

          <h4>Add On Services</h4>
        </div>
        <div className="form-group row border p-3">
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
                        Free
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
                        Payable
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
                        : "0";
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
                    "quotItiServiceAmount",
                    element.quotItiServiceAmount,
                    ["required"],
                    {
                      messages: {
                        required: "Please enter amount",
                      },
                    }
                  )}
                </>
              </div>
              <div className="col-sm-11 mb-3">
                <label>Remark </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Remark"
                  value={element.quotItiServiceRemark}
                  onChange={(event) => {
                    const newValue = event.target.value.trim();
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
          ))}
        </div>
        <div className="col-sm-12">
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
        </div>
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
                  <div className="col-sm-12 col-md-6">
                    <div
                      className="dataTables_length"
                      id="order-listing_length"
                    >
                      <label>
                        Show{" "}
                        <select
                          name="order-listing_length"
                          aria-controls="order-listing"
                          className="form-select form-select-sm"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </select>{" "}
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div
                      id="order-listing_filter"
                      className="dataTables_filter"
                    >
                      <label>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-controls="order-listing"
                        />
                      </label>
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
                            <th style={{ width: "107.016px" }}>Sr. No.</th>
                            <th style={{ width: "171.375px" }}>Day</th>
                            <th style={{ width: "127.391px" }}>Vehicle</th>
                            <th style={{ width: "116.672px" }}>
                              Pick Up Point
                            </th>
                            <th style={{ width: "116.672px" }}>Drop Point</th>
                            <th style={{ width: "116.672px" }}>
                              No of Vehicles
                            </th>

                            <th style={{ width: "116.672px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itineraryData &&
                            itineraryData?.length > 0 &&
                            itineraryData.map((itineraryObj, index) => (
                              <tr className="odd" key={index}>
                                <td className="sorting_1">{index + 1}</td>
                                <td>{itineraryObj.quotItiDay}</td>
                                <td>{itineraryObj.vehicleName}</td>
                                <td>{itineraryObj.pickupPt}</td>
                                <td>{itineraryObj.dropPt}</td>
                                <td>{itineraryObj.quotItiNoOfVehicles}</td>

                                <td>
                                  <ion-icon
                                    name="create-outline"
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                    title="Edit"
                                    onClick={() => {
                                      setItineraryObject(itineraryObj);
                                      setAddOnFormValues(
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
      </section>
    </>
  );
};
export default ItineraryForm;
