


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServiceBySlug, clearSelectedService } from "../../redux/services/servicesSlice";
// import imgSrc from "../Common/ImgSrc";
// import "./ServicePage.css";

// import arrowIcon from "../../assets/cuida_dropdown-outline.png";

// const ServicePage = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();
//   const { selected: data, loading, error } = useSelector((state) => state.services);
//   const [activeIndex, setActiveIndex] = useState(null);

//   useEffect(() => {
//     dispatch(fetchServiceBySlug(slug));
//     return () => dispatch(clearSelectedService());
//   }, [slug, dispatch]);

//   if (loading) {
//     return (
//       <section className="ictc-service-page">
//         <p style={{ padding: "40px" }}>Loading...</p>
//       </section>
//     );
//   }

//   if (error || !data) {
//     return (
//       <section className="ictc-service-page">
//         <h2 style={{ padding: "40px" }}>Service details not found</h2>
//       </section>
//     );
//   }

//   return (
//     <section className="ictc-service-page">
//       {/* HERO */}
//       <div className="ictc-service-hero-card">
//         <img src={imgSrc(data.coverImage)} alt={data.title} />
//         <div className="ictc-service-hero-title">{data.title}</div>
//       </div>

//       {/* RICH HTML CONTENT from TipTap editor */}
//       {data.content && (
//         <div
//           className="ictc-service-content"
//           dangerouslySetInnerHTML={{ __html: data.content }}
//         />
//       )}

//       {/* FAQ */}
//       {data.faqs?.length > 0 && (
//         <div className="ictc-service-faq">
//           <h2>FAQ's</h2>

//           {data.faqs.map((faq, index) => {
//             const isActive = activeIndex === index;

//             return (
//               <div
//                 key={index}
//                 className={`ictc-faq-item ${isActive ? "ictc-faq-active" : ""}`}
//                 onClick={() => setActiveIndex(isActive ? null : index)}
//               >
//                 <div className="ictc-faq-question">
//                   <span>{faq.question}</span>
//                   <img
//                     src={arrowIcon}
//                     className={isActive ? "rotate" : ""}
//                     alt="toggle"
//                   />
//                 </div>

//                 {isActive && (
//                   <div className="ictc-faq-answer">{faq.answer}</div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// };

// export default ServicePage;







import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById, clearSelectedService } from "../../redux/services/servicesSlice";
import imgSrc from "../Common/ImgSrc";
import "./ServicePage.css";

import arrowIcon from "../../assets/cuida_dropdown-outline.png";

const ServicePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: data, loading, error } = useSelector((state) => state.services);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchServiceById(id));
    return () => dispatch(clearSelectedService());
  }, [slug, dispatch]);

  if (loading) {
    return (
      <section className="ictc-service-page">
        <p style={{ padding: "40px" }}>Loading...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="ictc-service-page">
        <h2 style={{ padding: "40px" }}>Service details not found</h2>
      </section>
    );
  }

  return (
    <section className="ictc-service-page">
      {/* HERO */}
      <div className="ictc-service-hero-card">
        <img src={imgSrc(data.coverImage)} alt={data.title} />
        <div className="ictc-service-hero-title">{data.title}</div>
      </div>

      {/* RICH HTML CONTENT from TipTap editor */}
      {data.content && (
        <div
          className="ictc-service-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}

      {/* FAQ */}
      {data.faqs?.length > 0 && (
        <div className="ictc-service-faq">
          <h2>FAQ's</h2>

          {data.faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`ictc-faq-item ${isActive ? "ictc-faq-active" : ""}`}
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <div className="ictc-faq-question">
                  <span>{faq.question}</span>
                  <img
                    src={arrowIcon}
                    className={isActive ? "rotate" : ""}
                    alt="toggle"
                  />
                </div>

                {isActive && (
                  <div className="ictc-faq-answer">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ServicePage;