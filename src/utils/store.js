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
  quotationFormData: {
    quotId: "",
    quotPackage: "",
    quotSeason: "",
    fkTourId: "",
    stateIds: [],
    tourData: "",
    quotClientName: "",
    fkLeadId: "",
    quotMobileNo: "",
    quotWhatsAppNo: "",
    quotEmail: "",
    quotStartPointId: "",
    quotEndPointId: "",
    quotArrivalDate: "",
    quotDepartureDate: "",
    quotDays: "",
    quotNights: "",
    quotTotalPeoples: "",
    quotRoomsReqd: "",
    quotChildAbove9: "",
    quotChildBtwn8And9: "",
    quotBlw5: "",
    quotTotalExtraBeds: "",
    quotSingleOccupy: "",
    itineraryPPAmt: "",
    addOnPPAMt: "",
    roomData: [],
    quotAccData: [],
    quotPackageNameArray: [],
    quotPackageData: [],
    quotItineraryData: [],
    quotPackageReadOnly:"",
    quotBeforeMarkup: "",
    quotMarkup: "",
    quotAfterMarkup: "",
    quotCompanyName: "",
    quotCorporateOffice: "",
    quotRegionalOffice: "",
    quotCompanyHotline: "",
    quotCompanyEmail: "",
    quotCompanyWebsite: "",
    quotLogo: "",
    quotCompanyLogo: "",
  },
};

export const setTourFormData = (field, value) => ({
  type: "SET_TOUR_FORM_DATA",
  payload: { field, value },
});

export const setQuotationFormData = (field, value) => ({
  type: "SET_QUOTATION_FORM_DATA",
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
    case "SET_QUOTATION_FORM_DATA":
      return {
        ...state,
        quotationFormData: {
          ...state.quotationFormData,
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
        quotationFormData: {
          quotId: "",
          quotPackage: "",
          quotSeason: "",
          fkTourId: "",
          tourData: "",
          stateIds: [],
          quotClientName: "",
          fkLeadId: "",
          quotMobileNo: "",
          quotWhatsAppNo: "",
          quotEmail: "",
          quotStartPointId: "",
          quotEndPointId: "",
          quotArrivalDate: "",
          quotDepartureDate: "",
          quotDays: "",
          quotNights: "",
          quotTotalPeoples: "",
          quotSingleOccupy: "",
          quotRoomsReqd: "",
          quotChildAbove9: "",
          quotChildBtwn8And9: "",
          quotBlw5: "",
          itineraryPPAmt: "",
          addOnPPAMt: "",
          quotTotalExtraBeds: "",
          roomData: [],
          quotAccData: [],
          quotPackageNameArray: [],
          quotPackageData: [],
          quotItineraryData: [],
          quotPackageReadOnly:"",
          quotBeforeMarkup: "",
          quotMarkup: "",
          quotAfterMarkup: "",
          quotCompanyName: "",
          quotCorporateOffice: "",
          quotRegionalOffice: "",
          quotCompanyHotline: "",
          quotCompanyEmail: "",
          quotCompanyWebsite: "",
          quotLogo: "",
          quotCompanyLogo: "",
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
  form: formReducer,
});

const store = createStore(rootReducer);

export default store;
