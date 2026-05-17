import "../../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../../assets/mdi-light_home.png";
import { useNavigate } from "react-router-dom";

const DoctorBreadcrumb = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        <img
          src={homeIcon}
          alt="home"
          className="center-breadcrumb__home"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <span className="center-breadcrumb__sep">›</span>

        <span
          className="center-breadcrumb__text"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/ourDoctors")}
        >
          Doctors at ICTC
        </span>

        <span className="center-breadcrumb__sep">›</span>

        <span className="center-breadcrumb__current">
          {doctor?.name || "Doctor Profile"}
        </span>
      </div>
    </nav>
  );
};

export default DoctorBreadcrumb;