import {
  FETCH_HOTELS_API,
  FETCH_ROOM_TYPES_API,
  ADD_HOTEL_ROOM_API,
  DELETE_HOTEL_ROOM_API,
  UPDATE_HOTEL_ROOM_API,
} from "../utils/constants";
import { useState, useEffect, useRef } from "react";
import {
  axios,
  toast,
  ToastContainer,
  SimpleReactValidator,
  Select,
} from "../components/CommonImport";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
const AddRoomForm = ({ cancelForm, hotelId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomTypeOptions, setRoomTypeOptions] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [, setForceUpdate] = useState(0);

  const [roomObject, setRoomObject] = useState({
    fkHotelId: hotelId,
    fkRoomTypeId: null,
    noOfRooms: "0",
    hasAC: "1",
    chargesData: [
      {
        on_season: {
          1: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
          2: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
          3: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
          4: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
        },
        off_season: {
          1: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
          2: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
          3: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
          4: [
            {
              meal_plan: 1,
              charges: 0,
            },
            {
              meal_plan: 2,
              charges: 0,
            },
            {
              meal_plan: 3,
              charges: 0,
            },
            {
              meal_plan: 4,
              charges: 0,
            },
          ],
        },
      },
    ],
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  const handleACChange = (event) => {
    const value = event.target.value;
    setRoomObject((prevState) => ({
      ...prevState,
      hasAC: value,
    }));
    setForceUpdate((v) => ++v);
  };
  const fetchHotels = async () => {
    try {
      let url = FETCH_HOTELS_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let hotelOptionsArray = [];
          let hotels = response.data.data;
          hotels.forEach((hotel) => {
            hotelOptionsArray.push({
              value: hotel.id,
              label: hotel.hotelName,
            });
          });
          setHotelOptions(hotelOptionsArray);
        }
      }
    } catch (e) {
      setHotelOptions([]);
    }
  };
  const fetchRoomTypes = async () => {
    try {
      let url = FETCH_ROOM_TYPES_API;

      let response = await axios.post(url);
      if (response) {
        if (response.status == 200) {
          let roomTypes = response.data.data;
          let roomTypeOptionsArray = [];
          roomTypes.forEach((roomType) => {
            roomTypeOptionsArray.push({
              value: roomType.id,
              label: roomType.roomTypeName,
            });
          });
          setRoomTypeOptions(roomTypeOptionsArray);
        }
      }
    } catch (e) {
      setRoomTypeOptions([]);
    }
  };
  const handleInputChange = (newValue, season, mealType, mealPlanIndex) => {
    
    const updatedRoomObject = { ...roomObject };

    const updatedChargesData = [...updatedRoomObject.chargesData];

    updatedChargesData[0][season][mealType][mealPlanIndex]["charges"] =
      newValue;

    updatedRoomObject.chargesData = updatedChargesData;

    setRoomObject(updatedRoomObject);
  };
  const addHotelRoom = async () => {
    try {
      let url = ADD_HOTEL_ROOM_API;
      let body = {
        fkHotelId: roomObject.fkHotelId,
        fkRoomTypeId: roomObject.fkRoomTypeId,
        noOfRooms: roomObject.noOfRooms,
        hasAC: roomObject.hasAC,
        chargesData: roomObject.chargesData,
      };
      console.log('boo',body)
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            cancelForm()
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("ee", e);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateHotelRoom = async () => {
    try {
      let url = UPDATE_HOTEL_ROOM_API;
      let body = {
        id:hotelId,
        fkHotelId: roomObject.fkHotelId,
        fkRoomTypeId: roomObject.fkRoomTypeId,
        noOfRooms: roomObject.noOfRooms,
        hasAC: roomObject.hasAC,
        chargesData: roomObject.chargesData,
      };
      console.log('boo',body)
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            cancelForm()
            simpleValidator.current.hideMessages();
            setIsLoading(false);
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("ee", e);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchRoomTypes();
  }, []);
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
        <h4>Add Hotel Room</h4>
        <br></br>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Hotel Name</label>
            <Select
              options={hotelOptions}
              placeholder="Select Hotel"
              value={
                roomObject.fkHotelId
                  ? hotelOptions.find(
                      (option) => option.value === roomObject.fkHotelId
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setRoomObject((prevState) => ({
                  ...prevState,
                  fkHotelId: selectedOption ? selectedOption.value : "",
                }));
              }}
              isDisabled={true}
            />
          </div>
          <div className="col-sm-6">
            <label>Room Type</label>
            <Select
              options={roomTypeOptions}
              placeholder="Select Room Type"
              value={
                roomObject.fkRoomTypeId
                  ? roomTypeOptions.find(
                      (option) => option.value === roomObject.fkRoomTypeId
                    )
                  : null
              }
              onChange={(selectedOption) => {
                setRoomObject((prevState) => ({
                  ...prevState,
                  fkRoomTypeId: selectedOption ? selectedOption.value : "",
                }));
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>No. of Rooms</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter No. of Rooms"
              value={roomObject.noOfRooms}
              onChange={(event) =>
                setRoomObject((prevState) => ({
                  ...prevState,
                  noOfRooms: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 col-xs-2 col-form-label">
            AC/Non-AC :
          </label>
          <br></br>
          <div className="col-sm-1 col-xs-2 mt-2">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  value="1"
                  checked={roomObject.hasAC == "1"}
                  onChange={handleACChange}
                />
                AC
                <i className="input-helper"></i>
              </label>
            </div>
          </div>
          <div className="col-sm-1 col-xs-2 mt-2">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  value="2"
                  checked={roomObject.hasAC == "2"}
                  onChange={handleACChange}
                />
                Non-AC
                <i className="input-helper"></i>
              </label>
            </div>
          </div>
        </div>
        <label>Charges</label>
        <div className="row dt-row">
          <div className="col-sm-12">
            <table
              id="order-listing"
              className="table table-bordered dataTable no-footer custom-table table-responsive"
              aria-describedby="order-listing_info"
            >
              <tr>
                <td></td>
                <td
                  className="text-center border-left border-right"
                  colSpan={4}
                >
                  On Season
                </td>
                <td className="text-center border-right" colSpan={4}>
                  Off Season
                </td>
              </tr>
              <tr>
                <th></th>
                <th style={{ width: "50.016px" }} scope="col">
                  EP
                </th>
                <th style={{ width: "50.016px" }} scope="col">
                  CP
                </th>
                <th style={{ width: "107.016px" }} scope="col">
                  MAP
                </th>
                <th style={{ width: "107.016px" }} scope="col">
                  AP
                </th>
                <th style={{ width: "107.016px" }} scope="col">
                  EP
                </th>
                <th style={{ width: "107.016px" }} scope="col">
                  CP
                </th>
                <th style={{ width: "107.016px" }} scope="col">
                  MAP
                </th>
                <th style={{ width: "107.016px" }} scope="col">
                  AP
                </th>
              </tr>
              <tr className="odd">
                <th style={{ width: "171.375px" }}>Room Charges / Dbl Room</th>
                {Array.from({ length: 8 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={
                        i < 4
                          ? roomObject.chargesData[0]["on_season"]["1"][i][
                              "charges"
                            ]
                          : roomObject.chargesData[0]["off_season"]["1"][i - 4][
                              "charges"
                            ]
                      }
                      onChange={(e) => {
                        const newValue = e.target.value.trim(); 
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0, 
                            i < 4 ? "on_season" : "off_season",
                            1,
                            i < 4 ? i : i - 4
                          );
                        }
                      }}
                      
                    />
                  </td>
                ))}
              </tr>
              <tr className="odd">
                <th>Extra Bed Charge</th>
                {Array.from({ length: 8 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={
                        i < 4
                          ? roomObject.chargesData[0]["on_season"]["2"][i][
                              "charges"
                            ]
                          : roomObject.chargesData[0]["off_season"]["2"][i - 4][
                              "charges"
                            ]
                      }
                      onChange={(e) => {
                        const newValue = e.target.value.trim(); 
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0, 
                            i < 4 ? "on_season" : "off_season",
                            2,
                            i < 4 ? i : i - 4
                          );
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
              <tr className="odd">
                <th>Child Without Bed Charge</th>
                {Array.from({ length: 8 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={
                        i < 4
                          ? roomObject.chargesData[0]["on_season"]["3"][i][
                              "charges"
                            ]
                          : roomObject.chargesData[0]["off_season"]["3"][i - 4][
                              "charges"
                            ]
                      }
                      onChange={(e) => {
                        const newValue = e.target.value.trim(); 
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0, 
                            i < 4 ? "on_season" : "off_season",
                            3,
                            i < 4 ? i : i - 4
                          );
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
              <tr className="odd">
                <th>Extra Child Below 5 Yrs Charge</th>
                {Array.from({ length: 8 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={
                        i < 4
                          ? roomObject.chargesData[0]["on_season"]["4"][i][
                              "charges"
                            ]
                          : roomObject.chargesData[0]["off_season"]["4"][i - 4][
                              "charges"
                            ]
                      }
                      onChange={(e) => {
                        const newValue = e.target.value.trim(); 
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0, 
                            i < 4 ? "on_season" : "off_season",
                            4,
                            i < 4 ? i : i - 4
                          );
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
            </table>
          </div>
        </div>
        <br></br>
      </section>
      <br></br>

      <div className="actions clearfix float-right">
        <button className="btn btn-secondary" onClick={() => addHotelRoom()}>
          Submit
        </button>
      </div>
      <div className="actions clearfix float-right mr-2">
        <button className="btn primary text-white" onClick={() => cancelForm()}>
          Cancel
        </button>
      </div>
      <Loader isLoading={isLoading}></Loader>
      <ToastContainer />
    </>
  );
};
export default AddRoomForm;
