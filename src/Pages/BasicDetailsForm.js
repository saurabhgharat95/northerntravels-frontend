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
        class="body current"
        aria-hidden="false"
        style={{ left: "0px" }}
      >
        <h3>Basic Details</h3>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Package</label>
          <br></br>
          <div class="col-sm-2">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="membershipRadios"
                  id="membershipRadios1"
                  value="1"
                  checked
                />
                Domestic
                <i class="input-helper"></i>
              </label>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="membershipRadios"
                  id="membershipRadios2"
                  value="2"
                />
                International
                <i class="input-helper"></i>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Tour</label>
            <Select options={options} placeholder="Select Tour" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Client Name</label>
            <input type="text" class="form-control" placeholder="Enter Name" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Mobile Number</label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div class="col-sm-6">
            <label>Email</label>
            <input type="text" class="form-control" placeholder="Enter Email" />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-6">
            <label>State / Location</label>
            <Select options={options} placeholder="Select State/Location" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Start Point</label>
            <Select options={options} placeholder="Select Start Point" />
          </div>
          <div class="col-sm-6">
            <label>End Point</label>
            <Select options={options} placeholder="Select End Point" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Arrival Date</label>
            <input type="date" class="form-control" placeholder="Enter Arrival Date" />
          </div>
          <div class="col-sm-6">
            <label>Departure Date</label>
            <input type="date" class="form-control" placeholder="Enter Departure Date" />
          </div>
          </div>
        <div class="form-group row">

          <div class="col-sm-6">
            <label>Tour Duration Day</label>
            <input type="number" class="form-control" placeholder="Enter Day Duration" />
          </div>
          <div class="col-sm-6">
            <label>Tour Duration Night</label>
            <input type="number" class="form-control" placeholder="Enter Night Duration" />
          </div>
        </div>
        <div class="form-group row">
          
        </div>
        <div class="form-group row">
         
        </div>
        <div class="form-group row">
         
        </div>
      </section>
    </>
  );
};
export default BasicDetailsForm;
