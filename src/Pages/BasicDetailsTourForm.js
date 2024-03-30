import { useState } from "react";
import Select from "react-select";
const BasicDetailsTourForm = () => {
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
  }
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
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Country</label>
            <Select options={options} placeholder="Select Country" />
          </div>
          <div className="col-sm-6">
            <label>State / Location</label>
            <Select options={options} placeholder="Select State / Location" />
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

            <Select options={options} placeholder="Select Transit Points" />
          </div>
        </div>
        <h4>Visiting Locations</h4>
        <br></br>
       
        <div className="form-group row">
        {formValues.map((element, index) => (
            <>
          <div className="col-sm-6 mb-3">
            <label>Destination</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Destination"
            />
          </div>
          <div className="col-sm-5 mb-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
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
            {
                index ? 
            <ion-icon
              style={{ marginTop: "40%" }}
              name="close-circle-outline"
              color="danger"
              size="large"
              onClick={() => removeFormFields(index)}
            ></ion-icon>
            : null
        }
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
export default BasicDetailsTourForm;
