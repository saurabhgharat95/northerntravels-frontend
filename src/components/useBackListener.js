import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export const useBackListener = (formModule, setFormModule, callback) => {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const handlePopState = (event) => {
      if (navType === "POP" && location.key !== "default") {
        if (formModule === "room") {
          callback();
        } else {
          event.preventDefault(); // Prevent the default behavior of the back button
          window.history.pushState(null, "", window.location.pathname); // Push the current state to the history stack
          setFormModule("hotel");
        }
      }
    };

    // Push initial state to history
    window.history.pushState(null, "", window.location.pathname);

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navType, formModule, setFormModule, callback]);
};
