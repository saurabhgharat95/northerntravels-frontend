
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import BasicDetailsForm from "./BasicDetailsForm";
import AccommodationDetailsForm from "./AccommodationDetailsForm";
import HotelDetailsForm from "./HotelDetailsForm";
import ItineraryForm from "./ItineraryForm";
import MarkupForm from "./MarkupForm";

const ComponentSelector = React.forwardRef((props, ref) => {
  const [isFormValid, setFormValid] = useState({isBasicDetailsFormValid:false,isAccomFormValid:false,isHotelFormValid:true,isItineraryFormValid:true,isMarkupFormValid:false});

  React.useImperativeHandle(ref, () => ({
    isBasicDetailsFormValid() {
      return isFormValid.isBasicDetailsFormValid;
    },
    isAccomFormValid() {
      return isFormValid.isAccomFormValid;
    },
    isHotelFormValid() {
      return isFormValid.isHotelFormValid;
    },
    isItineraryFormValid() {
      return isFormValid.isItineraryFormValid;
    },
    isMarkupFormValid() {
      return isFormValid.isMarkupFormValid;
    },
  }));
  const handleValidationStatusChange = (isValid,formId) => {
    switch (formId){
      case 1:
        setFormValid(prevState=>({...prevState,isBasicDetailsFormValid:isValid})); 
        break
      case 2:
        setFormValid(prevState=>({...prevState,isAccomFormValid:isValid})); 
        break
      case 3:
        setFormValid(prevState=>({...prevState,isHotelFormValid:isValid})); 
        break
      case 4:
        setFormValid(prevState=>({...prevState,isItineraryFormValid:isValid})); 
        break
      case 5:
        setFormValid(prevState=>({...prevState,isMarkupFormValid:isValid})); 
        break
    }
  };
  return (
    <>
      <CSSTransition
        in={props.selectedTab === 1}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <BasicDetailsForm onValidationStatusChange={handleValidationStatusChange} />
      </CSSTransition>
      <CSSTransition
        in={props.selectedTab === 2}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <AccommodationDetailsForm onValidationStatusChange={handleValidationStatusChange} />
      </CSSTransition>
      <CSSTransition
        in={props.selectedTab === 3}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <HotelDetailsForm onValidationStatusChange={handleValidationStatusChange} />
      </CSSTransition>
      <CSSTransition
        in={props.selectedTab === 4}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <ItineraryForm onValidationStatusChange={handleValidationStatusChange} />
      </CSSTransition>
      <CSSTransition
        in={!props.selectedTab || props.selectedTab < 1 || props.selectedTab > 4}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <MarkupForm onValidationStatusChange={handleValidationStatusChange} />
      </CSSTransition>
    </>
  );
})

export default ComponentSelector;
