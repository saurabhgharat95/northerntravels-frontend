import { useState } from "react";

const AddOnServicesForm = () => {
  const [formValues, setFormValues] = useState([
    { destinationName: "", destinationDesc: "" },
  ]);

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
      <section
        id="steps-uid-0-p-0"
        role="tabpanel"
        aria-labelledby="steps-uid-0-h-0"
        className="body current"
        aria-hidden="false"
        style={{ left: "0px" }}
      >
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
                />
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
      </section>
    </>
  );
};
export default AddOnServicesForm;
