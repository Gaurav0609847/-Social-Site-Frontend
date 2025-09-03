import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authUser = localStorage.getItem("authUser");
  return authUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
