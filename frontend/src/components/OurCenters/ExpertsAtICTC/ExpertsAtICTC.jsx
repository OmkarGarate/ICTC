// import "./ExpertsAtICTC.css";
// import { useNavigate } from "react-router-dom";
// import imgSrc from "../../Common/ImgSrc";

// const ExpertsAtICTC = ({ center }) => {
//   const navigate = useNavigate();

//   const doctors = center?.doctors || [];

//   if (!center) return null;

//   return (
//     <section className="experts-section-dark">
//       <h2 className="experts-heading">Experts at {center.name}</h2>

//       {doctors.length === 0 ? (
//         <p className="no-doctors">No doctors available at this centre.</p>
//       ) : (
//         doctors.map((doc, index) => (
//           <div
//             key={doc.slug || doc.id}
//             className={`expert-row ${index % 2 !== 0 ? "reverse" : ""}`}
//           >
//             {/* LEFT CARD */}
//             <div className="expert-card">
//               <div className="expert-img">
//                 <img src={imgSrc(doc.image)} alt={doc.name} />
//               </div>

//               <h3>{doc.name}</h3>
//               <p className="expert-short">
//                 {(doc.qualification || "").split(",").map((item, i) => (
//                   <span key={i}>
//                     {item.trim()}
//                     <br />
//                   </span>
//                 ))}
//               </p>

//               <div className="expert-tag">{doc.designation}</div>
//             </div>

//             {/* RIGHT CONTENT */}
//             <div className="expert-content">
//               <h3>{doc.name}</h3>

//               <p className="expert-summary">{doc.summary}</p>

//               <span
//                 className="know-more"
//                 onClick={() => navigate(`/doctor/${doc.slug}`)}
//               >
//                 Know More <span>→</span>
//               </span>
//             </div>
//           </div>
//         ))
//       )}
//     </section>
//   );
// };

// export default ExpertsAtICTC;



import "./ExpertsAtICTC.css";
import { useNavigate } from "react-router-dom";
import imgSrc from "../../Common/ImgSrc";

const ExpertsAtICTC = ({ center }) => {
  const navigate = useNavigate();

  const doctors = center?.doctors || [];

  if (!center) return null;

  return (
    <section className="experts-section-dark">
      <h2 className="experts-heading">Experts at {center.name}</h2>

      {doctors.length === 0 ? (
        <p className="no-doctors">No doctors available at this centre.</p>
      ) : (
        doctors.map((doc, index) => (
          <div
            key={doc.slug || doc.id}
            className={`expert-row ${index % 2 !== 0 ? "reverse" : ""}`}
          >
            {/* LEFT CARD */}
            <div className="expert-card">
              <div className="expert-img">
                <img src={imgSrc(doc.image)} alt={doc.name} />
              </div>

              <h3>{doc.name}</h3>
              <p className="expert-short">
                {(doc.qualification || "").split(",").map((item, i) => (
                  <span key={i}>
                    {item.trim()}
                    <br />
                  </span>
                ))}
              </p>

              <div className="expert-tag">{doc.designation}</div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="expert-content">
              <h3>{doc.name}</h3>

              <p className="expert-summary">{doc.summary}</p>

              <span
                className="know-more"
                onClick={() => navigate(`/doctor/${doc.slug}/${doc.id}`)}
              >
                Know More <span>→</span>
              </span>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ExpertsAtICTC;