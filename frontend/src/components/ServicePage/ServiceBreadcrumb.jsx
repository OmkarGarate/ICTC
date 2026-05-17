// import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
// import homeIcon from "../../assets/mdi-light_home.png";
// import { useParams, Link } from "react-router-dom";
// import serviceData from "../../data/serviceData";

// const ServiceBreadcrumb = () => {
//   const { slug } = useParams();

//   const serviceName = serviceData[slug]?.name || "Service Details";

//   return (
//     <nav className="center-breadcrumb">
//       <div className="center-breadcrumb__content">
//         {/* HOME */}
//         <Link to="/">
//           <img
//             src={homeIcon}
//             alt="home"
//             className="center-breadcrumb__home"
//           />
//         </Link>

//         <span className="center-breadcrumb__sep">›</span>

//         {/* ALL SERVICES */}
//         <Link to="/AllService" className="center-breadcrumb__text">
//           Services at ICTC
//         </Link>

//         <span className="center-breadcrumb__sep">›</span>

//         {/* CURRENT SERVICE */}
//         <span className="center-breadcrumb__current">
//           {serviceName}
//         </span>
//       </div>
//     </nav>
//   );
// };

// export default ServiceBreadcrumb;



import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import homeIcon from "../../assets/mdi-light_home.png";
import { useParams, Link } from "react-router-dom";
import serviceData from "../../data/serviceData";

const ServiceBreadcrumb = () => {
  const { id } = useParams();

  const serviceName = serviceData[slug]?.name || "Service Details";

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

        {/* ALL SERVICES */}
        <Link to="/AllService" className="center-breadcrumb__text">
          Services at ICTC
        </Link>

        <span className="center-breadcrumb__sep">›</span>

        {/* CURRENT SERVICE */}
        <span className="center-breadcrumb__current">
          {serviceName}
        </span>
      </div>
    </nav>
  );
};

export default ServiceBreadcrumb;
