
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices } from "../../redux/services/servicesSlice";
// import imgSrc from "../Common/ImgSrc";
// import "./AllServicePage.css";

// function AllServicePage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { list: services, loading } = useSelector((state) => state.services);

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);

//   // Group by category if present, otherwise show flat under "Our Services"
//   const servicesByCategory = services.reduce((acc, service) => {
//     const cat = service.category || "Our Services";
//     if (!acc[cat]) acc[cat] = [];
//     acc[cat].push(service);
//     return acc;
//   }, {});

//   if (loading) {
//     return (
//       <section className="all-services-page">
//         <p style={{ padding: "40px" }}>Loading...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="all-services-page">
//       {Object.entries(servicesByCategory).map(([category, items]) => (
//         <div key={category} style={{ marginBottom: "50px" }}>

//           {/* CATEGORY TITLE */}
//           <h2
//             style={{
//               fontSize: "26px",
//               fontWeight: "700",
//               marginBottom: "25px",
//               color: "rgba(105, 60, 121, 1)",
//               borderLeft: "6px solid rgba(105, 60, 121, 1)",
//               paddingLeft: "12px",
//             }}
//           >
//             {category}
//           </h2>

//           {/* SERVICES GRID */}
//           <div className="services-grid">
//             {items.map((service) => (
//               <div
//                 key={service.slug}
//                 className="service-card"
//                 onClick={() => navigate(`/service/${service.slug}`)}
//               >
//                 <div className="service-icon">
//                   <img src={imgSrc(service.coverImage)} alt={service.title} />
//                 </div>

//                 <div className="service-content">
//                   <h3>{service.title}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

// export default AllServicePage;




import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/services/servicesSlice";
import imgSrc from "../Common/ImgSrc";
import "./AllServicePage.css";

function AllServicePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: services, loading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Group by category if present, otherwise show flat under "Our Services"
  const servicesByCategory = services.reduce((acc, service) => {
    const cat = service.category || "Our Services";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  if (loading) {
    return (
      <section className="all-services-page">
        <p style={{ padding: "40px" }}>Loading...</p>
      </section>
    );
  }

  return (
    <section className="all-services-page">
      {Object.entries(servicesByCategory).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "50px" }}>

          {/* CATEGORY TITLE */}
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "25px",
              color: "rgba(105, 60, 121, 1)",
              borderLeft: "6px solid rgba(105, 60, 121, 1)",
              paddingLeft: "12px",
            }}
          >
            {category}
          </h2>

          {/* SERVICES GRID */}
          <div className="services-grid">
            {items.map((service) => (
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
        </div>
      ))}
    </section>
  );
}

export default AllServicePage;