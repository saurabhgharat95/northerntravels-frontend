import { useEffect, useState, useRef } from "react";

import {
  axios,
  toast,
  ToastContainer,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
const AddOnServicesForm = () => {
  const [formValues, setFormValues] = useState([{ serviceName: "" }]);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

  let addFormFields = () => {
    setFormValues([...formValues, { serviceName: "" }]);
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
  return (
    <>
      <h3>Add On Services</h3>
      <div className="form-group row">
        {formValues.map((element, index) => (
          <>
            <div className="col-sm-6 mb-3">
              <label>Service Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Service Name"
                value={element.serviceName}
                onChange={(e) => {
                  const newFormValues = [...formValues];
                  newFormValues[index].serviceName = e.target.value;
                  setFormValues(newFormValues);
                }}
                onBlur={() => {
                  simpleValidator.current.showMessageFor("service_name");
                }}
              />
                <>
                  {simpleValidator.current.element.length > 0 &&
                    simpleValidator.current.message(
                      "service_name",
                      element.serviceName,
                      ["required", { regex: /^[A-Za-z\s&-]+$/ }],
                      {
                        messages: {
                          required: "Please enter service name ",
                          regex: "Enter valid service name",
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
    </>
  );
};
export default AddOnServicesForm;
