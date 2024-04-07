import { CSSTransition } from "react-transition-group";
import BasicDetailsTourForm from "./BasicDetailsTourForm";
import TourTransportationForm from "./TourTransportationForm";

const TourComponentSelector = ({ selectedTab }) => {
  return (
    <>
      <CSSTransition
        in={selectedTab === 1}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <BasicDetailsTourForm />
      </CSSTransition>
      <CSSTransition
        in={selectedTab === 2}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <TourTransportationForm />
      </CSSTransition>
    </>
  );
};

export default TourComponentSelector;
