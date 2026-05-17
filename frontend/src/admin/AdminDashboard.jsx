import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h1>Welcome to ICTC Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h4>Total Centers</h4>
          <h2>08</h2>
        </div>

        <div className="dashboard-card">
          <h4>Total Doctors</h4>
          <h2>24</h2>
        </div>

        <div className="dashboard-card">
          <h4>Total Blogs</h4>
          <h2>15</h2>
        </div>

        <div className="dashboard-card">
          <h4>Cancer Types</h4>
          <h2>12</h2>
        </div>

        <div className="dashboard-card">
          <h4>Services</h4>
          <h2>18</h2>
        </div>

        <div className="dashboard-card">
          <h4>Appointments</h4>
          <h2>36</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;