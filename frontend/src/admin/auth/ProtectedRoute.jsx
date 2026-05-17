import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useSelector((state) => state.auth);

  // Wait until fetchCurrentUser has finished before deciding to redirect.
  // Without this check, on a page refresh the user would always be sent to
  // /ctrl/login because isAuthenticated starts as false.
  if (!initialized) {
    return <div className="auth-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/ctrl/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
