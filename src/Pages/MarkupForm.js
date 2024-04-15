const MarkupForm = () => {
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
        <h3>Markup</h3>
        <br></br>
        <br></br>
        <br></br>

        <div className="form-group row">
          <div className="col-sm-4">
            <label>Before Markup (Rs.)</label>
            <input
              type="number"
              className="form-control"
              min={0}
              placeholder="Enter Before Markup (Rs.)"
              max={50}
              readonly
            />
          </div>
          <div className="col-sm-4">
            <label>Markup (Rs.)</label>
            <input
              type="number"
              className="form-control"
              min={0}
              max={50}
              placeholder="Enter Markup (Rs.)"
            />
          </div>
          <div className="col-sm-4">
            <label>After Markup (Rs.)</label>
            <input
              type="number"
              className="form-control"
              min={0}
              max={50}
              readonly
              placeholder="Enter Markup (Rs.)"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Logo</label>
            <input type="file" className="form-control" min={0} max={50} />
          </div>
          <div className="col-sm-6">
            <label>Company Logo </label>
            <input type="file" className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6 mb-3">
            <label>Company Name </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-6 mb-3">
            <label>Corporate Office </label>
            <input type="text" className="form-control" />
          </div>
        
          <div className="col-sm-6  mb-3">
            <label>Regional Office</label>
            <input type="TEXT" className="form-control" />
          </div>
          <div className="col-sm-6  mb-3">
            <label>Hotline </label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-sm-6  mb-3">
            <label>Email </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-6  mb-3">
            <label>Website</label>

            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group row"></div>

        <div className="form-group row"></div>

        <div className="form-group row"></div>
      </section>
    </>
  );
};
export default MarkupForm;
