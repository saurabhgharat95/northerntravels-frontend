import { legacy_createStore as createStore, combineReducers } from "redux";

const initialState = {
  tourFormData: {
    tourName: "",
    tourDescription: "",
    tourAddOnServices: "",
    countryIds: "",
    stateIds: "",
    transitPointIds: "",
    locationIds: "",
    tourVehicle: "",
    tourStartPt: "",
    tourEndPt: "",
    tourOnSeason: "",
    tourOffSeason: "",
  },
};

export const setTourFormData = (field, value) => ({
  type: "SET_TOUR_FORM_DATA",
  payload: { field, value },
});


export const resetFormData = () => ({
  type: "RESET_FORM_DATA",
});

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOUR_FORM_DATA":
      return {
        ...state,
        tourFormData: {
          ...state.tourFormData,
          [action.payload.field]: action.payload.value,
        },
      };
    case "RESET_FORM_DATA":
      return {
        ...state,
        tourFormData: {
          tourName: "",
          tourDescription: "",
          tourAddOnServices: "",
          countryIds: "",
          stateIds: "",
          transitPointIds: "",
          locationIds: "",
          transportationData: "",
        },
      };
    default:
      return state;
  }
};
// const formReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_TOUR_FORM_DATA":
//       return {
//         ...state,
//         tourFormData: {
//           ...state,
//           tourFormData: action.payload,
//         },
//       };
//     case "RESET_FORM_DATA":
//       return {
//         ...state,
//         tourFormData: {
//           tourName: "",
//           tourDescription: "",
//           tourAddOnServices: "",
//           countryIds: "",
//           stateIds: "",
//           transitPointIds: "",
//           locationIds: "",
//           transportationData: "",
//         },
//       };
//     default:
//       return state;
//   }
// };
const rootReducer = combineReducers({
    form:formReducer
})

const store = createStore(rootReducer)

export default store;