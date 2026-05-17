import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../assets/mdi-light_home.png";
import { Link } from "react-router-dom";

const AboutUsBreadcrumb = ({ aboutPageName = "About Us" }) => {
  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        <Link to="/">
          <img
            src={homeIcon}
            alt="home"
            className="center-breadcrumb__home"
          />
        </Link>

        <span className="center-breadcrumb__sep">›</span>

        <span className="center-breadcrumb__current">
          {aboutPageName}
        </span>
      </div>
    </nav>
  );
};

export default AboutUsBreadcrumb;
