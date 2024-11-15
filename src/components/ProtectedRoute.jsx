import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user[0] === null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
