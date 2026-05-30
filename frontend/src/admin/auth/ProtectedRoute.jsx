import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useSelector((state) => state.auth);

  // Wait until fetchCurrentUser has finished before deciding to redirect.
  // Without this check, on a page refresh the user would always be sent to
  // /ctrl/login because isAuthenticated starts as false.
  if (!initialized) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loader-wrapper">
          <div className="auth-spinner">
            <div className="auth-spinner-ring"></div>
            <div className="auth-spinner-ring"></div>
            <div className="auth-spinner-ring"></div>
          </div>
          <p className="auth-loading-text">Authenticating…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/ctrl/login" replace />;
  }

  return children;
};

export default ProtectedRoute;