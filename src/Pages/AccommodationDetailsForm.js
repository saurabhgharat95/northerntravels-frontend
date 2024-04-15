const AccommodationDetailsForm = () => {
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
            <input type="number" className="form-control" min={0} placeholder="Enter Total No. of People" max={50} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Room Required</label>
            <input type="number" className="form-control" min={0} placeholder="Enter No. of Rooms Required" max={50}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Extra bed required ( Children Above 9 years )</label>
            <input type="number" className="form-control" min={0} max={50} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>No extra bed</label>
            <small> ( Children  between 8 - 6 years )</small>
            <br></br>

            <input type="number" className="form-control" min={0} max={50}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Free</label>
            <small>( Children below 5 years )</small>
            <input type="number" className="form-control" min={0} max={50} />
          </div>
        </div>
     
        
      </section>
    </>
  );
};
export default AccommodationDetailsForm;
