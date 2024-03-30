import { useState } from "react";
import NoData from "../components/NoData";
import Select from "react-select";

const HotelDetailsForm = () => {
  const options = [
    { value: "1", label: "Budshah Residency" },
    { value: "2", label: "Srinagar" },
    { value: "3", label: "Standard" },
    { value: "3", label: "Deluxe-AC" },
    { value: "3", label: "EP" },
  ];
  const [isPackageReadOnly,setPackageReadOnly] = useState(false)
  const [packageData, setPackageData] = useState([]);
  const [packageNameArray,setPackageNameArray] = useState([])
  const [packageObject, setPackageObject] = useState({
    packageName: "",
    haltingDest: "",
    hotelType: "",
    hotelName: "",
    fromDate: "",
    toDate: "",
    noOfNights: "",
    roomType: "",
    mealType: "",
  });
  const addPackage = () => {
   
    setPackageData((prevState) => [...prevState, packageObject])
    setPackageObject(prevState=>({...prevState,   haltingDest: null,
      hotelType: null,
      hotelName: null,
      fromDate: "",
      toDate: "",
      noOfNights: "",
      roomType: null,
      mealType: null,}))
    setPackageNameArray(prevState => {
      if (Object.keys(prevState).length === 0) {
        // Return the new state directly
        return { ...packageObject.packageName };
      } else {
        // Check if packageName has changed from the previous state
        if (packageObject.packageName !== prevState) {
          // Update packageNameArray if packageName has changed
          return { ...prevState, ...packageObject.packageName };
        } else {
          // Return prevState if packageName is the same as the previous state
          return prevState;
        }
      }
    });
    console.log("pa",packageObject.packageName, packageObject,packageNameArray);

    setPackageReadOnly(true)
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
        <h3>Hotel Details</h3>
        <br></br>
        <br></br>
        <br></br>
        <form>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>Package Name</label>
              <input
                type="text"
                className="form-control"
                min={0}
                placeholder="Enter Package Name"
                value={packageObject.packageName}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    packageName: event.target.value,
                  }))
                }
                disabled={isPackageReadOnly}

              />
            </div>
            <div className="col-sm-6">
              <label>Halting Destination</label>
              <Select
                options={options}
                placeholder="Select Halting Destination"
                value={options.find(option => option.label === packageObject.haltingDest)}
                onChange={(selectedOption) => {
                  setPackageObject((prevState) => ({
                    ...prevState,
                    haltingDest: selectedOption ? selectedOption.label : '',
                  }));
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <label>Hotel Type</label>
              <Select
                options={options}
                placeholder="Select Hotel Type"
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    hotelType: event.label,
                  }))
                }
              />
            </div>
            <div className="col-sm-6">
              <label>Hotel Name</label>
              <Select
                options={options}
                placeholder="Select Hotel Name"
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    hotelName: event.label,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select From Date"
                value={packageObject.fromDate}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    fromDate: event.target.value,
                  }))
                }
              />
            </div>
            <div className="col-sm-6">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select To Date"
                value={packageObject.toDate}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    toDate: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>Number of Nights</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Number of Nights"
                value={packageObject.noOfNights}
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    noOfNights: event.target.value,
                  }))
                }
              />
            </div>
            <div className="col-sm-6">
              <label>Room Type</label>
              <Select
                options={options}
                placeholder="Select Room Type"
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    roomType: event.label,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label>Meal Type</label>
              <Select
                options={options}
                placeholder="Select Meal Type"
                onChange={(event) =>
                  setPackageObject((prevState) => ({
                    ...prevState,
                    mealType: event.label,
                  }))
                }
              />
            </div>
          </div>
        </form>
        <div className="actions clearfix">
          <button
            className="btn btn-success mr-2"
            onClick={() => {
              addPackage();
            }}
          >
            Add
          </button>

          <button className="btn btn-primary">New Package</button>
        </div>
        <br></br>
        <br></br>
        <h3>Package Details</h3>
        {packageData && packageData?.length > 0 && (
          <>
          <div className="text-center">
          <span className="badge border border-primary text-primary mr-2">Standard</span>
          <span className="badge border border-secondary text-secondary mr-2">Deluxe</span>
          <span className="badge border border-success text-success mr-2">Super Deluxe</span>
          </div>
          

   
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
                  <div className="row dt-row">
                    <div className="col-sm-12">
                      <table
                        id="order-listing"
                        className="table dataTable no-footer"
                        aria-describedby="order-listing_info"
                      >
                        <thead>
                          <tr>
                            <th
                              className="sorting sorting_asc"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-sort="ascending"
                              aria-label="Order #: activate to sort column descending"
                              style={{ width: "107.016px" }}
                            >
                              Sr. No.
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Purchased On: activate to sort column ascending"
                              style={{ width: "171.375px" }}
                            >
                              Package Name
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Customer: activate to sort column ascending"
                              style={{ width: "127.391px" }}
                            >
                              Halt Destination
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              Hotel
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              From Date
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              To Date
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              No. of Nights
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              Room Type
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              Meal Type
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="order-listing"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Ship to: activate to sort column ascending"
                              style={{ width: "116.672px" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageData &&
                            packageData?.length > 0 &&
                            packageData.map((packageObj) => (
                              <tr className="odd">
                                <td className="sorting_1">1</td>
                                <td>{packageObj.packageName}</td>
                                <td>{packageObj.haltingDest}</td>
                                <td>{packageObj.hotelName}</td>
                                <td>{packageObj.fromDate}</td>
                                <td>{packageObj.toDate}</td>
                                <td>{packageObj.noOfNights}</td>
                                <td>{packageObj.roomType}</td>
                                <td>{packageObj.mealType}</td>

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
                </div>
              </div>
            </div>
          </div>
          </>
        )}
        {packageData && packageData.length == 0 && <NoData></NoData>}
      </section>
    </>
  );
};
export default HotelDetailsForm;
