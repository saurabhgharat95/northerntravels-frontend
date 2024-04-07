import { useEffect, useState, useRef } from "react";
import {
  axios,
  toast,
  ToastContainer,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import {
  FETCH_COUNTRY_API,
  FETCH_STATES_API,
  FETCH_TRANSIT_POINTS_API,
  ADD_TOUR_API,
  UPDATE_TOUR_API,
} from "../utils/constants";
import AddOnServicesForm from "./AddOnServicesForm";
import makeAnimated from "react-select/animated";
const BasicDetailsTourForm = () => {
  const [country, setCountry] = useState([]);
  const [tourName, setTourName] = useState("");
  const [stateId, setStateId] = useState(null);
  const [transitPtId, setTransitPtId] = useState([]);
  const [optionsObj, setOptionsObj] = useState({
    countryOptions: [],
    stateOptions: [],
    transitPtOptions: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [, setForceUpdate] = useState(0);
  const animatedComponents = makeAnimated();
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

  const fetchCountries = async () => {
    try {
      let url = FETCH_COUNTRY_API;

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
      console.log("response", response.data.data);
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
        }
      }
    } catch (e) {
      setDataReady(true);
      setTransitPts([]);
    }
  };
  const [formValues, setFormValues] = useState([
    { destinationName: "", destinationDesc: "" },
  ]);

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchTransitPts();
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
        <h3>Basic Details</h3>
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
                  ["required", { regex: /^[A-Za-z\s&-]+$/ }],
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
              options={optionsObj.countryOptions}
              placeholder="Select Country"
              value={
                country
                  ? optionsObj.countryOptions.find(
                      (option) => option.value === country
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setCountry(selectedOption ? selectedOption.value : null);
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
              options={optionsObj.stateOptions}
              placeholder="Select State"
              required
              name="state_name"
              value={
                stateId
                  ? optionsObj.stateOptions.find(
                      (option) => option.value === stateId
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setStateId(selectedOption ? selectedOption.value : "");
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
        <div className="form-group row">
          <div className="col-sm-6">
            <label className="mb-0">Transit Points</label>
            <br></br>
            <small className="text-primary mb-2">
              Note :- Select multiple start and end points
            </small>
            <br></br>

            <Select
              options={optionsObj.transitPtOptions}
              placeholder="Select Transit Points"
              required
              name="transit_pt"
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
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("transit_pt");
              }}
              isMulti
              components={animatedComponents}
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
        </div>
        <h4>Visiting Locations</h4>
        <br></br>

        <div className="form-group row ">
          {formValues.map((element, index) => (
            <>
              <div className="col-sm-6 mb-3">
                <label>Destination</label>
                <input
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
              <div className="col-sm-5 mb-3">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
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
        </div>
        <AddOnServicesForm />
      </section>
    </>
  );
};
export default BasicDetailsTourForm;
