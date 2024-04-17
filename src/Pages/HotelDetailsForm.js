import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import {
  FETCH_HALTING_POINTS_API,
  FETCH_HOTEL_TYPES_API,
  FETCH_HOTELS_API,
  FETCH_ROOM_TYPES_API,
  FETCH_MEAL_TYPES_API,
} from "../utils/constants";
import makeAnimated from "react-select/animated";
import NoData from "../components/NoData";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";
import { toTitleCase } from "../utils/helpers";
import ConfirmationDialog from "../components/ConfirmationDialog";

const HotelDetailsForm = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  const [optionsObj, setOptionsObj] = useState({
    haltingPtOptions: [],
    hotelTypeOptions: [],
    hotelOptions: [],
    mealTypeOptions: [],
    roomTypeOptions: [],
  });

  const colorIndex = ["secondary", "success", "warning", "info", "danger"];
  const [isPackageReadOnly, setPackageReadOnly] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [packageNameArray, setPackageNameArray] = useState([]);
  const [originalPackageData, setOriginalPackageData] = useState([]);
  const [packageObject, setPackageObject] = useState({
    packageName: "",
    haltingDest: "",
    hotelType: "",
    hotelName: "",
    fromDate: "",
    toDate: "",
    noOfNights: "",
    roomType: "",
    mealType: "",
  });

  const addPackage = () => {
    if (simpleValidator.current.allValid()) {
      setPackageData((prevState) => [...prevState, packageObject]);
      setOriginalPackageData((prevState) => [...prevState, packageObject]);
      setPackageObject((prevState) => ({
        ...prevState,
        haltingDest: null,
        hotelType: null,
        hotelName: null,
        fromDate: "",
        toDate: "",
        noOfNights: "",
        roomType: null,
        mealType: null,
      }));

      if (!packageNameArray.includes(packageObject.packageName)) {
        setPackageNameArray((prevArray) => [
          ...prevArray,
          packageObject.packageName,
        ]);
      }

      setPackageReadOnly(true);
    } else {
      setForceUpdate((v) => ++v);
      simpleValidator.current.showMessages();
    }
  };
  const editPackage = () => {
    if (simpleValidator.current.allValid()) {
      const updatedPackageData = [...packageData];
      updatedPackageData[updateId] = packageObject;

      setPackageData(updatedPackageData);
      setOriginalPackageData(updatedPackageData);

      if (!packageNameArray.includes(packageObject.packageName)) {
        setPackageNameArray((prevArray) => [
          ...prevArray,
          packageObject.packageName,
        ]);
      }

      setPackageObject((prevState) => ({
        ...prevState,
        haltingDest: null,
        hotelType: null,
        hotelName: null,
        fromDate: "",
        toDate: "",
        noOfNights: "",
        roomType: null,
        mealType: null,
      }));

      setPackageReadOnly(true);
    } else {
      setForceUpdate((v) => ++v);
      simpleValidator.current.showMessages();
    }
  };
  const addNewPackage = () => {
    setPackageReadOnly(false);
    setUpdateId(null)
    setPackageObject((prevState) => ({
      ...prevState,
      packageName: "",
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
            haltingPtOptionsArray.push({
              value: point.id,
              label: point.haltingPointName,
            });
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
            hotelOptionsArray.push({
              value: hotel.id,
              label: hotel.hotelName,
            });
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
    handleDelete(deleteId);
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
  useEffect(() => {
    fetchHaltingPoints();
    fetchHotelType();
    fetchHotels();
    fetchMealTypes();
    fetchRoomTypes();
  }, []);
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
        <h3>Hotel Details</h3>
        <br></br>
        <br></br>
        <br></br>
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
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    hotelType: event.label,
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
                        (option) => option.label === packageObject.hotelName
                      )
                    : null
                }
                placeholder="Select Hotel Name"
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    hotelName: event.label,
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
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    roomType: event.label,
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
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    mealType: event.label,
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
          {console.log('updateid',updateId)}
          <button
            className="btn btn-success mr-2"
            onClick={() => {
              {
                updateId != null ? editPackage() : addPackage();
              }
            }}
          >
            {updateId != null ? "Update" : "Add"}
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
        <h3>Package Details</h3>
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
                                  <td>{packageObj.fromDate}</td>
                                  <td>{packageObj.toDate}</td>
                                  <td>{packageObj.noOfNights}</td>
                                  <td>{packageObj.roomType}</td>
                                  <td>{packageObj.mealType}</td>

                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                      title="Delete"
                                      onClick={() => {
                                        setShowConfirmation(true);
                                        setDeleteId(index);
                                      }}
                                    ></ion-icon>

                                    <ion-icon
                                      name="create-outline"
                                      color="primary"
                                      style={{ marginRight: "10px" }}
                                      title="Edit"
                                      onClick={() => {
                                        setPackageObject(packageObj);
                                        setUpdateId(index);
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
          </>
        )}
        {packageData && packageData.length == 0 && <NoData></NoData>}
      </section>
    </>
  );
};
export default HotelDetailsForm;
