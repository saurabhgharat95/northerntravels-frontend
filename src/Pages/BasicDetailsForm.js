import Select from "react-select";

const BasicDetailsForm = () => {
  const options = [
    { value: "1", label: "Jammu & Kashmir Tour" },
    { value: "2", label: "Andaman Tour" },
    { value: "3", label: "North Tour" },
  ];

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
                      id="packageRadio"
                      value="1"
                      checked
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
                      id="packageRadio"
                      value="2"
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
                      value="1"
                      checked
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
                      value="2"
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
            <Select options={options} placeholder="Select Tour" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Client Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Mobile Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="col-sm-6">
            <label>Whatsapp Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Whatsapp Number"
            />
            <div className="mt-1">
            <input type="checkbox" id="whatsappNo" name="whatsappNo" value="isSame" />
            <label for="whatsappNo" className="ml-1"> Same as Mobile Number</label>
            </div>
            
          </div>
          <div className="col-sm-6">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
        </div>

       
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Start Point</label>
            <Select options={options} placeholder="Select Start Point" />
          </div>
          <div className="col-sm-6">
            <label>End Point</label>
            <Select options={options} placeholder="Select End Point" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Arrival Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Arrival Date"
            />
          </div>
          <div className="col-sm-6">
            <label>Departure Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Departure Date"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Tour Duration Day</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Day Duration"
            />
          </div>
          <div className="col-sm-6">
            <label>Tour Duration Night</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Night Duration"
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
