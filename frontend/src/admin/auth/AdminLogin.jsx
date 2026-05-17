import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchCurrentUser } from "../../redux/auth/authSlice";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async () => {
    if (!username || !password) {
      return alert("Please fill all fields");
    }

    const result = await dispatch(loginUser({ username, password }));

    // After a successful login the cookie is set — fetch the user object
    // so state.auth.user is populated before the redirect
    if (loginUser.fulfilled.match(result)) {
      await dispatch(fetchCurrentUser());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/ctrl");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {error && <p className="error-text">{error}</p>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
