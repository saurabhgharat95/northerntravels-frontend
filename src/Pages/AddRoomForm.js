import {
  FETCH_HOTELS_API,
  FETCH_ROOM_TYPES_API,
  ADD_HOTEL_ROOM_API,
  UPDATE_HOTEL_ROOM_API,
  FETCH_HOTEL_ROOM_DETAILS_API,
  FETCH_HOTEL_ROOM_PERIOD_LIST_API,
  ADD_HOTEL_ROOM_PERIOD_API,
  DELETE_HOTEL_ROOM_PERIOD_API,
  FETCH_HOTEL_ROOM_PERIOD_DETAILS_API,
  UPDATE_HOTEL_ROOM_PERIOD_API,
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
import NoData from "../components/NoData";
import ConfirmationDialog from "../components/ConfirmationDialog";

import { getDateFormattedForDB } from "../utils/helpers";
const AddRoomForm = ({ cancelForm, hotelId, formType, updateId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomTypeOptions, setRoomTypeOptions] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [timePeriodObj, setTimePeriodObj] = useState({
    chargesFromDate: "",
    chargesToDate: "",
  });
  const [timePeriodData, setTimePeriodData] = useState([]);
  const [actionObj, setActionObj] = useState({
    deleteRoomPeriodId: null,
    updateRoomPeriodId: null,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [, setForceUpdate] = useState(0);
  const currentDate = new Date();
  const minDate = new Date();
  const maxDate = new Date();

  minDate.setFullYear(currentDate.getFullYear() - 1);
  maxDate.setFullYear(currentDate.getFullYear() + 1);

  const minDateString = minDate.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];
  const [roomObject, setRoomObject] = useState({
    fkHotelId: hotelId,
    fkRoomTypeId: null,
    noOfRooms: "0",
    hasAC: "1",
    fromDate: null,
    toDate: null,
    chargesData: [
      {
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
        5: [
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
    ],
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
      validators: {
        isDateAfter: {
          message: "To date should be greater than from date.",
          rule: (val, params, validator) => {
            return val >= params[0];
          },
        },
      },
    })
  );

  // const fetchHotelRoomDetails = async (id) => {
  //   try {
  //     let url = FETCH_HOTEL_ROOM_DETAILS_API;
  //     let body = {
  //       id: id,
  //     };
  //     let response = await axios.post(url, body);
  //     if (response) {
  //       if (response.status == 200) {
  //         if (response.data.data) {
  //           let roomDetails = response.data.data;

  //           const chargesResult = [
  //             {
  //               on_season: {},
  //               off_season: {},
  //             },
  //           ];

  //           roomDetails.roomChargesData.forEach((item) => {
  //             const {
  //               seasonType,
  //               fkRoomAccommodationId,
  //               fkMealPlanId,
  //               charges,
  //             } = item;
  //             const season = seasonType === 1 ? "on_season" : "off_season";

  //             if (!chargesResult[0][season][fkRoomAccommodationId]) {
  //               chargesResult[0][season][fkRoomAccommodationId] = [];
  //             }

  //             chargesResult[0][season][fkRoomAccommodationId].push({
  //               meal_plan: fkMealPlanId,
  //               charges: Number(charges),
  //             });
  //           });
  //           setRoomObject((prevState) => ({
  //             ...prevState,
  //             fkHotelId: hotelId,
  //             fkRoomTypeId: roomDetails.hotelRoomData.fkRoomTypeId,
  //             noOfRooms: roomDetails.hotelRoomData.noOfRooms,
  //             hasAC: roomDetails.hotelRoomData.hasAC,
  //             chargesData: chargesResult,
  //           }));
  //           setForceUpdate((v) => ++v);
  //         }
  //       }
  //     }
  //   } catch (e) {}
  // };
  const fetchHotelRoomDetails = async (id) => {
    try {
      let url = FETCH_HOTEL_ROOM_DETAILS_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response && response.status === 200 && response.data.data) {
        let roomDetails = response.data.data;

        const chargesResult = [
          {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
          },
        ];

        roomDetails.roomChargesData.forEach((item) => {
          const { fkRoomAccommodationId, fkMealPlanId, charges } = item;

          chargesResult[0][fkRoomAccommodationId].push({
            meal_plan: fkMealPlanId,
            charges: Number(charges),
          });
        });

        setRoomObject((prevState) => ({
          ...prevState,
          fkHotelId: hotelId,
          fkRoomTypeId: roomDetails.hotelRoomData.fkRoomTypeId,
          noOfRooms: roomDetails.hotelRoomData.noOfRooms,
          hasAC: roomDetails.hotelRoomData.hasAC,
          // chargesData: chargesResult,
        }));

        setForceUpdate((v) => ++v);
      }
    } catch (e) {
      console.error("Error fetching hotel room details:", e);
    }
  };
  const fetchHotelRoomDetailsList = async (id) => {
    try {
      let url = FETCH_HOTEL_ROOM_PERIOD_LIST_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response && response.status === 200 && response.data.data) {
        let roomDetails = response.data.data;
        let roomData = [];
        if (roomDetails.length > 0) {
          roomDetails.forEach((room) => {
            roomData.push({
              chargesFromDate: getDateFormattedForDB(room.fromDate),
              chargesToDate: getDateFormattedForDB(room.toDate),
              fkHotelRoomTypeMapId: room.fkHotelRoomTypeMapId,
              id: room.id,
            });
          });
          setTimePeriodData(roomData);
        }
      }
    } catch (e) {
      console.error("Error fetching hotel room details:", e);
    }
  };
  const fetchHotelRoomPeriodDetails = async (id) => {
    try {
      let url = FETCH_HOTEL_ROOM_PERIOD_DETAILS_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response && response.status === 200 && response.data.data) {
        let roomDetails = response.data.data;
        let roomData = [];

        const transformedData = {
          fkHotelId: null,
          fkRoomTypeId: null,
          noOfRooms: "0",
          hasAC: "1",
          fromDate: getDateFormattedForDB(roomDetails.hotelPeriodData.fromDate),
          toDate: getDateFormattedForDB(roomDetails.hotelPeriodData.toDate),
          chargesData: [],
        };

        const chargesData = {};

        roomDetails.periodChargesData.forEach((entry) => {
          const roomAccommodationId = entry.fkRoomAccommodationId;
          const mealPlanId = entry.fkMealPlanId;
          const charges = parseFloat(entry.charges); // Convert charges to float

          if (!chargesData[roomAccommodationId]) {
            chargesData[roomAccommodationId] = [];
          }

          chargesData[roomAccommodationId].push({
            meal_plan: mealPlanId,
            charges: charges,
          });
        });

        // Sort the charges data by meal_plan
        Object.keys(chargesData).forEach((key) => {
          chargesData[key].sort((a, b) => a.meal_plan - b.meal_plan);
        });

        transformedData.chargesData.push(chargesData);
        setRoomObject((prevState) => ({
          ...prevState,
          fromDate: getDateFormattedForDB(roomDetails.hotelPeriodData.fromDate),
          toDate: getDateFormattedForDB(roomDetails.hotelPeriodData.toDate),
          chargesData: transformedData.chargesData,
        }));
      }
    } catch (e) {
      console.error("Error fetching hotel room details:", e);
    }
  };

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
  const handleInputChange = (newValue, mealType, mealPlanIndex) => {
    const updatedRoomObject = { ...roomObject };

    const updatedChargesData = [...updatedRoomObject.chargesData];

    updatedChargesData[0][mealType][mealPlanIndex]["charges"] = newValue;

    updatedRoomObject.chargesData = updatedChargesData;

    setRoomObject(updatedRoomObject);
  };
  const clearPeriodForm = () => {
    setRoomObject((prevState) => ({
      ...prevState,
      fromDate: "",
      toDate: "",
      chargesData: [
        {
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
          5: [
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
      ],
    }));
  };
  const addHotelRoom = async () => {
    try {
      let url = ADD_HOTEL_ROOM_API;
      let body = {
        fkHotelId: roomObject.fkHotelId,
        fkRoomTypeId: roomObject.fkRoomTypeId,
        noOfRooms: roomObject.noOfRooms,
        hasAC: roomObject.hasAC,
        fromDate: roomObject.fromDate,
        toDate: roomObject.toDate,
        chargesData: roomObject.chargesData,
      };

      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            setIsLoading(false);

            if (response.data.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              toast.success(response.data.message, {
                position: "top-right",
              });
              // cancelForm();
              clearPeriodForm();
              fetchHotelRoomDetailsList(response.data.data.data);
              simpleValidator.current.hideMessages();
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const addHotelRoomPeriod = async () => {
    try {
      let url = ADD_HOTEL_ROOM_PERIOD_API;
      let fkHotelRoomTypeMapId = timePeriodData[0].fkHotelRoomTypeMapId;
      let body = {
        fkHotelRoomTypeMapId: fkHotelRoomTypeMapId,
        fromDate: roomObject.fromDate,
        toDate: roomObject.toDate,
        chargesData: roomObject.chargesData,
      };

      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            setIsLoading(false);

            if (response.data.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              toast.success(response.data.message, {
                position: "top-right",
              });
              clearPeriodForm();
              setActionObj((prevState) => ({
                ...prevState,
                updateRoomPeriodId: "",
              }));
              fetchHotelRoomDetailsList(fkHotelRoomTypeMapId);
              simpleValidator.current.hideMessages();
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateHotelRoomPeriod = async () => {
    try {
      let url = UPDATE_HOTEL_ROOM_PERIOD_API;
      let fkHotelRoomTypeMapId = timePeriodData[0].fkHotelRoomTypeMapId;
      let body = {
        id: actionObj.updateRoomPeriodId,
        fkHotelRoomTypeMapId: fkHotelRoomTypeMapId,
        fromDate: roomObject.fromDate,
        toDate: roomObject.toDate,
        chargesData: roomObject.chargesData,
      };
      console.log(body);
      setIsLoading(true);
      if (simpleValidator.current.allValid()) {
        let response = await axios.post(url, body);
        if (response) {
          if (response.status == 200) {
            setIsLoading(false);

            if (response.data.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              toast.success(response.data.message, {
                position: "top-right",
              });
              clearPeriodForm();
              setActionObj((prevState) => ({
                ...prevState,
                updateRoomPeriodId: "",
              }));
              fetchHotelRoomDetailsList(fkHotelRoomTypeMapId);
              simpleValidator.current.hideMessages();
            }
          }
        }
      } else {
        setForceUpdate((v) => ++v);
        simpleValidator.current.showMessages();
        setIsLoading(false);
      }
    } catch (e) {
      console.log("eee", e);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const updateHotelRoom = async () => {
    try {
      let url = UPDATE_HOTEL_ROOM_API;
      let body = {
        id: updateId,
        fkHotelId: roomObject.fkHotelId,
        fkRoomTypeId: roomObject.fkRoomTypeId,
        noOfRooms: roomObject.noOfRooms,
        hasAC: roomObject.hasAC,
      };
      console.log('body',body)
      setIsLoading(true);
        let response = await axios.post(url, body);
        if (response) {
          setIsLoading(false);

          if (response.status == 200) {

            if (response.data.data.status == false) {
              toast.error(response.data.message, {
                position: "top-right",
              });
            } else {
              toast.success(response.data.message, {
                position: "top-right",
              });
              // cancelForm();
              simpleValidator.current.hideMessages();

              fetchHotelRoomDetails(updateId);
            }
          }
        }
      
    } catch (e) {
      console.log('eee',e)
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
      setIsLoading(false);

    }
  };
  const addRoomRate = () => {
    if (timePeriodData && timePeriodData.length > 0) {
      addHotelRoomPeriod();
    } else {
      addHotelRoom();
    }
  };
  const updateRoomRate = () => {
    console.log("hii");
    updateHotelRoomPeriod();
  };
  const deleteHotelRoomPeriod = async (id) => {
    try {
      let url = DELETE_HOTEL_ROOM_PERIOD_API;
      let body = {
        id: id,
      };
      setIsLoading(true);
      let response = await axios.post(url, body);
      if (response) {
        setIsLoading(false);
        if (response.status == 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          fetchHotelRoomDetailsList(response.data.data.data);
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went Wrong :(", {
        position: "top-right",
      });
    }
  };
  const handleConfirm = () => {
    deleteHotelRoomPeriod(actionObj.deleteRoomPeriodId);
    setShowConfirmation(false);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };
  useEffect(() => {
    fetchHotels();
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    if (formType == "update") {
      fetchHotelRoomDetails(updateId);
      fetchHotelRoomDetailsList(updateId);
    }
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
        <h4>{updateId == "" ? "Add" : "Update"} Hotel Room</h4>
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
              onBlur={() => {
                simpleValidator.current.showMessageFor("room_type");
              }}
            />
            <>
              {simpleValidator.current.message(
                "room_type",
                roomObject.fkRoomTypeId,
                ["required"],
                {
                  messages: {
                    required: "Please select room type",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>No. of Rooms</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter No. of Rooms"
              value={roomObject.noOfRooms}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setRoomObject((prevState) => ({
                    ...prevState,
                    noOfRooms: event.target.value,
                  }));
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("noOfRooms");
              }}
            />
            <>
              {simpleValidator.current.message(
                "noOfRooms",
                roomObject.noOfRooms,
                ["required"],
                {
                  messages: {
                    required: "Please enter no of rooms",
                  },
                }
              )}
            </>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 col-xs-12 col-form-label">
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
                  <div className="row">
                    <div className="col-sm-6">
                      <label>From Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select From Date"
                        min={minDateString}
                        max={maxDateString}
                        value={roomObject.fromDate}
                        onChange={(event) =>
                          setRoomObject((prevState) => ({
                            ...prevState,
                            fromDate: event.target.value,
                          }))
                        }
                        onBlur={() => {
                          simpleValidator.current.showMessageFor("fromDate");
                        }}
                      />
                      <>
                        {simpleValidator.current.element.length > 0 &&
                          simpleValidator.current.message(
                            "fromDate",
                            roomObject.fromDate,
                            ["required"],
                            {
                              messages: {
                                required: "Please select from date",
                              },
                            }
                          )}
                      </>
                    </div>
                    <div className="col-sm-6">
                      <label>To Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select To Date"
                        min={minDateString}
                        max={maxDateString}
                        value={roomObject.toDate}
                        onChange={(event) =>
                          setRoomObject((prevState) => ({
                            ...prevState,
                            toDate: event.target.value,
                          }))
                        }
                        onBlur={() => {
                          simpleValidator.current.showMessageFor("toDate");
                        }}
                      />
                      <>
                        {simpleValidator.current.element.length > 0 &&
                          simpleValidator.current.message(
                            "toDate",
                            roomObject.toDate,
                            "required|isDateAfter:" + roomObject.fromDate,

                            {
                              messages: {
                                required: "Please select to date",
                              },
                            }
                          )}
                      </>
                    </div>
                  </div>
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
                {/* <th style={{ width: "107.016px" }} scope="col">
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
                </th> */}
              </tr>
              <tr className="odd">
                <th style={{ width: "171.375px" }}>Room Charges / Dbl Room</th>
                {Array.from({ length: 4 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      value={roomObject.chargesData[0]["1"][i]["charges"]}
                      onChange={(e) => {
                        const newValue = e.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0,

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
                {Array.from({ length: 4 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      value={roomObject.chargesData[0]["2"][i]["charges"]}
                      onChange={(e) => {
                        const newValue = e.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0,

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
                {Array.from({ length: 4 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      value={roomObject.chargesData[0]["3"][i]["charges"]}
                      onChange={(e) => {
                        const newValue = e.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0,

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
                {Array.from({ length: 4 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      value={roomObject.chargesData[0]["4"][i]["charges"]}
                      onChange={(e) => {
                        const newValue = e.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0,

                            4,
                            i < 4 ? i : i - 4
                          );
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
              <tr className="odd">
                <th style={{ width: "171.375px" }}>Single Occupancy</th>
                {Array.from({ length: 4 }, (_, i) => (
                  <td key={i}>
                    <input
                      type="text"
                      pattern="[0-9]+"
                      value={roomObject.chargesData[0]["5"][i]["charges"]}
                      onChange={(e) => {
                        const newValue = e.target.value.trim();
                        if (/^\d*$/.test(newValue)) {
                          handleInputChange(
                            parseInt(newValue) || 0,

                            5,
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
        <div>
          <button
            className="btn btn-success "
            onClick={() => {
              actionObj.updateRoomPeriodId == "" || !actionObj.updateRoomPeriodId
                ? addRoomRate()
                : updateRoomRate();
            }}
          >
            {actionObj.updateRoomPeriodId == "" || !actionObj.updateRoomPeriodId ? "Add" : "Update"}
          </button>
        </div>
        <br></br>
        <br></br>
        <h4>Added Room Rates</h4>
        {timePeriodData && timePeriodData?.length > 0 && (
          <div className="row dt-row">
            <div className="col-sm-12">
              <table
                id="order-listing"
                className="table dataTable no-footer"
                aria-describedby="order-listing_info"
              >
                <thead>
                  <tr>
                    <th style={{ width: "171.375px" }}>Sr. No.</th>
                    <th style={{ width: "171.375px" }}>From Date</th>
                    <th style={{ width: "127.391px" }}>To Date</th>
                    <th style={{ width: "116.672px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {timePeriodData &&
                    timePeriodData?.length > 0 &&
                    timePeriodData.map((timePeriodObj, index) => (
                      <tr className="odd" key={index}>
                        <td>{index + 1}</td>
                        <td>{timePeriodObj.chargesFromDate}</td>
                        <td>{timePeriodObj.chargesToDate}</td>

                        <td>
                          <ion-icon
                            name="create-outline"
                            color="primary"
                            style={{ marginRight: "10px" }}
                            title="Edit"
                            onClick={() => {
                              setTimePeriodObj(timePeriodObj);
                              fetchHotelRoomPeriodDetails(timePeriodObj.id);
                              setActionObj((prevState) => ({
                                ...prevState,
                                updateRoomPeriodId: timePeriodObj.id,
                              }));
                            }}
                          ></ion-icon>
                          <ion-icon
                            name="trash-outline"
                            color="danger"
                            style={{ marginRight: "10px" }}
                            title="Delete"
                            onClick={() => {
                              setShowConfirmation(true);
                              setActionObj((prevState) => ({
                                ...prevState,
                                deleteRoomPeriodId: timePeriodObj.id,
                              }));
                            }}
                          ></ion-icon>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {timePeriodData && timePeriodData.length == 0 && <NoData></NoData>}
      </section>
      <br></br>
      {updateId != "" && (
        <div className="actions clearfix float-right">
          <button
            className="btn btn-secondary"
            onClick={() => {
              updateHotelRoom();
            }}
          >
            Update
          </button>
        </div>
      )}

      <div className="actions clearfix float-right mr-2">
        <button className="btn primary text-white" onClick={() => cancelForm()}>
          Close
        </button>
      </div>
      <Loader isLoading={isLoading}></Loader>
      <ConfirmationDialog
        message="Are you sure you want to delete?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        show={showConfirmation}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
};
export default AddRoomForm;
