const MarkupForm = () => {
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
        <h3>Markup</h3>
        <br></br>
        <br></br>
        <br></br>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Logo</label>
            <input type="file" class="form-control" min={0} max={50} />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Before Markup (Rs.)</label>
            <input
              type="number"
              class="form-control"
              min={0}
              placeholder="Enter Before Markup (Rs.)"
              max={50}
              readonly
            />
          </div>
          <div class="col-sm-6">
            <label>Markup (Rs.)</label>
            <input type="number" class="form-control"  min={0} max={50} placeholder="Enter Markup (Rs.)" />
          </div>
        </div>
       
        <div class="form-group row">
          <div class="col-sm-6">
            <label>After Markup (Rs.)</label>
            <input
              type="number"
              class="form-control"
              min={0}
              max={50}
              readonly
              placeholder="Enter Markup (Rs.)"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Company Name </label>
            <input type="text" class="form-control" />
          </div>
          <div class="col-sm-6">
            <label>Company Logo </label>
            <input type="file" class="form-control" />
          </div>
        </div>
       
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Corporate Office </label>
            <input type="text" class="form-control" />
          </div>
          <div class="col-sm-6">
            <label>Regional Office</label>
            <input type="TEXT" class="form-control" />
          </div>
        </div>
      
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Hotline </label>
            <input type="number" class="form-control" />
          </div>
          <div class="col-sm-6">
            <label>Email </label>
            <input type="text" class="form-control" />
          </div>
        </div>
      
        <div class="form-group row">
          <div class="col-sm-6">
            <label>Website</label>

            <input type="text" class="form-control" />
          </div>
        </div>
      </section>
    </>
  );
};
export default MarkupForm;
