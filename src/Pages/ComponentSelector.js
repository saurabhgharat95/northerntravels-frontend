import { CSSTransition } from "react-transition-group";
import BasicDetailsForm from "./BasicDetailsForm";
import AccommodationDetailsForm from "./AccommodationDetailsForm";
import HotelDetailsForm from "./HotelDetailsForm";
import ItineraryForm from "./ItineraryForm";
import MarkupForm from "./MarkupForm";

const ComponentSelector = ({ selectedTab }) => {
  return (
    <>
      <CSSTransition
        in={selectedTab === 1}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <BasicDetailsForm />
      </CSSTransition>
      <CSSTransition
        in={selectedTab === 2}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <AccommodationDetailsForm />
      </CSSTransition>
      <CSSTransition
        in={selectedTab === 3}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <HotelDetailsForm />
      </CSSTransition>
      <CSSTransition
        in={selectedTab === 4}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <ItineraryForm />
      </CSSTransition>
      <CSSTransition
        in={!selectedTab || selectedTab < 1 || selectedTab > 4}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <MarkupForm />
      </CSSTransition>
    </>
  );
};

export default ComponentSelector;
