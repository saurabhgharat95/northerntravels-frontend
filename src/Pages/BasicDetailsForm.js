import { useEffect, useState, useRef } from "react";
import {
  axios,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import {
  FETCH_TOURS_API,
  FETCH_TRANSIT_PT_BY_TOUR_API,
  FETCH_TOUR_DETAILS_API
} from "../utils/constants";
import makeAnimated from "react-select/animated";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";

const BasicDetailsForm = ({onValidationStatusChange}) => {
  const [optionsId, setOptionsId] = useState({
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
    quotPackage: "1",
    quotSeason: "1",
    quotClientName: "",
    quotMobileNo: "",
    quotWhatsAppNo: "",
    quotEmail: "",
    quotArrivalDate: "",
    quotDepartureDate: "",
    quotDays: 0,
    quotNights: 0,
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
  const quotFormData = useSelector((state) => state.form.quotationFormData);

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
              value: point.fkTransitPointId,
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
      quotPackage: value,
    }));
    dispatch(setQuotationFormData("quotPackage", value));
    setForceUpdate((v) => ++v);
  };
  const handleSeasonChange = (event) => {
    const value = event.target.value;
    setBasicDetailsObject((prevState) => ({
      ...prevState,
      quotSeason: value,
    }));
    setForceUpdate((v) => ++v);
    dispatch(setQuotationFormData("quotSeason", value));
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setBasicDetailsObject((prevState) => ({
        ...prevState,
        quotWhatsAppNo: prevState.quotMobileNo,
      }));
      dispatch(
        setQuotationFormData("quotWhatsAppNo", basicDetailsObject.quotMobileNo)
      );
    } else {
      setBasicDetailsObject((prevState) => ({
        ...prevState,
        quotWhatsAppNo: "",
      }));
    }
  };
  const fetchTourDetails = async (tourId) => {
    try {
      let url = FETCH_TOUR_DETAILS_API;
      let body = {
        id:tourId
      }
      let response = await axios.post(url,body);
      if (response) {
        if (response.status == 200) {
          let stateIds = []
          let states = response.data.data.states;
          states.forEach(state => {
            stateIds.push(state.fkLocationId)
          });
          dispatch(
            setQuotationFormData("stateIds", stateIds)
          );
          dispatch(
            setQuotationFormData("tourData", response.data.data)
          );
        }
      }
    } catch (e) {}
  }
  const validateForm = () => {
    const isValid = simpleValidator.current.allValid();
    if (isValid) {
      onValidationStatusChange(isValid,1); 
    }
    else{
      simpleValidator.current.showMessages();
      setForceUpdate(v=>++v)
    }
    return isValid;
  };
  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    fetchTransitPtsByTour();
  }, [optionsId.tourId]);

  useEffect(() => {
    if (
      basicDetailsObject.quotArrivalDate &&
      basicDetailsObject.quotDepartureDate
    ) {
      const arrival = new Date(basicDetailsObject.quotArrivalDate);
      const departure = new Date(basicDetailsObject.quotDepartureDate);
      if (departure >= arrival) {
        arrival.setHours(0, 0, 0, 0);
        departure.setHours(0, 0, 0, 0);

        const timeDiff = departure.getTime() - arrival.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        const nights = days - 1;
        setBasicDetailsObject((prevState) => ({
          ...prevState,
          quotDays: days,
          quotNights: nights,
        }));
        dispatch(setQuotationFormData("quotDays", days));
        dispatch(setQuotationFormData("quotNights", nights));
      }
    }
    setForceUpdate((v) => ++v);
  }, [
    basicDetailsObject.quotArrivalDate,
    basicDetailsObject.quotDepartureDate,
  ]);
  useEffect(() => {
    if (quotFormData) {
      console.log('quotFormDataquotFormData',quotFormData)
      setBasicDetailsObject((prevState) => ({
        ...prevState,
        quotPackage: quotFormData.quotPackage ? quotFormData.quotPackage:"1",
        quotSeason: quotFormData.quotSeason ? quotFormData.quotSeason:"1",
        quotClientName: quotFormData.quotClientName,
        quotMobileNo: quotFormData.quotMobileNo,
        quotWhatsAppNo: quotFormData.quotWhatsAppNo,
        quotEmail: quotFormData.quotEmail,
        quotArrivalDate: quotFormData.quotArrivalDate,
        quotDepartureDate: quotFormData.quotDepartureDate,
        quotDays: quotFormData.quotDays,
        quotNights: quotFormData.quotNights,
      }));
      setOptionsId((prevState) => ({
        ...prevState,
        tourId: quotFormData.fkTourId,
        startPtId: quotFormData.quotStartPointId,
        endPtId: quotFormData.quotEndPointId,
      }));
    }
  }, [quotFormData]);



  useEffect(() => {
    validateForm(); 
  }, [basicDetailsObject.quotArrivalDate,basicDetailsObject.quotDepartureDate]);
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
                      checked={basicDetailsObject.quotPackage == "1"}
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
                      checked={basicDetailsObject.quotPackage == "2"}
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
                      name="quotSeasonRadio"
                      id="quotSeasonRadio"
                      value={1}
                      checked={basicDetailsObject.quotSeason == "1"}
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
                      name="quotSeasonRadio"
                      id="quotSeasonRadio"
                      value={2}
                      checked={basicDetailsObject.quotSeason == "2"}
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
                dispatch(
                  setQuotationFormData("fkTourId", selectedOption.value)
                );
                fetchTourDetails(selectedOption.value)

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
              value={basicDetailsObject.quotClientName}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  quotClientName: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotClientName", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("client_name");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "client_name",
                  basicDetailsObject.quotClientName,
                  ["required", { regex: /^(?![\. ])[a-zA-Z\. ]+(?<! )$/ }],
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
              value={basicDetailsObject.quotMobileNo}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setBasicDetailsObject((prevState) => ({
                    ...prevState,
                    quotMobileNo: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotMobileNo", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotMobileNo");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotMobileNo",
                basicDetailsObject.quotMobileNo,
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
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter WhatsApp Number"
              maxLength="10"
              value={basicDetailsObject.quotWhatsAppNo}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setBasicDetailsObject((prevState) => ({
                    ...prevState,
                    quotWhatsAppNo: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotWhatsAppNo", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotWhatsAppNo");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotWhatsAppNo",
                basicDetailsObject.quotMobileNo,
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
                id="quotWhatsAppNo"
                name="quotWhatsAppNo"
                onChange={handleCheckboxChange}
              />
              <label for="quotWhatsAppNo" className="ml-1">
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
              value={basicDetailsObject.quotEmail}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  quotEmail: e.target.value,
                }));
                dispatch(setQuotationFormData("quotEmail", e.target.value));
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotEmail");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotEmail",
                  basicDetailsObject.quotEmail,
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
                  setQuotationFormData("quotStartPointId", selectedOption.value)
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
                dispatch(
                  setQuotationFormData("quotEndPointId", selectedOption.value)
                );
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
              value={basicDetailsObject.quotArrivalDate}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  quotArrivalDate: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotArrivalDate", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotArrivalDate");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotArrivalDate",
                  basicDetailsObject.quotArrivalDate,
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
              value={basicDetailsObject.quotDepartureDate}
              onChange={(e) => {
                setBasicDetailsObject((prevState) => ({
                  ...prevState,
                  quotDepartureDate: e.target.value,
                }));
                dispatch(
                  setQuotationFormData("quotDepartureDate", e.target.value)
                );
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotDepartureDate");
              }}
            />
            <>
              {simpleValidator.current.element.length > 0 &&
                simpleValidator.current.message(
                  "quotDepartureDate",
                  basicDetailsObject.quotDepartureDate,
                  "required|isDateAfter:" + basicDetailsObject.quotArrivalDate,

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
              value={basicDetailsObject.quotDays}
              readOnly
            />
          </div>
          <div className="col-sm-6">
            <label>Tour Duration Night</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Night Duration"
              value={basicDetailsObject.quotNights}
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
