import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../assets/mdi-light_home.png";
import { useNavigate } from "react-router-dom";

const AllDoctorsBreadcrumb = ({ docPageName = "Doctors at ICTC" }) => {
  const navigate = useNavigate();

  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        {/* HOME */}
        <img
          src={homeIcon}
          alt="home"
          className="center-breadcrumb__home"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <span className="center-breadcrumb__sep">›</span>

        {/* CURRENT PAGE */}
        <span className="center-breadcrumb__current">
          {docPageName}
        </span>
      </div>
    </nav>
  );
};

export default AllDoctorsBreadcrumb;
