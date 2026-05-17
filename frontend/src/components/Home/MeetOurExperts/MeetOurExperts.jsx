// import { useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDoctors } from "../../../redux/doctors/doctorsSlice";
// import imgSrc from "../../Common/ImgSrc";
// import "./MeetOurExperts.css";

// const MeetOurExperts = () => {
//   const sliderRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { list: doctors } = useSelector((state) => state.doctors);

//   useEffect(() => {
//     if (!doctors.length) dispatch(fetchDoctors());
//   }, [dispatch, doctors.length]);

//   const scrollLeft = () => {
//     sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
//   };

//   const goToDoctorProfile = (slug) => {
//     navigate(`/doctor/${slug}`);
//   };

//   return (
//     <section className="experts-section">
//       {/* HEADER */}
//       <div className="experts-header">
//         <h2>Meet Our Experts</h2>

//         <div className="nav-buttons">
//           <button onClick={scrollLeft}>←</button>
//           <button onClick={scrollRight}>→</button>
//         </div>
//       </div>

//       {/* SLIDER */}
//       <div className="experts-slider" ref={sliderRef}>
//         {doctors.map((doc) => (
//           <div
//             className="doctor-card-home"
//             key={doc.id}
//             onClick={() => goToDoctorProfile(doc.slug)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") goToDoctorProfile(doc.slug);
//             }}
//           >
//             {/* IMAGE + HOVER */}
//             <div className="doctor-img-wrapper">
//               <img src={imgSrc(doc.image)} alt={doc.name} />

//               <div className="doctor-hover">
//                 <button
//                   className="view-profile-btn"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToDoctorProfile(doc.slug);
//                   }}
//                 >
//                   View Complete Profile <span>→</span>
//                 </button>
//               </div>
//             </div>

//             {/* CONTENT */}
//             <div className="doctor-content">
//               <h3>{doc.name}</h3>
//               <p className="doctor-qualification">
//                 {(doc.qualification || "").split(",").map((item, index) => (
//                   <span key={index}>
//                     {item.trim()}
//                     <br />
//                   </span>
//                 ))}
//               </p>
//             </div>

//             {/* TAG */}
//             <div className="doctor-tag">{doc.designation}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MeetOurExperts;



import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../../redux/doctors/doctorsSlice";
import imgSrc from "../../Common/ImgSrc";
import "./MeetOurExperts.css";

const MeetOurExperts = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: doctors   } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (!doctors.length) dispatch(fetchDoctors());
  }, [dispatch, doctors.length]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  const goToDoctorProfile = (doc) => {
    navigate(`/doctor/${doc.slug}/${doc.id}`);
  };

  return (
    <section className="experts-section">
      {/* HEADER */}
      <div className="experts-header">
        <h2>Meet Our Experts</h2>

        <div className="nav-buttons">
          <button onClick={scrollLeft}>←</button>
          <button onClick={scrollRight}>→</button>
        </div>
      </div>

      {/* SLIDER */}
      <div className="experts-slider" ref={sliderRef}>
        {doctors.map((doc) => (
          <div
            className="doctor-card-home"
            key={doc.id}
            onClick={() => goToDoctorProfile(doc)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToDoctorProfile(doc);
            }}
          >
            {/* IMAGE + HOVER */}
            <div className="doctor-img-wrapper">
              <img src={imgSrc(doc.image)} alt={doc.name} />

              <div className="doctor-hover">
                <button
                  className="view-profile-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToDoctorProfile(doc);
                  }}
                >
                  View Complete Profile <span>→</span>
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="doctor-content">
              <h3>{doc.name}</h3>
              <p className="doctor-qualification">
                {(doc.qualification || "").split(",").map((item, index) => (
                  <span key={index}>
                    {item.trim()}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            {/* TAG */}
            <div className="doctor-tag">{doc.designation}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurExperts;