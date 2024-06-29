import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/helpers";
const PrivateRoute = ({ Component }) => {
  const auth = getCookie("ntId");

  return auth ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
