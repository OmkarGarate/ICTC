


// import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
// import homeIcon from "../../assets/mdi-light_home.png";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const CancerDetBreadcrumb = () => {
//   const cancer = useSelector((s) => s.cancers.selected);
//   const cancerName = cancer?.name || "Cancer Details";

//   return (
//     <nav className="center-breadcrumb">
//       <div className="center-breadcrumb__content">
//         {/* HOME */}
//         <Link to="/">
//           <img src={homeIcon} alt="home" className="center-breadcrumb__home" />
//         </Link>

//         <span className="center-breadcrumb__sep">›</span>

//         {/* ALL CANCERS */}
//         <Link to="/AllCancer" className="center-breadcrumb__text">
//           Cancers We Treat
//         </Link>

//         <span className="center-breadcrumb__sep">›</span>

//         {/* CURRENT PAGE */}
//         <span className="center-breadcrumb__current">{cancerName}</span>
//       </div>
//     </nav>
//   );
// };

// export default CancerDetBreadcrumb;







import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../assets/mdi-light_home.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CancerDetBreadcrumb = () => {
  const cancer = useSelector((s) => s.cancers.selected);
  const cancerName = cancer?.name || "Cancer Details";

  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        {/* HOME */}
        <Link to="/">
          <img src={homeIcon} alt="home" className="center-breadcrumb__home" />
        </Link>

        <span className="center-breadcrumb__sep">›</span>

        {/* ALL CANCERS */}
        <Link to="/AllCancer" className="center-breadcrumb__text">
          Cancers We Treat
        </Link>

        <span className="center-breadcrumb__sep">›</span>

        {/* CURRENT PAGE */}
        <span className="center-breadcrumb__current">{cancerName}</span>
      </div>
    </nav>
  );
};

export default CancerDetBreadcrumb;