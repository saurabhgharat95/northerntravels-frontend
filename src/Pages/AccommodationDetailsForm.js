import { useEffect, useState, useRef } from "react";
import { toast, SimpleReactValidator } from "../components/CommonImport";
import "react-toastify/dist/ReactToastify.css";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setQuotationFormData } from "../utils/store";

const AccommodationDetailsForm = ({ onValidationStatusChange }) => {
  // const [accommodationObject, setAccommodationObject] = useState({
  //   quotTotalPeoples: "",
  //   quotRoomsReqd: "",
  //   quotChildAbove9: "",
  //   quotChildBtwn8And9: "",
  //   quotBlw5: "",
  // });
  const [accommodationObject, setAccommodationObject] = useState({
    quotTotalPeoples: "",
    quotRoomsReqd: "",
    quotTotalExtraBeds: 0,
    quotSingleOccupy: 0,
    quotChildBtwn8And9: 0,
    quotBlw5: 0,
  });
  const [roomObject, setRoomObject] = useState([
    {
      id: null,
      isSingleOccupancy: false,
      totalPersonsRoom: 0,
      childAbove9: "",
      noExtraBeds: "",
      freeBeds: "",
      extraBeds: "",
    },
  ]);
  const [, setForceUpdate] = useState(0);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: this,
    })
  );
  //redux
  const dispatch = useDispatch();
  const quotFormData = useSelector((state) => state.form.quotationFormData);

  const validateForm = () => {
    const isValid = simpleValidator.current.allValid();
    if (isValid) {
      onValidationStatusChange(isValid, 2);
    } else {
      simpleValidator.current.showMessages();
      setForceUpdate((v) => ++v);
    }
    return isValid;
  };
  let addRoom = () => {
    if (roomObject.length < accommodationObject.quotRoomsReqd) {
      setRoomObject([
        ...roomObject,
        {
          id: null,
          isSingleOccupancy: false,
          childAbove9: "",
          totalPersonsRoom: 0,
          noExtraBeds: "",
          freeBeds: "",
          extraBeds: "",
        },
      ]);
    } else {
      toast.error("Rooms cannot exceed required room", {
        position: "top-right",
      });
    }
  };

  let removeRoom = (i) => {
    let newFormValues = [...roomObject];
    let removedRoomExtraBeds = Number(roomObject[i].extraBeds);

    // Remove the room from the array
    newFormValues.splice(i, 1);

    // Update the roomObject state
    setRoomObject(newFormValues);

    // Update the accommodationObject state
    setAccommodationObject((prevState) => ({
      ...prevState,
      quotTotalExtraBeds: prevState.quotTotalExtraBeds - removedRoomExtraBeds,
    }));

    // Update the global state using dispatch
    dispatch(
      setQuotationFormData(
        "quotTotalExtraBeds",
        Number(quotFormData.quotTotalExtraBeds) - removedRoomExtraBeds
      )
    );
  };

  const generateRoomForms = (noOfRooms) => {
    let rooms = [];
    for (let index = 0; index < noOfRooms; index++) {
      rooms.push({
        id: null,
        isSingleOccupancy: false,
        childAbove9: "",
        totalPersonsRoom: 0,
        noExtraBeds: "",
        freeBeds: "",
        extraBeds: "",
      });
    }

    setRoomObject(rooms);
  };
  const handleCheckboxChange = (event, index) => {
    let value;
    if (event.target.checked) {
      value = true;
    } else {
      value = false;
    }
    const newFormValues = [...roomObject];
    newFormValues[index].isSingleOccupancy = value ? value : "";
    newFormValues[index].childAbove9 = "";
    newFormValues[index].totalPersonsRoom = "";
    newFormValues[index].noExtraBeds = "";
    newFormValues[index].freeBeds = "";
    newFormValues[index].extraBeds = "";
    countTotal();
    setRoomObject(newFormValues);
    dispatch(setQuotationFormData("roomData", newFormValues));
    setForceUpdate((v) => ++v);
  };
  const countTotal = () => {
    let noOfExtraBeds = 0;
    let noOfSingleOccupancy = 0;
    let noOfCNB = 0;
    let noOfCMP = 0;
    roomObject.forEach((room) => {
      noOfExtraBeds += room.extraBeds ? Number(room.extraBeds) : 0;
      noOfSingleOccupancy += room.isSingleOccupancy ? 1 : 0;
      noOfCNB += room.noExtraBeds ? Number(room.noExtraBeds) : 0;
      noOfCMP += room.freeBeds ? Number(room.freeBeds) : 0;
    });
    setAccommodationObject((prevState) => ({
      ...prevState,
      quotTotalExtraBeds: noOfExtraBeds,
      quotSingleOccupy: noOfSingleOccupancy,
      quotChildBtwn8And9: noOfCNB,
      quotBlw5: noOfCMP,
    }));
    dispatch(setQuotationFormData("quotTotalExtraBeds", noOfExtraBeds));
    dispatch(setQuotationFormData("quotSingleOccupy", noOfSingleOccupancy));
    dispatch(setQuotationFormData("quotChildBtwn8And9", noOfCNB));
    dispatch(setQuotationFormData("quotBlw5", noOfCMP));
    setForceUpdate((v) => ++v);
  };
  useEffect(() => {
    validateForm();
  }, [accommodationObject]);
  useEffect(() => {
    if (quotFormData) {
      setAccommodationObject((prevState) => ({
        ...prevState,
        quotTotalPeoples: quotFormData.quotTotalPeoples,
        quotRoomsReqd: quotFormData.quotRoomsReqd,
        quotTotalExtraBeds: quotFormData.quotTotalExtraBeds,
        quotSingleOccupy: quotFormData.quotSingleOccupy,
        quotChildBtwn8And9: quotFormData.quotChildBtwn8And9,
        quotBlw5: quotFormData.quotBlw5,
      }));

      let roomData = quotFormData.roomData;
      let roomArray = [];

      if (roomData && roomData.length > 0) {
        roomData.forEach((element) => {
          roomArray.push({
            id: element.id,
            isSingleOccupancy: element.isSingleOccupancy == 1,
            childAbove9: element.isSingleOccupancy != 1 ? element.extraBeds : 0,
            totalPersonsRoom:
              element.isSingleOccupancy != 1 ? element.totalPersonsRoom : 0,
            noExtraBeds:
              element.isSingleOccupancy != 1 ? element.noExtraBeds : 0,
            freeBeds: element.isSingleOccupancy != 1 ? element.freeBeds : 0,
            extraBeds: element.isSingleOccupancy != 1 ? element.extraBeds : 0,
          });
        });

        if (roomArray.length > 0) {
          setRoomObject(roomArray);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (roomObject.length > 0) {
      countTotal();
    }
  }, [roomObject]);

  // useEffect(() => {
  //   if (quotFormData) {
  //     setAccommodationObject((prevState) => ({
  //       ...prevState,
  //       quotTotalPeoples: quotFormData.quotTotalPeoples,
  //       quotRoomsReqd: quotFormData.quotRoomsReqd,
  //       // childAbove9: quotFormData.childAbove9,
  //       quotTotalExtraBeds: quotFormData.quotTotalExtraBeds,
  //     }));
  //     let roomData = quotFormData.roomData;
  //     //
  //     let roomArray = [];
  //     if (roomData) {
  //       if (roomData && roomData.length > 0 && ( roomData[0].fkQuotId || roomData[0].extraBeds)) {
  //         roomData.forEach((element) => {
  //           roomArray.push({
  //             id: element.id,
  //             isSingleOccupancy: element.isSingleOccupancy == 1 ? true : false,
  //             childAbove9: element.extraBeds,
  //             noExtraBeds: element.noExtraBeds,
  //             freeBeds: element.freeBeds,
  //             extraBeds: element.extraBeds,
  //           });
  //         });
  //
  //         if (roomArray.length > 0 && roomArray[0].extraBeds) {
  //           setRoomObject(roomArray);
  //         }
  //       }
  //     }
  //   }
  // }, [quotFormData]);
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
        <h4 className="form-heading">Accommodation Details</h4>
        
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Total Number of People</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Total No. of People"
              value={accommodationObject.quotTotalPeoples}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotTotalPeoples: newValue,
                  }));
                  dispatch(setQuotationFormData("quotTotalPeoples", newValue));
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotTotalPeoples");
              }}
            />

            <>
              {simpleValidator.current.message(
                "quotTotalPeoples",
                accommodationObject.quotTotalPeoples,
                ["required"],
                {
                  messages: {
                    required: "Please enter total number of people",
                  },
                }
              )}
            </>
          </div>
          <div className="col-sm-6">
            <label>Room(s) Required</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter No. of Rooms Required"
              value={accommodationObject.quotRoomsReqd}
              onChange={(event) => {
                const newValue = event.target.value.trim();
                if (/^\d*$/.test(newValue)) {
                  setAccommodationObject((prevState) => ({
                    ...prevState,
                    quotRoomsReqd: event.target.value,
                  }));
                  dispatch(
                    setQuotationFormData("quotRoomsReqd", event.target.value)
                  );
                  // generateRoomForms(event.target.value);
                }
              }}
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotRoomsReqd");
              }}
            />
            <>
              {simpleValidator.current.message(
                "quotRoomsReqd",
                accommodationObject.quotRoomsReqd,
                ["required"],
                {
                  messages: {
                    required: "Please enter total rooms required",
                  },
                }
              )}
            </>
          </div>
        </div>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            addRoom();
          }}
        >
          Add Room
        </button>
        <br></br>
        <br></br>
        <div className="row">
          {roomObject &&
            roomObject.map((element, index) => (
              <>
                <div className="col-md-4 mb-4">
                  <div className="card  room-card">
                    <h4 className="room-heading">
                      {" "}
                      Room #{index + 1}{" "}
                      {index != 0 && (
                        <ion-icon
                          onClick={() => {
                            removeRoom(index);
                          }}
                          style={{ float: "right" }}
                          name="close-circle"
                        ></ion-icon>
                      )}{" "}
                    </h4>

                    <div className="p-3">
                      <div className="form-group row mb-2">
                        <div className="col-sm-12">
                          <div class="form-check">
                            <label class="form-check-label">
                              <input
                                type="checkbox"
                                id="isSingleOccupancy"
                                name="isSingleOccupancy"
                                onChange={(e) => handleCheckboxChange(e, index)}
                                checked={element.isSingleOccupancy}
                              />
                              Single Occupancy
                              <i class="input-helper"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label>PAX</label>
                          <input
                            type="text"
                            pattern="[0-9]+"
                            className="form-control"
                            value={element.totalPersonsRoom}
                            readOnly={element.isSingleOccupancy}
                            onChange={(event) => {
                              const newValue = event.target.value.trim();
                              if (/^\d*$/.test(newValue)) {
                                const newFormValues = [...roomObject];
                                newFormValues[index].totalPersonsRoom = newValue
                                  ? newValue
                                  : "";
                                setRoomObject(newFormValues);
                                dispatch(
                                  setQuotationFormData(
                                    "roomData",
                                    newFormValues
                                  )
                                );
                              }
                            }}
                            onBlur={() => {
                              simpleValidator.current.showMessageFor(
                                "totalPersonsRoom"
                              );
                            }}
                          />
                          {!element.isSingleOccupancy && (
                            <>
                              {simpleValidator.current.message(
                                "totalPersonsRoom",
                                element.totalPersonsRoom,
                                ["required"],
                                {
                                  messages: {
                                    required:
                                      "Please enter total persons in a room",
                                  },
                                }
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label>
                            Children Above 9 years ( Extra bed required )
                          </label>
                          <input
                            type="text"
                            pattern="[0-9]+"
                            className="form-control"
                            value={element.childAbove9}
                            readOnly={element.isSingleOccupancy}
                            onChange={(event) => {
                              const newValue = event.target.value.trim();
                              if (/^\d*$/.test(newValue)) {
                                const newFormValues = [...roomObject];
                                newFormValues[index].childAbove9 = newValue
                                  ? newValue
                                  : "";
                                setRoomObject(newFormValues);
                                dispatch(
                                  setQuotationFormData(
                                    "roomData",
                                    newFormValues
                                  )
                                );
                                countTotal();
                              }
                            }}
                            onBlur={() => {
                              simpleValidator.current.showMessageFor(
                                "childAbove9"
                              );
                            }}
                          />
                          {!element.isSingleOccupancy && (
                            <>
                              {simpleValidator.current.message(
                                "childAbove9",
                                element.childAbove9,
                                ["required"],
                                {
                                  messages: {
                                    required:
                                      "Please enter childrens above 9 years",
                                  },
                                }
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label>Children between 6 - 8 years</label>
                          <small> ( No extra bed )</small>
                          <br></br>

                          <input
                            type="text"
                            pattern="[0-9]+"
                            className="form-control"
                            value={element.noExtraBeds}
                            readOnly={element.isSingleOccupancy}
                            onChange={(event) => {
                              const newValue = event.target.value.trim();
                              if (/^\d*$/.test(newValue)) {
                                const newFormValues = [...roomObject];
                                newFormValues[index].noExtraBeds = newValue
                                  ? newValue
                                  : "";
                                setRoomObject(newFormValues);
                                dispatch(
                                  setQuotationFormData(
                                    "roomData",
                                    newFormValues
                                  )
                                );
                                countTotal();
                              }
                            }}
                            onBlur={() => {
                              simpleValidator.current.showMessageFor(
                                "noExtraBeds"
                              );
                            }}
                          />
                          {!element.isSingleOccupancy && (
                            <>
                              {simpleValidator.current.message(
                                "noExtraBeds",
                                element.noExtraBeds,
                                ["required"],
                                {
                                  messages: {
                                    required:
                                      "Please enter childrens between age 6 and 8",
                                  },
                                }
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label> Children below 5 years</label>
                          <small>( Free )</small>
                          <input
                            type="text"
                            pattern="[0-9]+"
                            className="form-control"
                            value={element.freeBeds}
                            readOnly={element.isSingleOccupancy}
                            onChange={(event) => {
                              const newValue = event.target.value.trim();
                              if (/^\d*$/.test(newValue)) {
                                const newFormValues = [...roomObject];
                                newFormValues[index].freeBeds = newValue
                                  ? newValue
                                  : "";
                                setRoomObject(newFormValues);
                                dispatch(
                                  setQuotationFormData(
                                    "roomData",
                                    newFormValues
                                  )
                                );
                                countTotal();
                              }
                            }}
                            onBlur={() => {
                              simpleValidator.current.showMessageFor(
                                "freeBeds"
                              );
                            }}
                          />
                          {!element.isSingleOccupancy && (
                            <>
                              {simpleValidator.current.message(
                                "freeBeds",
                                element.freeBeds,
                                ["required"],
                                {
                                  messages: {
                                    required:
                                      "Please enter children below age 5",
                                  },
                                }
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label> Extra Beds</label>
                          <input
                            type="text"
                            pattern="[0-9]+"
                            className="form-control"
                            value={element.extraBeds}
                            readOnly={element.isSingleOccupancy}
                            onChange={(event) => {
                              const newValue = event.target.value.trim();
                              if (/^\d*$/.test(newValue)) {
                                const newFormValues = [...roomObject];
                                newFormValues[index].extraBeds = newValue
                                  ? newValue
                                  : "";
                                setRoomObject(newFormValues);
                                dispatch(
                                  setQuotationFormData(
                                    "roomData",
                                    newFormValues
                                  )
                                );
                                countTotal();
                              }
                            }}
                            onBlur={() => {
                              simpleValidator.current.showMessageFor(
                                "extraBeds"
                              );
                            }}
                          />
                          {!element.isSingleOccupancy && (
                            <>
                              {simpleValidator.current.message(
                                "extraBeds",
                                element.extraBeds,
                                ["required"],
                                {
                                  messages: {
                                    required: "Please enter no. of extra beds",
                                  },
                                }
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <label>Total Extra Beds</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Total Extra Beds"
              value={accommodationObject.quotTotalExtraBeds}
              readOnly
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotTotalExtraBeds");
              }}
            />
          </div>
          <div className="col-sm-6">
            <label>Total No. of Single Occupancy</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter No. of Single Occupancy"
              value={accommodationObject.quotSingleOccupy}
              readOnly
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotSingleOccupy");
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Total No. of CNB</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Total No. of CNB"
              value={accommodationObject.quotChildBtwn8And9}
              readOnly
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotChildBtwn8And9");
              }}
            />
          </div>
          <div className="col-sm-6">
            <label>Total No. of CMP</label>
            <input
              type="text"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Enter Total No. of CMP"
              value={accommodationObject.quotBlw5}
              readOnly
              onBlur={() => {
                simpleValidator.current.showMessageFor("quotBlw5");
              }}
            />
          </div>
        </div>

        <br></br>
      </section>
    </>
  );
};
export default AccommodationDetailsForm;
