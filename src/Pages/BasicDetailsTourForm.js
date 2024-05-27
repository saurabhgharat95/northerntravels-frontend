import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import {
  FETCH_COUNTRIES_API,
  FETCH_STATES_API,
  FETCH_TRANSIT_POINTS_API,
  FETCH_LOCATIONS_API,
  FETCH_STATES_BY_COUNTRY_API,
} from "../utils/constants";
import AddOnServicesForm from "./AddOnServicesForm";
import makeAnimated from "react-select/animated";

// redux
import { useDispatch, useSelector } from "react-redux";
import { resetFormData, setTourFormData } from "../utils/store";
import { getFilteredDropdownOptions } from "../utils/helpers";
const BasicDetailsTourForm = () => {
  const [country, setCountry] = useState([]);
  const [locations, setLocations] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [transitPtList, setTransitPtList] = useState([]);
  const [selectedLocationDescription, setSelectedLocationDescription] =
    useState("");
  const [tourName, setTourName] = useState("");
  const [stateId, setStateId] = useState(null);
  const [transitPtId, setTransitPtId] = useState(null);
  const [optionsObj, setOptionsObj] = useState({
    countryOptions: [],
    stateOptions: [],
    transitPtOptions: [],
    destOptions: [],
  });
  const [isDataReady, setDataReady] = useState(false);
  const [, setForceUpdate] = useState(0);
  const animatedComponents = makeAnimated();
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

  //redux
  const dispatch = useDispatch();
  const tourFormData = useSelector((state) => state.form.tourFormData);

  const fetchCountries = async () => {
    try {
      let url = FETCH_COUNTRIES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let countries = response.data.data;
          let countryOptionsArray = [];
          countries.forEach((country) => {
            countryOptionsArray.push({
              value: country.id,
              label: country.countryName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            countryOptions: countryOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const fetchStates = async () => {
    try {
      let url = FETCH_STATES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let states = response.data.data;
          let stateOptionsArray = [];
          states.forEach((state) => {
            stateOptionsArray.push({
              value: state.id,
              label: state.stateName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            stateOptions: stateOptionsArray,
          }));
          setStatesList(states);
        }
      }
    } catch (e) {}
  };
  const fetchTransitPts = async () => {
    try {
      let url = FETCH_TRANSIT_POINTS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let trasitPts = response.data.data;

          let trasitPtsOptionsArray = [];
          trasitPts.forEach((trasitPt) => {
            trasitPtsOptionsArray.push({
              value: trasitPt.id,
              label: trasitPt.transitPointName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            transitPtOptions: trasitPtsOptionsArray,
          }));
          setTransitPtList(trasitPts);
        }
      }
    } catch (e) {
      setDataReady(true);
    }
  };
  const fetchLocations = async () => {
    try {
      let url = FETCH_LOCATIONS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let locations = response.data.data;
          let locationOptionsArray = [];
          locations.forEach((location) => {
            locationOptionsArray.push({
              value: location.id,
              label: location.locationName,
            });
          });
          setLocations(locations);
          setOptionsObj((prevState) => ({
            ...prevState,
            destOptions: locationOptionsArray,
          }));
        }
      }
    } catch (e) {
      setDataReady(true);
    }
  };
  const [formValues, setFormValues] = useState([
    { destinationName: "", destinationDesc: "" },
  ]);

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { destinationName: "", destinationDesc: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    dispatch(
      setTourFormData(
        "locationIds",
        newFormValues.map(({ destinationName }) => destinationName)
      )
    );
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  const getSetDescription = (index, locationId) => {
    let destObj = locations.filter((location) => {
      return location.id == locationId;
    });
    const newFormValues = [...formValues];

    newFormValues[index].destinationDesc = destObj[0].locationDescription;
    setSelectedLocationDescription(destObj[0].locationDescription);
    setFormValues(newFormValues);
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
  const fetchStatesByCountry = async () => {
    try {
      let url = FETCH_STATES_BY_COUNTRY_API;
      let body = {
        countryIds: country ? country.join(",") : "",
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let states = response.data.data;
          let stateOptionsArray = [];
          states.forEach((state) => {
            stateOptionsArray.push({
              value: state.id,
              label: state.stateName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            stateOptions: stateOptionsArray,
          }));
          setStatesList(states);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchTransitPts();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchStatesByCountry();
  }, [country]);
  useEffect(() => {
    let filteredTransitPoints = getFilteredDropdownOptions(
      stateId,
      transitPtList,
      "state"
    );
    let transitPointsOptionsArray = [];
    filteredTransitPoints.forEach((point) => {
      transitPointsOptionsArray.push({
        value: point.id,
        label: point.transitPointName,
      });
    });
    setOptionsObj((prevState) => ({
      ...prevState,
      transitPtOptions: transitPointsOptionsArray,
    }));
  }, [stateId]);
  useEffect(() => {
    if (tourFormData) {
      setTourName(tourFormData.tourName);
      setCountry(
        tourFormData.countryIds != ""
          ? ( Array.isArray(tourFormData.countryIds) ? tourFormData.countryIds : tourFormData.countryIds.split(",").map(Number))
          : null
      );
      setStateId(
        tourFormData.stateIds != ""
          ? ( Array.isArray(tourFormData.stateIds) ? tourFormData.stateIds : tourFormData.stateIds.split(",").map(Number))
          : null
      );
      setTransitPtId(
        tourFormData.transitPointIds != ""
          ? ( Array.isArray(tourFormData.transitPointIds) ? tourFormData.transitPointIds : tourFormData.transitPointIds.split(",").map(Number))
          : null
      );
      
     

      // let destinations = tourFormData.locationIds;

      // if (destinations) {
      //   let destFormValues = [];

      //   for (let index = 0; index < destinations.length; index++) {
      //     destFormValues.push({
      //       destinationName: destinations[index],
      //       destinationDesc: "",
      //     });
      //   }
      //   setFormValues(destFormValues);
      // }
    }
  }, [tourFormData]);

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
        <h4>Basic Details</h4>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Tour Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tour Name"
              value={tourName}
              onChange={(e) => {
                setTourName(e.target.value);
                dispatch(setTourFormData("tourName", e.target.value));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("tour_name");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "tour_name",
                  tourName,
                  ["required", { regex: /^[A-Za-z0-9\s&-()]+$/ }],
                  {
                    messages: {
                      required: "Please enter tour name ",
                      regex: "Enter valid tour name",
                    },
                  }
                )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Country</label>
            <Select
              classNamePrefix="an-simple-select"
              options={optionsObj.countryOptions}
              placeholder="Select Country"
              isMulti
              components={animatedComponents}
              value={
                country
                  ? optionsObj.countryOptions.filter((option) =>
                      country.includes(option.value)
                    )
                  : null
              }
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setCountry(selectedIds);
                dispatch(setTourFormData("countryIds", selectedIds.join(",")));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("country_name");
              }}
            />
            <>
              {simpleValidator.current.message(
                "country_name",
                country,
                ["required"],
                {
                  messages: {
                    required: "Please select country",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-6">
            <label>State / Location</label>
            <Select
              classNamePrefix="an-simple-select"
              options={optionsObj.stateOptions}
              placeholder="Select State"
              required
              isMulti
              components={animatedComponents}
              name="state_name"
              value={
                stateId
                  ? optionsObj.stateOptions.filter((option) =>
                      stateId.includes(option.value)
                    )
                  : null
              }
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setStateId(selectedIds);
                dispatch(setTourFormData("stateIds", selectedIds.join(",")));
                
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("state_name");
              }}
            />
            <>
              {simpleValidator.current.message(
                "state_name",
                stateId,
                ["required"],
                {
                  messages: {
                    required: "Please select state",
                  },
                }
              )}
            </>
          </div>
        </div>
        {/* <div className="form-group row">
          <div className="col-sm-6">
            <label className="mb-0">Transit Points</label>
            <br></br>
            <small className="text-primary mb-2">
              Note :- Select multiple start and end points
            </small>
            <br></br>
            <Select
              classNamePrefix="an-simple-select"
              options={optionsObj.transitPtOptions}
              placeholder="Select Transit Points"
              required
              name="transit_pt"
              isMulti
              components={animatedComponents}
              value={
                transitPtId
                  ? optionsObj.transitPtOptions.filter((option) =>
                      transitPtId.includes(option.value)
                    )
                  : null
              }
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setTransitPtId(selectedIds);
                dispatch(
                  setTourFormData("transitPointIds", selectedIds.join(","))
                );
                
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("transit_pt");
              }}
            />
            <>
              {simpleValidator.current.message(
                "transit_pt",
                transitPtId,
                ["required"],
                {
                  messages: {
                    required: "Please select transit point",
                  },
                }
              )}
            </>
          </div>
        </div> */}
        {/* <h4>Visiting Locations</h4>
        <br></br>

        <div className="form-group row ">
          {formValues.map((element, index) => (
            <>
              <div className="col-sm-6 mb-3" key={index}>
                <label>Destination</label>
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
                    const newFormValues = [...formValues];
                    newFormValues[index].destinationName = selectedOption
                      ? selectedOption.value
                      : "";
                    setFormValues(newFormValues);
                    getSetDescription(index, selectedOption.value);
                    dispatch(
                      setTourFormData(
                        "locationIds",
                        newFormValues.map(
                          ({ destinationName }) => destinationName
                        )
                      )
                    );
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("dest_name");
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "dest_name",
                    element.destinationName,
                    ["required"],
                    {
                      messages: {
                        required: "Please select vehicle",
                      },
                    }
                  )}
                </>
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Destination"
                  value={element.destinationName}
                  onChange={(e) => {
                    const newFormValues = [...formValues];
                    newFormValues[index].destinationName = e.target.value;
                    setFormValues(newFormValues);
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("dest");
                  }}
                />
                <>
                  {simpleValidator.current.element.length > 0 &&
                    simpleValidator.current.message(
                      "dest",
                      element.destinationName,
                      ["required", { regex: /^[A-Za-z\s&-]+$/ }],
                      {
                        messages: {
                          required: "Please enter destination ",
                          regex: "Enter valid destination ",
                        },
                      }
                    )}
                </> 
              </div>
              <div className="col-sm-5 mb-3" key={index}>
                <label>Description</label>
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
                {/* <div style={{maxHeight:"400px",overflowY:"scroll"}}
                                      dangerouslySetInnerHTML={{
                                        __html: element.destinationDesc,
                                      }}
                                    ></div> 
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
                      onBlur={() => {
                        simpleValidator.current.showMessageFor("dest_desc");
                      }}
                    />
                    <>
                      {simpleValidator.current.element.length > 0 &&
                        simpleValidator.current.message(
                          "dest_desc",
                          element.destinationDesc,
                          ["required", { regex: /^[A-Za-z\s&-]+$/ }],
                          {
                            messages: {
                              required: "Please enter destination description ",
                              regex: "Enter valid destination description",
                            },
                          }
                        )}
                    </>
                  </>
                )}
              </div>
              <div className="col-sm-1 mb-3">
                <ion-icon
                  style={{ marginTop: "40%" }}
                  name="add-circle-outline"
                  color="success"
                  size="large"
                  onClick={() => addFormFields()}
                ></ion-icon>
                {index ? (
                  <ion-icon
                    style={{ marginTop: "40%" }}
                    name="close-circle-outline"
                    color="danger"
                    size="large"
                    onClick={() => removeFormFields(index)}
                  ></ion-icon>
                ) : null}
              </div>
              <br></br>
              <br></br>
            </>
          ))}
        </div> */}
        <AddOnServicesForm />
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
export default BasicDetailsTourForm;
