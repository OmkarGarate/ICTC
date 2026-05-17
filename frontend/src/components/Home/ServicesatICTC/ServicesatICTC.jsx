
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices } from "../../../redux/services/servicesSlice";
// import imgSrc from "../../Common/ImgSrc";
// import "./ServicesAtICTC.css";

// const ServicesAtICTC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { list: services, loading } = useSelector((state) => state.services);

//   useEffect(() => {
//     if (!services.length) dispatch(fetchServices());
//   }, [dispatch, services.length]);

//   return (
//     <section className="services-ictc">
//       <h2 className="services-title">Services Offered at ICTC</h2>

//       <div className="services-grid">
//         {services.map((service) => (
//           <div
//             key={service.slug}
//             className="service-card"
//             onClick={() => navigate(`/service/${service.slug}`)}
//           >
//             <div className="service-icon">
//               <img src={imgSrc(service.coverImage)} alt={service.title} />
//             </div>

//             <div className="service-content">
//               <h3>{service.title}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className="view-all all-services-btn"
//         onClick={() => navigate("/AllService")}
//       >
//         View All <span>→</span>
//       </button>
//     </section>
//   );
// };

// export default ServicesAtICTC;



import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../redux/services/servicesSlice";
import imgSrc from "../../Common/ImgSrc";
import "./ServicesAtICTC.css";

const ServicesAtICTC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: services, loading } = useSelector((state) => state.services);

  useEffect(() => {
    if (!services.length) dispatch(fetchServices());
  }, [dispatch, services.length]);

  return (
    <section className="services-ictc">
      <h2 className="services-title">Services Offered at ICTC</h2>

      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.slug}
            className="service-card"
            onClick={() => navigate(`/service/${service.slug}/${service.id}`)}
          >
            <div className="service-icon">
              <img src={imgSrc(service.coverImage)} alt={service.title} />
            </div>

            <div className="service-content">
              <h3>{service.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        className="view-all all-services-btn"
        onClick={() => navigate("/AllService")}
      >
        View All <span>→</span>
      </button>
    </section>
  );
};

export default ServicesAtICTC;