import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../assets/mdi-light_home.png";
import { Link } from "react-router-dom";

const BookSecondAppoinmentBreadcrumb = ({
  bookSecAppPageName = "Book Second Opinion",
}) => {
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
          {bookSecAppPageName}
        </span>
      </div>
    </nav>
  );
};

export default BookSecondAppoinmentBreadcrumb;
