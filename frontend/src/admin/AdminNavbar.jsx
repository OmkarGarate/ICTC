import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AdminNavbar.css";
import { logoutUserAsync } from "../redux/auth/authSlice";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    await dispatch(logoutUserAsync());
    navigate("/ctrl/login");
  };

  return (
    <>
      <div className="admin-navbar">
        <div className="admin-navbar-left">
          <h3>ICTC Admin Panel</h3>
        </div>

        <div className="admin-navbar-right">
          <span className="admin-user">Admin</span>
          <button onClick={() => setShowConfirm(true)}>Logout</button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="logout-overlay" onClick={() => !isLoggingOut && setShowConfirm(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal__icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </div>
            <h2 className="logout-modal__title">Confirm Logout</h2>
            <p className="logout-modal__desc">
              Are you sure you want to log out of the admin panel?
            </p>
            <div className="logout-modal__actions">
              <button
                className="logout-modal__btn logout-modal__btn--cancel"
                onClick={() => setShowConfirm(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className="logout-modal__btn logout-modal__btn--confirm"
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <span className="logout-modal__spinner" />
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;