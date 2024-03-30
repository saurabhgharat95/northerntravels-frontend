import Select from "react-select";
import { useState } from "react";
import NoData from "../components/NoData";

const ItineraryForm = () => {
  const options = [
    { value: "1", label: "Jammu & Kashmir Tour" },
    { value: "2", label: "Andaman Tour" },
    { value: "3", label: "North Tour" },
    { value: "4", label: "Etios" },
    { value: "5", label: "Innova" },
    { value: "6", label: "Sringar Hotel" },
    { value: "7", label: "Sringar Hotel" },
  ];
  const [itineraryData, setItineraryData] = useState([]);
  const [itineraryObject, setItineraryObject] = useState({
    day: 0,
    date: "",
    vehicleName: "",
    pickupPt: "",
    dropPt: "",
    noOfVehicle: "",
  });
  const [destFormValues, setDestFormValues] = useState([
    { destinationName: "", destinationDesc: "" },
  ]);
  const [addOnformValues, setAddOnFormValues] = useState([
    { destinationName: "", destinationDesc: "" },
  ]);

  let addAddOnServicesFormFields = () => {
    setAddOnFormValues([...addOnformValues, { name: "", email: "" }]);
  };

  let removeAddOnServicesFormFields = (i) => {
    let newFormValues = [...addOnformValues];
    newFormValues.splice(i, 1);
    setAddOnFormValues(newFormValues);
  };
  let addDestFormFields = () => {
    setDestFormValues([
      ...destFormValues,
      { destinationName: "", destinationDesc: "" },
    ]);
  };

  let removeDestFormFields = (i) => {
    let newFormValues = [...destFormValues];
    newFormValues.splice(i, 1);
    setDestFormValues(newFormValues);
  };
  const addItinerary = () => {
    setItineraryData((prevState) => [...prevState, itineraryObject]);
    setItineraryObject((prevState) => ({
      ...prevState,
      day: "",
      date: "",
      vehicleName: "",
      pickupPt: "",
      dropPt: "",
      noOfVehicle: "",
    }));
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
        <h3>Itinerary</h3>
        <br></br>
        <div className="form-group row border p-3">
          <div className="col-sm-4 mb-3">
            <label>Day</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={itineraryObject.day + 1}
              onChange={(event) =>
                setItineraryObject((prevState) => ({
                  ...prevState,
                  day: event.target.value,
                }))
              }
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Date"
              value={itineraryObject.date}
              onChange={(event) =>
                setItineraryObject((prevState) => ({
                  ...prevState,
                  date: event.target.value,
                }))
              }
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Vehicle</label>
            <Select
              options={options}
              placeholder="Select Vehicle"
              value={options.find(
                (option) => option.label === itineraryObject.vehicleName
              )}
              onChange={(selectedOption) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  vehicleName: selectedOption ? selectedOption.label : "",
                }));
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>No of Vehicles</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter No of Vehicles"
              value={itineraryObject.noOfVehicle}
              onChange={(event) =>
                setItineraryObject((prevState) => ({
                  ...prevState,
                  noOfVehicle: event.target.value,
                }))
              }
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Pick up point </label>
            <Select
              options={options}
              placeholder="Select Pick up point"
              value={options.find(
                (option) => option.label === itineraryObject.pickupPt
              )}
              onChange={(selectedOption) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  pickupPt: selectedOption ? selectedOption.label : "",
                }));
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label>Drop point </label>
            <Select
              options={options}
              placeholder="Select Drop point"
              value={options.find(
                (option) => option.label === itineraryObject.dropPt
              )}
              onChange={(selectedOption) => {
                setItineraryObject((prevState) => ({
                  ...prevState,
                  dropPt: selectedOption ? selectedOption.label : "",
                }));
              }}
            />
          </div>
        </div>
        <div className="form-group row border p-3">
        {destFormValues.map((element, index) => (
          <>
            <div className="col-sm-4 mb-3">
              <label>Destination </label>
              <Select options={options} placeholder="Select Destination" />
            </div>
            <div className="col-sm-4 mb-3">
              <label>Description </label>
              <input
                type="number"
                className="form-control"
                placeholder="Description"
                readOnly
              />
            </div>
            <div className="col-sm-1 mb-3">
              <ion-icon
                style={{ marginTop: "40%" }}
                name="add-circle-outline"
                color="success"
                size="large"
                onClick={() => addDestFormFields()}
              ></ion-icon>
              {index ? (
                <ion-icon
                  style={{ marginTop: "40%" }}
                  name="close-circle-outline"
                  color="danger"
                  size="large"
                  onClick={() => removeDestFormFields(index)}
                ></ion-icon>
              ) : null}
            </div>
          </>
        ))}
        </div>
        <div className="col-sm-12 mb-3">
          <br></br>

          <h4>Add On Services</h4>
        </div>
        <div className="form-group row border p-3">
        {addOnformValues.map((element, index) => (
            <>
            <div className="col-sm-4 mb-3">
              <label>Service </label>
              <Select options={options} placeholder="Select Service" />
            </div>
            <div className="col-sm-4 mb-3">
              <label className=" col-form-label pb-0 mb-0">
                Service Payable
              </label>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="membershipRadios"
                        id="membershipRadios1"
                        value="1"
                        checked
                      />
                      Free
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="membershipRadios"
                        id="membershipRadios2"
                        value="2"
                      />
                      Payable
                      <i className="input-helper"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4 mb-3">
              <label>Remark </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
              />
            </div>
            <div className="col-sm-4 mb-3">
              <label>Amount </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
              />
            </div>
            <div className="col-sm-8 mb-3">
              <ion-icon
                style={{ marginTop: "4%" }}
                name="add-circle-outline"
                color="success"
                size="large"
                onClick={() => addAddOnServicesFormFields()}
              ></ion-icon>
              {index ? (
                <ion-icon
                  style={{ marginTop: "4%" }}
                  name="close-circle-outline"
                  color="danger"
                  size="large"
                  onClick={() => removeAddOnServicesFormFields(index)}
                ></ion-icon>
              ) : null}
            </div>
            <div className="col-sm-12 mb-3">
            <h1 style={{borderStyle: "double",border:"1px dotted lightgrey"}}></h1>
                </div>
          </>
        ))}
        </div>
        <div className="col-sm-12">
          <button
            className="btn btn-success mr-3"
            onClick={() => addItinerary()}
          >
            Add
          </button>
        </div>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <div
                id="order-listing_wrapper"
                className="dataTables_wrapper dt-bootstrap5 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div
                      className="dataTables_length"
                      id="order-listing_length"
                    >
                      <label>
                        Show{" "}
                        <select
                          name="order-listing_length"
                          aria-controls="order-listing"
                          className="form-select form-select-sm"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="-1">All</option>
                        </select>{" "}
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div
                      id="order-listing_filter"
                      className="dataTables_filter"
                    >
                      <label>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-controls="order-listing"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {itineraryData && itineraryData?.length > 0 && (
                  <div className="row dt-row">
                    <div className="col-sm-12">
                      <table
                        id="order-listing"
                        className="table dataTable no-footer"
                        aria-describedby="order-listing_info"
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "107.016px" }}>Sr. No.</th>
                            <th style={{ width: "171.375px" }}>Day</th>
                            <th style={{ width: "127.391px" }}>Vehicle</th>
                            <th style={{ width: "116.672px" }}>
                              Pick Up Point
                            </th>
                            <th style={{ width: "116.672px" }}>Drop Point</th>
                            <th style={{ width: "116.672px" }}>
                              No of Vehicles
                            </th>

                            <th style={{ width: "116.672px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itineraryData &&
                            itineraryData?.length > 0 &&
                            itineraryData.map((itineraryObj) => (
                              <tr className="odd">
                                <td className="sorting_1">1</td>
                                <td>{itineraryObj.day + 1}</td>
                                <td>{itineraryObj.vehicleName}</td>
                                <td>{itineraryObj.pickupPt}</td>
                                <td>{itineraryObj.dropPt}</td>
                                <td>{itineraryObj.noOfVehicle}</td>

                                <td>
                                  <ion-icon
                                    name="trash-outline"
                                    color="danger"
                                    style={{ marginRight: "10px" }}
                                    title="Delete"
                                  ></ion-icon>

                                  <ion-icon
                                    name="create-outline"
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                    title="Edit"
                                  ></ion-icon>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {itineraryData && itineraryData.length == 0 && (
                  <NoData></NoData>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ItineraryForm;
