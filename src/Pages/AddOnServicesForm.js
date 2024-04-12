import { useState, useRef,useEffect } from "react";

import { SimpleReactValidator } from "../components/CommonImport";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setTourFormData } from "../utils/store";
const AddOnServicesForm = () => {
  const [addOnFormValues, setAddOnFormValues] = useState([{ serviceName: "" }]);

  const dispatch = useDispatch();
  const tourFormData = useSelector((state) => state.form.tourFormData);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );

  let addFormFields = () => {
    setAddOnFormValues([...addOnFormValues, { serviceName: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...addOnFormValues];
    newFormValues.splice(i, 1);
    setAddOnFormValues(newFormValues);
    dispatch(setTourFormData("tourAddOnServices", newFormValues));
  };

  useEffect(() => {
    let addOnServices = tourFormData.tourAddOnServices;
    if (addOnServices) {
      let addOnServicesValues = [];

      for (let index = 0; index < addOnServices.length; index++) {
        addOnServicesValues.push({
          serviceName: addOnServices[index].serviceName,
        });
      }
      setAddOnFormValues(addOnServicesValues);

    }
  }, [tourFormData]);
  return (
    <>
      <h3>Add On Services</h3>
      <div className="form-group row">
        {addOnFormValues.map((element, index) => (
          <>
            <div className="col-sm-6 mb-3" key={index}>
              <label>Service Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Service Name"
                value={element.serviceName}
                onChange={(e) => {
                  const newFormValues = [...addOnFormValues];
                  newFormValues[index].serviceName = e.target.value;
                  setAddOnFormValues(newFormValues);
                  dispatch(setTourFormData("tourAddOnServices", newFormValues));
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
