import { useEffect, useState, useRef } from "react";
import { SimpleReactValidator } from "../components/CommonImport";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";

const AccommodationDetailsForm = ({ onValidationStatusChange }) => {
  const [accommodationObject, setAccommodationObject] = useState({
    quotTotalPeoples: "",
    quotRoomsReqd: "",
    quotChildAbove9: "",
    quotChildBtwn8And9: "",
    quotBlw5: "",
  });
  const [, setForceUpdate] = useState(0);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  //redux
  const dispatch = useDispatch();
  const quotFormData = useSelector((state) => state.form.quotationFormData);

  const validateForm = () => {
    const isValid = simpleValidator.current.allValid();
    if (isValid) {
      onValidationStatusChange(isValid, 2);
    } else {
      simpleValidator.current.showMessages();
      setForceUpdate((v) => ++v);
    }
    return isValid;
  };
  useEffect(() => {
    validateForm();
  }, [accommodationObject]);
  useEffect(() => {
    if (quotFormData) {
      setAccommodationObject((prevState) => ({
        ...prevState,
        quotTotalPeoples: quotFormData.quotTotalPeoples,
        quotRoomsReqd: quotFormData.quotRoomsReqd,
        quotChildAbove9: quotFormData.quotChildAbove9,
        quotChildBtwn8And9: quotFormData.quotChildBtwn8And9,
        quotBlw5: quotFormData.quotBlw5,
      }));
    }
  }, [quotFormData]);
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
        <h3>Accommodation Details</h3>
        <br></br>
        <br></br>
        <br></br>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Total Number of People</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Total No. of People"
              value={accommodationObject.quotTotalPeoples}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotTotalPeoples: newValue,
                  }));
                  dispatch(setQuotationFormData("quotTotalPeoples", newValue));
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotTotalPeoples");
              }}
            />

            <>
              {simpleValidator.current.message(
                "quotTotalPeoples",
                accommodationObject.quotTotalPeoples,
                ["required"],
                {
                  messages: {
                    required: "Please enter total number of people",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Room Required</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter No. of Rooms Required"
              value={accommodationObject.quotRoomsReqd}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotRoomsReqd: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotRoomsReqd", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotRoomsReqd");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotRoomsReqd",
                accommodationObject.quotRoomsReqd,
                ["required"],
                {
                  messages: {
                    required: "Please enter total rooms required",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Children Above 9 years ( Extra bed required )</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              value={accommodationObject.quotChildAbove9}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotChildAbove9: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotChildAbove9", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotChildAbove9");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotChildAbove9",
                accommodationObject.quotChildAbove9,
                ["required"],
                {
                  messages: {
                    required: "Please enter childrens above 9 years",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Children between 6 - 8 years</label>
            <small> ( No extra bed )</small>
            <br></br>

            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              value={accommodationObject.quotChildBtwn8And9}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotChildBtwn8And9: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData(
                      "quotChildBtwn8And9",
                      event.target.value
                    )
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotChildBtwn8And9");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotChildBtwn8And9",
                accommodationObject.quotChildBtwn8And9,
                ["required"],
                {
                  messages: {
                    required: "Please enter childrens between age 6 and 8",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label> Children below 5 years</label>
            <small>( Free )</small>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              value={accommodationObject.quotBlw5}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotBlw5: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotBlw5", event.target.value)
                  );
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotBlw5");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotBlw5",
                accommodationObject.quotBlw5,
                ["required"],
                {
                  messages: {
                    required: "Please enter children below age 5",
                  },
                }
              )}
            </>
          </div>
        </div>
      </section>
    </>
  );
};
export default AccommodationDetailsForm;
