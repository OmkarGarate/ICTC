import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminDashboard from "./AdminDashboard";

import ManageCenters from "./pages/ManageCenters";
import ManageDoctors from "./pages/ManageDoctors";
import ManageBlogs from "./pages/ManageBlogs";
import ManageCancers from "./pages/ManageCancers";
import ManageServices from "./pages/ManageServices";
import ManageServiceCategories from "./pages/ManageServiceCategories";
import ManageCancerCategories from "./pages/Managecancercategories";
import ManageTestimonials from "./pages/ManageTestimonials";
import ManageAppointments from "./pages/ManageAppointments";

import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <div className="admin-content">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="centers" element={<ManageCenters />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="cancers" element={<ManageCancers />} />
            <Route path="cancer-categories" element={<ManageCancerCategories />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="service-categories" element={<ManageServiceCategories />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="appointments" element={<ManageAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;