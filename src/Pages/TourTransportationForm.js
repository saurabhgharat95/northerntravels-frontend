import { useState } from "react";
import Select from "react-select";

const TourTransportationForm = () => {
  const options = [
    { value: "1", label: "Jammu & Kashmir Tour" },
    { value: "2", label: "Andaman Tour" },
    { value: "3", label: "North Tour" },
  ];
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

        {/* <div className="form-group row"> */}
        {formValues.map((element, index) => (
          <>
            <div className="form-group row mb-0">
              <div className="col-sm-6 mb-3">
                <label>Vehicle</label>

                <Select options={options} placeholder="Select Vehicle" />
              </div>
              </div>
              <div className="form-group row">
              <div className="col-sm-6 mb-3">
                <label>Start Point</label>
                <Select options={options} placeholder="Select Start Point" />
              </div>
              <div className="col-sm-6 mb-3">
                <label>End Point</label>
                <Select options={options} placeholder="Select Start Point" />
              </div>
              <div className="col-sm-6 mb-3">
                <label>On Season Charge</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter On Season Charge"
                />
              </div>
              <div className="col-sm-5 mb-3">
                <label>Off Season Charge</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Off Season Charge"
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
            </div>
            <h1 style={{borderStyle: "double",border:"1px dotted lightgrey"}}></h1>
            <br></br>

          </>
        ))}
        {/* </div> */}
      </section>
    </>
  );
};
export default TourTransportationForm;
