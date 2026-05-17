import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../redux/dashboard/dashboardSlice";
import "./AdminDashboard.css";

const CARDS = [
  { label: "Total Centers",  key: "totalCenters" },
  { label: "Total Doctors",  key: "totalDoctors" },
  { label: "Total Blogs",    key: "totalBlogs" },
  { label: "Cancer Types",   key: "cancerTypes" },
  { label: "Services",       key: "services" },
  { label: "Appointments",   key: "appointments" },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="dashboard-wrapper">
      <h1>Welcome to ICTC Admin Dashboard</h1>

      {error && (
        <p style={{ color: "#ef4444", marginBottom: "16px" }}>{error}</p>
      )}

      {!loading && !error && Object.values(stats).every((v) => v === null) && (
        <p style={{ color: "#64748b", marginBottom: "16px" }}>
          No dashboard data available.
        </p>
      )}

      <div className="dashboard-cards">
        {CARDS.map(({ label, key }) => (
          <div className="dashboard-card" key={key}>
            <h4>{label}</h4>
            {loading ? (
              <div className="dashboard-skeleton" />
            ) : (
              <h2>
                {stats[key] !== null && stats[key] !== undefined
                  ? String(stats[key]).padStart(2, "0")
                  : "—"}
              </h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
