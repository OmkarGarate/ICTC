// import "./CancersWeTreat.css";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchCancers } from "../../../redux/cancers/cancersSlice";
// import imgSrc from "../../Common/ImgSrc";

// /* ICON IMAGES — kept as fallback when no coverImage is set */
// import cwt1 from "../../../assets/cwt1.png";
// import cwt2 from "../../../assets/cwt2.png";
// import cwt3 from "../../../assets/cwt3.png";
// import cwt4 from "../../../assets/cwt4.png";
// import cwt5 from "../../../assets/cwt5.png";
// import cwt6 from "../../../assets/cwt6.png";
// import cwt7 from "../../../assets/cwt7.png";
// import cwt8 from "../../../assets/cwt8.png";

// /* Slug → fallback icon mapping (matches previously hard-coded list) */
// const FALLBACK_ICONS = {
//   "gastrointestinal-cancer": cwt1,
//   "brain-cancer":            cwt2,
//   "lung-cancer":             cwt8,
//   "urological-cancer":       cwt3,
//   "blood-cancer":            cwt6,
//   "bone-soft-tissue-cancer": cwt7,
//   "breast-cancer":           cwt5,
//   "gynecological-cancer":    cwt4,
// };

// const DEFAULT_ICON = cwt1;

// const CancersWeTreat = () => {
//   const navigate  = useNavigate();
//   const dispatch  = useDispatch();
//   const { list: cancers, loading } = useSelector((state) => state.cancers);

//   useEffect(() => {
//     if (!cancers.length) dispatch(fetchCancers());
//   }, [dispatch, cancers.length]);

//   return (
//     <section className="cancers-ictc">
//       <h2 className="cancers-title">Cancers We Treat</h2>

//       {loading && !cancers.length ? (
//         <p className="cancers-loading">Loading…</p>
//       ) : (
//         <div className="cancers-grid">
//           {cancers.map((cancer) => (
//             <div
//               key={cancer.id}
//               className="cancer-card"
//               onClick={() => navigate(`/cancer/${cancer.slug}`)}
//             >
//               <div className="cancer-icon">
//                 <img
//                   src={
//                     cancer.coverImage
//                       ? imgSrc(cancer.coverImage)
//                       : (FALLBACK_ICONS[cancer.slug] ?? DEFAULT_ICON)
//                   }
//                   alt={cancer.altText || cancer.name}
//                 />
//               </div>
//               <div className="cancer-content">
//                 <h3>{cancer.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default CancersWeTreat;



import "./CancersWeTreat.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCancers } from "../../../redux/cancers/cancersSlice";
import imgSrc from "../../Common/ImgSrc";

/* ICON IMAGES — kept as fallback when no coverImage is set */
import cwt1 from "../../../assets/cwt1.png";
import cwt2 from "../../../assets/cwt2.png";
import cwt3 from "../../../assets/cwt3.png";
import cwt4 from "../../../assets/cwt4.png";
import cwt5 from "../../../assets/cwt5.png";
import cwt6 from "../../../assets/cwt6.png";
import cwt7 from "../../../assets/cwt7.png";
import cwt8 from "../../../assets/cwt8.png";

/* Slug → fallback icon mapping (matches previously hard-coded list) */
const FALLBACK_ICONS = {
  "gastrointestinal-cancer": cwt1,
  "brain-cancer":            cwt2,
  "lung-cancer":             cwt8,
  "urological-cancer":       cwt3,
  "blood-cancer":            cwt6,
  "bone-soft-tissue-cancer": cwt7,
  "breast-cancer":           cwt5,
  "gynecological-cancer":    cwt4,
};

const DEFAULT_ICON = cwt1;

const CancersWeTreat = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { list: cancers, loading } = useSelector((state) => state.cancers);

  useEffect(() => {
    if (!cancers.length) dispatch(fetchCancers());
  }, [dispatch, cancers.length]);

  return (
    <section className="cancers-ictc">
      <h2 className="cancers-title">Cancers We Treat</h2>

      {loading && !cancers.length ? (
        <p className="cancers-loading">Loading…</p>
      ) : (
        <div className="cancers-grid">
          {cancers.map((cancer) => (
            <div
              key={cancer.id}
              className="cancer-card"
              onClick={() => navigate(`/cancer/${cancer.slug}/${cancer.id}`)}
            >
              <div className="cancer-icon">
                <img
                  src={
                    cancer.coverImage
                      ? imgSrc(cancer.coverImage)
                      : (FALLBACK_ICONS[cancer.slug] ?? DEFAULT_ICON)
                  }
                  alt={cancer.altText || cancer.name}
                />
              </div>
              <div className="cancer-content">
                <h3>{cancer.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CancersWeTreat;