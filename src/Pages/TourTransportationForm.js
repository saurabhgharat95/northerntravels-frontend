import { useEffect, useState, useRef } from "react";
import {
  axios,
  toast,
  ToastContainer,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import {
  FETCH_VEHICLES_API,
  FETCH_TRANSIT_POINTS_API,
  ADD_TOUR_API,
  UPDATE_TOUR_API,
} from "../utils/constants";
const TourTransportationForm = () => {
  const [optionsObj, setOptionsObj] = useState({
    vehicleOptions: [],
    transitPtOptions: [],
  });
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (e) {}
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
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const [formValues, setFormValues] = useState([
    {
      vehicleName: "",
      startPt: "",
      endPt: "",
      onSeasonCharge: 0,
      offSeasonCharge: 0,
    },
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
    fetchTransitPts();
    fetchVehicles();
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
        <h3>Transportation </h3>

        {formValues.map((element, index) => (
          <>
            <div className="form-group row mb-0">
              <div className="col-sm-6 mb-3">
                <label>Vehicle</label>

                <Select
                  options={optionsObj.vehicleOptions}
                  placeholder="Select Vehicle"
                  value={
                    element.vehicleName
                      ? optionsObj.vehicleOptions.find(
                          (option) => option.value === element.vehicleName
                        )
                      : null
                  }
                  onChange={(selectedOption) => {
                    const newFormValues = [...formValues];
                    newFormValues[index].vehicleName = selectedOption
                      ? selectedOption.value
                      : "";
                    setFormValues(newFormValues);
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("vehicle_name");
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "vehicle_name",
                    element.vehicleName,
                    ["required"],
                    {
                      messages: {
                        required: "Please select vehicle",
                      },
                    }
                  )}
                </>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3">
                <label>Start Point</label>
                <Select
                  options={optionsObj.transitPtOptions}
                  placeholder="Select Start Point"
                  value={
                    element.startPt
                      ? optionsObj.transitPtOptions.find(
                          (option) => option.value === element.startPt
                        )
                      : null
                  }
                  onChange={(selectedOption) => {
                    const newFormValues = [...formValues];
                    newFormValues[index].startPt = selectedOption
                      ? selectedOption.value
                      : "";
                    setFormValues(newFormValues);
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("start_pt");
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "start_pt",
                    element.startPt,
                    ["required"],
                    {
                      messages: {
                        required: "Please select start point",
                      },
                    }
                  )}
                </>
              </div>
              <div className="col-sm-6 mb-3">
                <label>End Point</label>
                <Select
                  options={optionsObj.transitPtOptions}
                  placeholder="Select Start Point"
                  value={
                    element.endPt
                      ? optionsObj.transitPtOptions.find((option) => option.value === element.endPt)
                      : null
                  }
                  onChange={(selectedOption) => {
                    const newFormValues = [...formValues];
                    newFormValues[index].endPt = selectedOption
                      ? selectedOption.value
                      : "";
                    setFormValues(newFormValues);
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("end_pt");
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "end_pt",
                    element.endPt,
                    ["required"],
                    {
                      messages: {
                        required: "Please select end point",
                      },
                    }
                  )}
                </>
              </div>
              <div className="col-sm-6 mb-3">
                <label>On Season Charge</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="form-control"
                  placeholder="Enter On Season Charge"
                  value={element.onSeasonCharge}
                  onChange={(e) => {
                    const newFormValues = [...formValues];
                    const newValue = e.target.value.trim();
                    if (/^\d*$/.test(newValue)) {
                      newFormValues[index].onSeasonCharge = e.target.value;
                      setFormValues(newFormValues);
                    }
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("on_season_charge");
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "on_season_charge",
                    element.onSeasonCharge,
                    ["required"],
                    {
                      messages: {
                        required: "Please enter on season charge",
                      },
                    }
                  )}
                </>
              </div>
              <div className="col-sm-5 mb-3">
                <label>Off Season Charge</label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  className="form-control"
                  placeholder="Enter Off Season Charge"
                  value={element.offSeasonCharge}
                  onChange={(e) => {
                    const newFormValues = [...formValues];
                    const newValue = e.target.value.trim();
                    if (/^\d*$/.test(newValue)) {
                      newFormValues[index].offSeasonCharge = e.target.value;
                      setFormValues(newFormValues);
                    }
                  }}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("off_season_charge");
                  }}
                />
                <>
                  {simpleValidator.current.message(
                    "off_season_charge",
                    element.offSeasonCharge,
                    ["required"],
                    {
                      messages: {
                        required: "Please enter off season charge",
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
            </div>
            <h1
              style={{ borderStyle: "double", border: "1px dotted lightgrey" }}
            ></h1>
            <br></br>
          </>
        ))}
      </section>
    </>
  );
};
export default TourTransportationForm;
