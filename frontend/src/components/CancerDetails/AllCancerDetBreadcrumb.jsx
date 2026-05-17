import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../assets/mdi-light_home.png";
import { Link } from "react-router-dom";

const AllCancerDetBreadcrumb = () => {
  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        {/* HOME */}
        <Link to="/">
          <img
            src={homeIcon}
            alt="home"
            className="center-breadcrumb__home"
          />
        </Link>

        <span className="center-breadcrumb__sep">›</span>

        {/* CURRENT PAGE */}
        <span className="center-breadcrumb__current">
          Cancers We Treat
        </span>
      </div>
    </nav>
  );
};

export default AllCancerDetBreadcrumb;
