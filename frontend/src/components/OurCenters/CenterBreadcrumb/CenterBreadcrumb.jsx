import "./CenterBreadcrumb.css";
import homeIcon from "../../../assets/mdi-light_home.png";
import { useNavigate } from "react-router-dom";

const CenterBreadcrumb = ({ center }) => {
  const navigate = useNavigate();

  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        <img
          src={homeIcon}
          alt="home"
          className="center-breadcrumb__home"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <span className="center-breadcrumb__sep">›</span>

        <span
          className="center-breadcrumb__text"
          onClick={() => navigate("/allCenters")}
          style={{ cursor: "pointer" }}
        >
          Our Centres
        </span>

        <span className="center-breadcrumb__sep">›</span>

        <span className="center-breadcrumb__current">
          {center?.fullName || center?.name}
        </span>
      </div>
    </nav>
  );
};

export default CenterBreadcrumb;