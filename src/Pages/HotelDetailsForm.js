import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
  toast,
  ToastContainer,
} from "../components/CommonImport";
import {
  FETCH_HALTING_POINTS_API,
  FETCH_HOTEL_TYPES_API,
  FETCH_HOTELS_API,
  FETCH_ROOM_TYPES_API,
  FETCH_MEAL_TYPES_API,
} from "../utils/constants";
import NoData from "../components/NoData";
import "react-toastify/dist/ReactToastify.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";

import { toTitleCase,getDateFormattedForTable } from "../utils/helpers";
import ConfirmationDialog from "../components/ConfirmationDialog";

const HotelDetailsForm = ({ onValidationStatusChange }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [acionObj, setActionObj] = useState({ deleteId: null, updateId: null });
  const [, setForceUpdate] = useState(0);
  const [optionsObj, setOptionsObj] = useState({
    haltingPtOptions: [],
    hotelTypeOptions: [],
    hotelOptions: [],
    mealTypeOptions: [],
    roomTypeOptions: [],
  });

  //redux
  const dispatch = useDispatch();
  const quotFormData = useSelector((state) => state.form.quotationFormData);

  const colorIndex = ["secondary", "success", "warning", "info", "danger"];
  const [isPackageReadOnly, setPackageReadOnly] = useState(false);
  const [isNewPackage, setIsNewPackage] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [packageNameArray, setPackageNameArray] = useState([]);
  const [originalPackageData, setOriginalPackageData] = useState([]);
  const [packageObject, setPackageObject] = useState({
    quotHotelId: null,
    packageName: "",
    haltingDest: "",
    hotelType: "",
    hotelName: "",
    fromDate: "",
    toDate: "",
    noOfNights: "",
    roomType: "",
    mealType: "",
    haltingDestId: "",
    hotelTypeId: "",
    hotelId: "",
    roomTypeId: "",
    mealTypeId: "",
  });

  const addPackage = () => {
    if (simpleValidator.current.allValid()) {
      let quotDays = quotFormData.quotDays ? Number(quotFormData.quotDays) : 0;
      let packageNoOfNights = packageObject.noOfNights
        ? Number(packageObject.noOfNights)
        : 0;
      if (packageNoOfNights > quotDays) {
        toast.error("No of nights cannot exceed tour days", {
          position: "top-right",
        });
      } else {
        if (isNewPackage) {
          if (!packageNameArray.includes(packageObject.packageName)) {
            setPackageData((prevState) => [...prevState, packageObject]);
            setOriginalPackageData((prevState) => [
              ...prevState,
              packageObject,
            ]);
            setPackageObject((prevState) => ({
              ...prevState,
              quotHotelId: null,
              haltingDest: null,
              hotelType: null,
              hotelName: null,
              fromDate: "",
              toDate: "",
              noOfNights: "",
              roomType: null,
              mealType: null,
              haltingDestId: "",
              hotelTypeId: "",
              hotelId: "",
              roomTypeId: "",
              mealTypeId: "",
            }));

            if (!packageNameArray.includes(packageObject.packageName)) {
              setPackageNameArray((prevArray) => [
                ...prevArray,
                packageObject.packageName,
              ]);

              dispatch(
                setQuotationFormData("quotPackageNameArray", [
                  ...quotFormData.quotPackageNameArray,
                  packageObject.packageName,
                ])
              );
              dispatch(
                setQuotationFormData("quotPackageData", [
                  ...quotFormData.quotPackageData,
                  packageObject,
                ])
              );
              dispatch(setQuotationFormData("quotPackageReadOnly", true));
              setPackageReadOnly(true);
              setIsNewPackage(false);
            }
          } else {
            toast.error("Package name already exists", {
              position: "top-right",
            });
          }
        } else {
          setPackageData((prevState) => [...prevState, packageObject]);
          setOriginalPackageData((prevState) => [...prevState, packageObject]);
          setPackageObject((prevState) => ({
            ...prevState,
            quotHotelId: null,
            haltingDest: null,
            hotelType: null,
            hotelName: null,
            fromDate: "",
            toDate: "",
            noOfNights: "",
            roomType: null,
            mealType: null,
            haltingDestId: "",
            hotelTypeId: "",
            hotelId: "",
            roomTypeId: "",
            mealTypeId: "",
          }));

          if (!packageNameArray.includes(packageObject.packageName)) {
            setPackageNameArray((prevArray) => [
              ...prevArray,
              packageObject.packageName,
            ]);

            dispatch(
              setQuotationFormData("quotPackageNameArray", [
                ...quotFormData.quotPackageNameArray,
                packageObject.packageName,
              ])
            );
          }
          dispatch(
            setQuotationFormData("quotPackageData", [
              ...quotFormData.quotPackageData,
              packageObject,
            ])
          );
          dispatch(setQuotationFormData("quotPackageReadOnly", true));
          setPackageReadOnly(true);
          setIsNewPackage(false);
        }
      }
    } else {
      setForceUpdate((v) => ++v);
      simpleValidator.current.showMessages();
    }
  };
  const editPackage = () => {
    if (simpleValidator.current.allValid()) {
      let quotDays = quotFormData.quotDays ? Number(quotFormData.quotDays) : 0;
      let packageNoOfNights = packageObject.noOfNights
        ? Number(packageObject.noOfNights)
        : 0;
      if (packageNoOfNights > quotDays) {
        toast.error("No of nights cannot exceed tour days", {
          position: "top-right",
        });
      } else {
        if (isNewPackage) {
          if (!packageNameArray.includes(packageObject.packageName)) {
            const updatedPackageData = [...packageData];
            updatedPackageData[acionObj.updateId] = packageObject;

            setPackageData(updatedPackageData);
            setOriginalPackageData(updatedPackageData);
            dispatch(
              setQuotationFormData("quotPackageData", updatedPackageData)
            );

            if (!packageNameArray.includes(packageObject.packageName)) {
              setPackageNameArray((prevArray) => [
                ...prevArray,
                packageObject.packageName,
              ]);
              dispatch(
                setQuotationFormData("quotPackageNameArray", [
                  ...quotFormData.quotPackageNameArray,
                  packageObject.packageName,
                ])
              );
            }

            setPackageObject((prevState) => ({
              ...prevState,
              quotHotelId: null,
              haltingDest: null,
              hotelType: null,
              hotelName: null,
              fromDate: "",
              toDate: "",
              noOfNights: "",
              roomType: null,
              mealType: null,
              haltingDestId: "",
              hotelTypeId: "",
              hotelId: "",
              roomTypeId: "",
              mealTypeId: "",
            }));
            dispatch(setQuotationFormData("quotPackageReadOnly", true));
            setPackageReadOnly(true);
            setActionObj((prevState) => ({ ...prevState, updateId: null }));
            setIsNewPackage(false);
          } else {
            toast.error("Package name already exists", {
              position: "top-right",
            });
          }
        } else {
          const updatedPackageData = [...packageData];
          updatedPackageData[acionObj.updateId] = packageObject;

          setPackageData(updatedPackageData);
          setOriginalPackageData(updatedPackageData);
          dispatch(setQuotationFormData("quotPackageData", updatedPackageData));

          if (!packageNameArray.includes(packageObject.packageName)) {
            setPackageNameArray((prevArray) => [
              ...prevArray,
              packageObject.packageName,
            ]);
            dispatch(
              setQuotationFormData("quotPackageNameArray", [
                ...quotFormData.quotPackageNameArray,
                packageObject.packageName,
              ])
            );
          }

          setPackageObject((prevState) => ({
            ...prevState,
            quotHotelId: null,
            haltingDest: null,
            hotelType: null,
            hotelName: null,
            fromDate: "",
            toDate: "",
            noOfNights: "",
            roomType: null,
            mealType: null,
            haltingDestId: "",
            hotelTypeId: "",
            hotelId: "",
            roomTypeId: "",
            mealTypeId: "",
          }));
          dispatch(setQuotationFormData("quotPackageReadOnly", true));
          setPackageReadOnly(true);
          setActionObj((prevState) => ({ ...prevState, updateId: null }));
          setIsNewPackage(false);
        }
      }
    } else {
      setForceUpdate((v) => ++v);
      simpleValidator.current.showMessages();
    }
  };
  const addNewPackage = () => {
    dispatch(setQuotationFormData("quotPackageReadOnly", false));
    setPackageReadOnly(false);
    setActionObj((prevState) => ({ ...prevState, updateId: null }));
    setIsNewPackage(true);
    setPackageObject((prevState) => ({
      ...prevState,
      quotHotelId: null,
      packageName: "",
      haltingDest: null,
      hotelType: null,
      hotelName: null,
      fromDate: "",
      toDate: "",
      noOfNights: "",
      roomType: null,
      mealType: null,
      haltingDestId: "",
      hotelTypeId: "",
      hotelId: "",
      roomTypeId: "",
      mealTypeId: "",
    }));
  };

  const filterPackage = (packageName) => {
    setPackageData(originalPackageData);
    const filteredPackageObj = originalPackageData.filter((pckg) => {
      return pckg.packageName === packageName;
    });
    setPackageData(filteredPackageObj);
  };
  const clearFilter = () => {
    setPackageData(originalPackageData);
  };

  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
      validators: {
        isDateAfter: {
          message: "To date should be greater than from date.",
          rule: (val, params, validator) => {
            return val >= params[0];
          },
        },
      },
    })
  );

  const fetchHaltingPoints = async () => {
    try {
      let url = FETCH_HALTING_POINTS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let haltingPts = response.data.data;
          let haltingPtOptionsArray = [];
          haltingPts.forEach((point) => {
            if (quotFormData.stateIds.length > 0) {
              if (quotFormData.stateIds.includes(point.fkStateId)) {
                haltingPtOptionsArray.push({
                  value: point.id,
                  label: point.haltingPointName,
                });
              }
            }
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            haltingPtOptions: haltingPtOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchHotelType = async () => {
    try {
      let url = FETCH_HOTEL_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let hotelTypes = response.data.data;
          let hotelTypeOptionsArray = [];
          hotelTypes.forEach((type) => {
            hotelTypeOptionsArray.push({
              value: type.id,
              label: type.hotelTypeName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            hotelTypeOptions: hotelTypeOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchHotels = async () => {
    try {
      let url = FETCH_HOTELS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let hotels = response.data.data;
          let hotelOptionsArray = [];
          hotels.forEach((hotel) => {
            if (
              packageObject.haltingDestId == hotel.fkHaltingPointId &&
              packageObject.hotelTypeId == hotel.fkHotelTypeId
            ) {
              hotelOptionsArray.push({
                value: hotel.id,
                label: `${hotel.hotelName}${
                  hotel.isSpecialRate == 1 ? " ⭐" : ""
                }`,
                isDisabled: hotel.hasCharges == false ? true : false,
              });
            }
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            hotelOptions: hotelOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchMealTypes = async () => {
    try {
      let url = FETCH_MEAL_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let mealTypes = response.data.data;
          let mealTypesOptionsArray = [];
          mealTypes.forEach((type) => {
            mealTypesOptionsArray.push({
              value: type.id,
              label: type.mealTypeName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            mealTypeOptions: mealTypesOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchRoomTypes = async () => {
    try {
      let url = FETCH_ROOM_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let roomTypes = response.data.data;
          let roomTypeOptionsArray = [];
          roomTypes.forEach((roomType) => {
            roomTypeOptionsArray.push({
              value: roomType.id,
              label: roomType.roomTypeName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            roomTypeOptions: roomTypeOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const handleConfirm = () => {
    handleDelete(acionObj.deleteId);
    setShowConfirmation(false);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };
  const handleDelete = (index) => {
    const updatedPackageData = packageData.filter((_, i) => i !== index);
    const deletedPackage = packageData.filter((_, i) => i == index);
    const updatedArray = packageNameArray.filter(
      (item) => item !== deletedPackage[0].packageName
    );
    setPackageNameArray(updatedArray);
    setPackageData(updatedPackageData);
    setOriginalPackageData(updatedPackageData);
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
      onValidationStatusChange(isValid, 3);
    } else {
      simpleValidator.current.showMessages();
      setForceUpdate((v) => ++v);
    }
    return isValid;
  };
  useEffect(() => {
    if (packageObject.fromDate && packageObject.toDate) {
      const fromDate = new Date(packageObject.fromDate);
      const toDate = new Date(packageObject.toDate);
      if (toDate >= fromDate) {
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);

        const timeDiff = toDate.getTime() - fromDate.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        const nights = days - 1;
        setPackageObject((prevState) => ({
          ...prevState,
          noOfNights: nights,
        }));
      }
    }
    setForceUpdate((v) => ++v);
  }, [packageObject.fromDate, packageObject.toDate]);
  useEffect(() => {
    fetchHaltingPoints();
    fetchHotelType();
    fetchHotels();
    fetchMealTypes();
    fetchRoomTypes();
  }, []);
  useEffect(() => {
    if (quotFormData) {
      let quotPackage = quotFormData.quotPackageData;
      if (quotFormData.quotArrivalDate && quotFormData.quotArrivalDate != "") {
        setPackageObject((prevState) => ({
          ...prevState,
          fromDate: quotFormData.quotArrivalDate,
          toDate: quotFormData.quotArrivalDate,
        }));
      }
      let quotPackageArray = [];
      for (let index = 0; index < quotPackage.length; index++) {
        quotPackageArray.push({
          packageName: quotPackage[index].packageName,
          haltingDest: quotPackage[index].haltingDest,
          hotelType: quotPackage[index].hotelType,
          hotelName: quotPackage[index].hotelName,
          fromDate: quotPackage[index].fromDate,
          toDate: quotPackage[index].toDate,
          noOfNights: quotPackage[index].noOfNights,
          roomType: quotPackage[index].roomType,
          mealType: quotPackage[index].mealType,
          haltingDestId: quotPackage[index].haltingDestId,
          hotelTypeId: quotPackage[index].hotelTypeId,
          hotelId: quotPackage[index].hotelId,
          roomTypeId: quotPackage[index].roomTypeId,
          mealTypeId: quotPackage[index].mealTypeId,
          quotHotelId: quotPackage[index].quotHotelId,
        });
      }

      setPackageData(quotPackageArray);
      setOriginalPackageData(quotPackageArray);
      setPackageNameArray(quotFormData.quotPackageNameArray);
      setPackageReadOnly(quotFormData.quotPackageReadOnly);
      setForceUpdate((v) => ++v);
      if (quotFormData.quotPackageReadOnly) {
        let lastElement = quotPackageArray[quotPackageArray.length - 1];
        setPackageObject((prevState) => ({
          ...prevState,
          packageName: lastElement.packageName,
        }));
      }
    }
  }, [quotFormData]);

  useEffect(() => {
    fetchHotels();
  }, [packageObject.haltingDestId, packageObject.hotelTypeId]);
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
        <h4 className="form-heading">Hotel Details</h4>

        <form>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>Package Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Package Name"
                value={packageObject.packageName}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    packageName: event.target.value,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("package_name");
                }}
                disabled={isPackageReadOnly}
              />
              <>
                {simpleValidator.current.element.length > 0 &&
                  simpleValidator.current.message(
                    "package_name",
                    packageObject.packageName,
                    ["required", { regex: /^[A-Za-z\s&\-()*:"',.]+$/ }],
                    {
                      messages: {
                        required: "Please enter package name",
                        regex: "Enter valid package name",
                      },
                    }
                  )}
              </>
            </div>
            <div className="col-sm-6">
              <label>Halting Destination</label>
              <Select
                options={optionsObj.haltingPtOptions}
                placeholder="Select Halting Destination"
                value={
                  packageObject.haltingDest
                    ? optionsObj.haltingPtOptions.find(
                        (option) => option.label === packageObject.haltingDest
                      )
                    : null
                }
                onChange={(selectedOption) => {
                  setPackageObject((prevState) => ({
                    ...prevState,
                    haltingDest: selectedOption ? selectedOption.label : null,
                    haltingDestId: selectedOption ? selectedOption.value : null,
                  }));
                }}
                onBlur={() => {
                  simpleValidator.current.showMessageFor("haltingDest");
                }}
              />
              <>
                {simpleValidator.current.message(
                  "haltingDest",
                  packageObject.haltingDest,
                  ["required"],
                  {
                    messages: {
                      required: "Please select halting destination",
                    },
                  }
                )}
              </>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <label>Hotel Type</label>
              <Select
                options={optionsObj.hotelTypeOptions}
                placeholder="Select Hotel Type"
                value={
                  packageObject.hotelType
                    ? optionsObj.hotelTypeOptions.find(
                        (option) => option.label === packageObject.hotelType
                      )
                    : null
                }
                onChange={(selectedOption) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    hotelType: selectedOption ? selectedOption.label : "",
                    hotelTypeId: selectedOption ? selectedOption.value : null,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("hotelType");
                }}
              />
              <>
                {simpleValidator.current.message(
                  "hotelType",
                  packageObject.hotelType,
                  ["required"],
                  {
                    messages: {
                      required: "Please select hotel type ",
                    },
                  }
                )}
              </>
            </div>
            <div className="col-sm-6">
              <label>Hotel Name</label>
              <Select
                options={optionsObj.hotelOptions}
                value={
                  packageObject.hotelName
                    ? optionsObj.hotelOptions.find(
                        (option) =>
                          option.label === packageObject.hotelName ||
                          option.label === packageObject.hotelName + " ⭐"
                      )
                    : null
                }
                placeholder="Select Hotel Name"
                onChange={(selectedOption) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    hotelName: selectedOption ? selectedOption.label : "",
                    hotelId: selectedOption ? selectedOption.value : null,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("hotelName");
                }}
              />
              <>
                {simpleValidator.current.message(
                  "hotelName",
                  packageObject.hotelName,
                  ["required"],
                  {
                    messages: {
                      required: "Please select hotel name",
                    },
                  }
                )}
              </>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select From Date"
                min={new Date().toISOString().split("T")[0]}
                value={packageObject.fromDate}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    fromDate: event.target.value,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("fromDate");
                }}
              />
              <>
                {simpleValidator.current.element.length > 0 &&
                  simpleValidator.current.message(
                    "fromDate",
                    packageObject.fromDate,
                    ["required"],
                    {
                      messages: {
                        required: "Please select from  date",
                      },
                    }
                  )}
              </>
            </div>
            <div className="col-sm-6">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select To Date"
                min={new Date().toISOString().split("T")[0]}
                value={packageObject.toDate}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    toDate: event.target.value,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("toDate");
                }}
              />
              <>
                {simpleValidator.current.element.length > 0 &&
                  simpleValidator.current.message(
                    "toDate",
                    packageObject.toDate,
                    "required|isDateAfter:" + packageObject.fromDate,

                    {
                      messages: {
                        required: "Please select to date",
                      },
                    }
                  )}
              </>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>Number of Nights</label>
              <input
                type="text"
                pattern="[0-9]+"
                className="form-control"
                placeholder="Enter Number of Nights"
                readOnly
                value={packageObject.noOfNights}
                onChange={(event) => {
                  const newValue = event.target.value.trim();
                  if (/^\d*$/.test(newValue)) {
                    setPackageObject((prevState) => ({
                      ...prevState,
                      noOfNights: event.target.value,
                    }));
                  }
                }}
                onBlur={() => {
                  simpleValidator.current.showMessageFor("noOfNights");
                }}
              />
              <>
                {simpleValidator.current.message(
                  "noOfNights",
                  packageObject.noOfNights,
                  ["required"],
                  {
                    messages: {
                      required: "Please enter number of nights",
                    },
                  }
                )}
              </>
            </div>
            <div className="col-sm-6">
              <label>Room Type</label>
              <Select
                options={optionsObj.roomTypeOptions}
                value={
                  packageObject.roomType
                    ? optionsObj.roomTypeOptions.find(
                        (option) => option.label === packageObject.roomType
                      )
                    : null
                }
                placeholder="Select Room Type"
                onChange={(selectedOption) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    roomType: selectedOption ? selectedOption.label : "",
                    roomTypeId: selectedOption ? selectedOption.value : null,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("roomType");
                }}
              />
              <>
                {simpleValidator.current.message(
                  "roomType",
                  packageObject.roomType,
                  ["required"],
                  {
                    messages: {
                      required: "Please select room type",
                    },
                  }
                )}
              </>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>Meal Type</label>
              <Select
                options={optionsObj.mealTypeOptions}
                value={
                  packageObject.mealType
                    ? optionsObj.mealTypeOptions.find(
                        (option) => option.label === packageObject.mealType
                      )
                    : null
                }
                placeholder="Select Meal Type"
                onChange={(selectedOption) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    mealType: selectedOption ? selectedOption.label : "",
                    mealTypeId: selectedOption ? selectedOption.value : null,
                  }))
                }
                onBlur={() => {
                  simpleValidator.current.showMessageFor("mealType");
                }}
              />
              <>
                {simpleValidator.current.message(
                  "mealType",
                  packageObject.mealType,
                  ["required"],
                  {
                    messages: {
                      required: "Please select meal type",
                    },
                  }
                )}
              </>
            </div>
          </div>
        </form>
        <div className="actions clearfix">
          <button
            className="btn btn-success mr-2"
            onClick={() => {
              validateForm();
              {
                acionObj.updateId != null ? editPackage() : addPackage();
              }
            }}
          >
            {acionObj.updateId != null ? "Update" : "Add"}
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              addNewPackage();
            }}
          >
            New Package
          </button>
        </div>
        <br></br>
        <br></br>
        <h4>Package Details</h4>
        {packageData && packageData?.length > 0 && (
          <>
            <div className="text-center">
              <span
                className={`badge border border-primary text-primary mr-2`}
                onClick={() => clearFilter()}
              >
                All
              </span>
              {packageNameArray.map((packageName, index) => (
                <span
                  className={`badge border border-${colorIndex[index]} text-${colorIndex[index]} mr-2`}
                  onClick={() => filterPackage(packageName)}
                >
                  {toTitleCase(packageName)}
                </span>
              ))}
            </div>

            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <div
                    id="order-listing_wrapper"
                    className="dataTables_wrapper dt-bootstrap5 no-footer"
                  >
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
                              <th style={{ width: "171.375px" }}>
                                Package Name
                              </th>
                              <th style={{ width: "127.391px" }}>
                                Halt Destination
                              </th>
                              <th style={{ width: "116.672px" }}>Hotel</th>
                              <th style={{ width: "116.672px" }}>From Date</th>
                              <th style={{ width: "116.672px" }}>To Date</th>
                              <th style={{ width: "116.672px" }}>
                                No. of Nights
                              </th>
                              <th style={{ width: "116.672px" }}>Room Type</th>
                              <th style={{ width: "116.672px" }}>Meal Type</th>
                              <th style={{ width: "116.672px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {packageData &&
                              packageData?.length > 0 &&
                              packageData.map((packageObj, index) => (
                                <tr className="odd" key={index}>
                                  <td className="sorting_1">{index + 1}</td>
                                  <td>{toTitleCase(packageObj.packageName)}</td>
                                  <td>{packageObj.haltingDest}</td>
                                  <td>{packageObj.hotelName}</td>
                                  <td>{getDateFormattedForTable(packageObj.fromDate)}</td>
                                  <td>{getDateFormattedForTable(packageObj.toDate)}</td>
                                  <td>{packageObj.noOfNights}</td>
                                  <td>{packageObj.roomType}</td>
                                  <td>{packageObj.mealType}</td>

                                  <td>
                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                      style={{ marginRight: "10px" }}
                                      title="Edit"
                                      onClick={() => {
                                        setPackageObject(packageObj);
                                        setActionObj((prevState) => ({
                                          ...prevState,
                                          updateId: index,
                                        }));
                                        scrollToTop();
                                      }}
                                    ></ion-icon>
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
                  </div>
                </div>
              </div>
            </div>
            <ConfirmationDialog
              message="Are you sure you want to delete?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              show={showConfirmation}
            />
            {/* <ToastContainer
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
            /> */}
          </>
        )}
        {packageData && packageData.length == 0 && <NoData></NoData>}
      </section>
    </>
  );
};
export default HotelDetailsForm;
