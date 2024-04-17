import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import {
  FETCH_TOURS_API,
  FETCH_TRANSIT_PT_BY_TOUR_API,
} from "../utils/constants";
import makeAnimated from "react-select/animated";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";
const BasicDetailsForm = () => {
  const [optionsId, setOptionsId] = useState({
    countryId: 0,
    stateId: 0,
    locationId: 0,
    tourId: 0,
    startPtId: 0,
    endPtId: 0,
  });

  const [optionsObj, setOptionsObj] = useState({
    countryOptions: [],
    stateOptions: [],
    transitPtOptions: [],
    destOptions: [],
    tourOptions: [],
  });
  const [basicDetailsObject, setBasicDetailsObject] = useState({
    isDomestic: "1",
    season: "1",
    clientName: "",
    mobileNo: "",
    whatsappNo: "",
    email: "",
    arrivalDate: "",
    departureDate: "",
    tourDurationDay: 0,
    tourDurationNight: 0,
  });
  const [, setForceUpdate] = useState(0);
  const animatedComponents = makeAnimated();
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
      validators: {
        isDateAfter: {
          message: "Departure date should be greater than arrival date.",
          rule: (val, params, validator) => {
            return val >= params[0];
          },
        },
      },
    })
  );

  //redux
  const dispatch = useDispatch();
  const tourFormData = useSelector((state) => state.form.tourFormData);

  const fetchTours = async () => {
    try {
      let url = FETCH_TOURS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let tours = response.data.data;
          let tourOptionsArray = [];
          tours.forEach((tour) => {
            tourOptionsArray.push({
              value: tour.id,
              label: tour.tourName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            tourOptions: tourOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };

  const fetchTransitPtsByTour = async () => {
    try {
      let url = FETCH_TRANSIT_PT_BY_TOUR_API;
      let body = {
        id: optionsId.tourId ? optionsId.tourId : 0,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let transitPts = response.data.data;
          let transitPtOptionsArray = [];
          transitPts.forEach((point) => {
            transitPtOptionsArray.push({
              value: point.id,
              label: point.transitPoint.transitPointName,
            });
          });
          setOptionsObj((prevState) => ({
            ...prevState,
            transitPtOptions: transitPtOptionsArray,
          }));
        }
      }
    } catch (e) {}
  };
  const handlePackageChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setBasicDetailsObject((prevState) => ({
      ...prevState,
      isDomestic: value,
    }));
    setForceUpdate((v) => ++v);
  };
  const handleSeasonChange = (event) => {
    const value = event.target.value;
    setBasicDetailsObject((prevState) => ({
      ...prevState,
      season: value,
    }));
    setForceUpdate((v) => ++v);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setBasicDetailsObject((prevState) => ({
        ...prevState,
        whatsappNo: prevState.mobileNo,
      }));
    } else {
      setBasicDetailsObject((prevState) => ({
        ...prevState,
        whatsappNo: "",
      }));
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    fetchTransitPtsByTour();
  }, [optionsId.tourId]);

  useEffect(() => {
    if (basicDetailsObject.arrivalDate && basicDetailsObject.departureDate) {
      const arrival = new Date(basicDetailsObject.arrivalDate);
      const departure = new Date(basicDetailsObject.departureDate);
      if (departure >= arrival) {
        arrival.setHours(0, 0, 0, 0);
        departure.setHours(0, 0, 0, 0);

        const timeDiff = departure.getTime() - arrival.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        const nights = days - 1;
        setBasicDetailsObject((prevState) => ({
          ...prevState,
          tourDurationDay: days,
          tourDurationNight: nights,
        }));
      }
    }
    setForceUpdate((v) => ++v);

  }, [basicDetailsObject.arrivalDate, basicDetailsObject.departureDate]);
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
        <div className="row">
          <div className="form-group col-sm-6 mb-0">
            <label className="col-sm-2 col-form-label pl-0">Package</label>
            <div className="form-group row">
              <div className="col-sm-2">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="packageRadio"
                      id="packageRadio1"
                      value={1}
                      checked={basicDetailsObject.isDomestic == "1"}
                      onChange={handlePackageChange}
                    />
                    Domestic
                    <i className="input-helper"></i>
                  </label>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="packageRadio"
                      id="packageRadio2"
                      value={2}
                      checked={basicDetailsObject.isDomestic == "2"}
                      onChange={handlePackageChange}
                    />
                    International
                    <i className="input-helper"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-0">
            <label className="col-sm-2 col-form-label pl-0">Season</label>
            <div className="form-group row">
              <div className="col-sm-3">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="seasonRadio"
                      id="seasonRadio"
                      value={1}
                      checked={basicDetailsObject.season == "1"}
                      onChange={handleSeasonChange}
                    />
                    On Season
                    <i className="input-helper"></i>
                  </label>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="seasonRadio"
                      id="seasonRadio"
                      value={2}
                      checked={basicDetailsObject.season == "2"}
                      onChange={handleSeasonChange}
                    />
                    Off Season
                    <i className="input-helper"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <label>Tour</label>
            <Select
              options={optionsObj.tourOptions}
              placeholder="Select Tour"
              components={animatedComponents}
              value={
                optionsId.tourId
                  ? optionsObj.tourOptions.filter(
                      (option) => option.value === optionsId.tourId
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setOptionsId((prevState) => ({
                  ...prevState,
                  tourId: selectedOption ? selectedOption.value : null,
                }));
                dispatch(setQuotationFormData("tourId", selectedOption.value));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("tour_name");
              }}
            />
            <>
              {simpleValidator.current.message(
                "tour_name",
                optionsId.tourId,
                ["required"],
                {
                  messages: {
                    required: "Please select tour",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Client Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={basicDetailsObject.clientName}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  clientName: e.target.value,
                }));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("client_name");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "client_name",
                  basicDetailsObject.clientName,
                  ["required", { regex: /^[A-Za-z\s&-]+$/ }],
                  {
                    messages: {
                      required: "Please enter client name",
                      regex: "Enter valid client name",
                    },
                  }
                )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Mobile Number</label>
            <input
              type="text"
              pattern="[0-9]{10}"
              className="form-control"
              placeholder="Enter Mobile Number"
              maxLength="10"
              value={basicDetailsObject.mobileNo}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setBasicDetailsObject((prevState) => ({
                    ...prevState,
                    mobileNo: event.target.value,
                  }));
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("mobileNo");
              }}
            />
            <>
              {simpleValidator.current.message(
                "mobileNo",
                basicDetailsObject.mobileNo,
                ["required"],
                {
                  messages: {
                    required: "Please enter mobile number",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-6">
            <label>Whatsapp Number</label>
            <input
              type="text"
              pattern="[0-9]*"
              className="form-control"
              placeholder="Enter WhatsApp Number"
              maxLength="10"
              value={basicDetailsObject.whatsappNo}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setBasicDetailsObject((prevState) => ({
                    ...prevState,
                    whatsappNo: event.target.value,
                  }));
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("whatsappNo");
              }}
            />
            <>
              {simpleValidator.current.message(
                "whatsappNo",
                basicDetailsObject.mobileNo,
                ["required"],
                {
                  messages: {
                    required: "Please enter WhatsApp Number",
                  },
                }
              )}
            </>
            <div className="mt-1">
              <input
                type="checkbox"
                id="whatsappNo"
                name="whatsappNo"
                onChange={handleCheckboxChange}
              />
              <label for="whatsappNo" className="ml-1">
                {" "}
                Same as Mobile Number
              </label>
            </div>
          </div>
          <div className="col-sm-6">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={basicDetailsObject.email}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("email");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "email",
                  basicDetailsObject.email,
                  ["required", "email"],
                  {
                    messages: {
                      required: "Please enter client email",
                      email: "Enter valid client email",
                    },
                  }
                )}
            </>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <label>Start Point</label>
            <Select
              placeholder="Select Start Point"
              options={optionsObj.transitPtOptions}
              components={animatedComponents}
              value={
                optionsId.startPtId
                  ? optionsObj.transitPtOptions.filter(
                      (option) => option.value === optionsId.startPtId
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setOptionsId((prevState) => ({
                  ...prevState,
                  startPtId: selectedOption ? selectedOption.value : null,
                }));
                dispatch(
                  setQuotationFormData("startPtId", selectedOption.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("start_pt");
              }}
            />
            <>
              {simpleValidator.current.message(
                "start_pt",
                optionsId.startPtId,
                ["required"],
                {
                  messages: {
                    required: "Please select start point",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-6">
            <label>End Point</label>
            <Select
              placeholder="Select End Point"
              options={optionsObj.transitPtOptions}
              components={animatedComponents}
              value={
                optionsId.endPtId
                  ? optionsObj.transitPtOptions.filter(
                      (option) => option.value === optionsId.endPtId
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setOptionsId((prevState) => ({
                  ...prevState,
                  endPtId: selectedOption ? selectedOption.value : null,
                }));
                dispatch(setQuotationFormData("endPtId", selectedOption.value));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("end_pt");
              }}
            />
            <>
              {simpleValidator.current.message(
                "end_pt",
                optionsId.endPtId,
                ["required"],
                {
                  messages: {
                    required: "Please select end point",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Arrival Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Arrival Date"
              min={new Date().toISOString().split("T")[0]}
              value={basicDetailsObject.arrivalDate}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  arrivalDate: e.target.value,
                }));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("arrivalDate");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "arrivalDate",
                  basicDetailsObject.arrivalDate,
                  ["required"],
                  {
                    messages: {
                      required: "Please select arrival date",
                    },
                  }
                )}
            </>
          </div>
          <div className="col-sm-6">
            <label>Departure Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Departure Date"
              min={new Date().toISOString().split("T")[0]}
              value={basicDetailsObject.departureDate}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  departureDate: e.target.value,
                }));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("departureDate");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "departureDate",
                  basicDetailsObject.departureDate,
                  "required|isDateAfter:" + basicDetailsObject.arrivalDate,

                  {
                    messages: {
                      required: "Please select departure date",
                    },
                  }
                )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Tour Duration Day</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Day Duration"
              value={basicDetailsObject.tourDurationDay}
              readOnly
            />
          </div>
          <div className="col-sm-6">
            <label>Tour Duration Night</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Night Duration"
              value={basicDetailsObject.tourDurationNight}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row"></div>
        <div className="form-group row"></div>
        <div className="form-group row"></div>
      </section>
    </>
  );
};
export default BasicDetailsForm;
