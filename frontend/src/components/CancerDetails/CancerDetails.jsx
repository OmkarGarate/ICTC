


// import { useEffect, useState, useRef } from "react";
// import "./CancerDetails.css";
// import MeetOurExperts from "../Home/MeetOurExperts/MeetOurExperts";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCancerBySlug,
//   clearSelectedCancer,
// } from "../../redux/cancers/cancersSlice";

// const TABS = [
//   { label: "Overview",      field: "overview"     },
//   { label: "Risk Factors",  field: "riskFactors"  },
//   { label: "Symptoms",      field: "symptoms"     },
//   { label: "Diagnosis",     field: "diagnosis"    },
//   { label: "Treatment",     field: "treatment"    },
//   { label: "Do's & Don'ts", field: "dosAndDonts"  },
//   { label: "FAQ's",         field: null           }, // handled separately
// ];

// /* ---------- COMPONENT ---------- */

// const CancerDetails = () => {
//   const { slug }   = useParams();
//   const dispatch   = useDispatch();
//   const { selected: cancer, loading, error } = useSelector((s) => s.cancers);

//   const tabsRef = useRef(null);
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [isScrolled, setIsScrolled] = useState(false);

//   /* Fetch on slug change */
//   useEffect(() => {
//     dispatch(fetchCancerBySlug(slug));
//     setActiveTab("Overview");
//     return () => dispatch(clearSelectedCancer());
//   }, [dispatch, slug]);

//   /* Sticky bar shadow */
//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* ── Loading / Error / Not found ── */
//   if (loading) {
//     return (
//       <section className="ictc-cancer-details">
//         <p className="ictc-placeholder-text">Loading…</p>
//       </section>
//     );
//   }

//   if (error || !cancer) {
//     return (
//       <section className="ictc-cancer-details">
//         <h1 className="ictc-cancer-title">Cancer Details Not Found</h1>
//         <p className="ictc-placeholder-text">
//           The requested cancer information is not available.
//         </p>
//       </section>
//     );
//   }

//   /* ── Helpers ── */
//   const handleTabClick = (label) => {
//     setActiveTab(label);
//     if (tabsRef.current) {
//       const top =
//         tabsRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
//       window.scrollTo({ top, behavior: "smooth" });
//     }
//   };

//   const activeField = TABS.find((t) => t.label === activeTab)?.field;

//   return (
//     <>
//       <section className="ictc-cancer-details">
//         {/* INTRO */}
//         {/* <div className="ictc-cancer-intro-block">
//           <h1 className="ictc-cancer-title">{cancer.name}</h1>
//         </div> */}

//         <div className="ictc-cancer-intro-block">
//            <h1 className="ictc-cancer-title">{cancer.name}</h1>
//           {cancer.metaDescription && (
//              <p className="ictc-cancer-intro">{cancer.metaDescription}</p>
//            )}
//          </div>

//         {/* STICKY TABS */}
//         <div
//           ref={tabsRef}
//           className={`ictc-cancer-sticky-bar ${isScrolled ? "scrolled" : ""}`}
//         >
//           <nav className="ictc-cancer-tabs">
//             {TABS.map(({ label }) => (
//               <button
//                 key={label}
//                 className={`ictc-cancer-tab ${activeTab === label ? "active" : ""}`}
//                 onClick={() => handleTabClick(label)}
//               >
//                 {label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* TAB CONTENT */}
//         <article className="ictc-cancer-content">
//           {activeTab === "FAQ's" ? (
//             <>
//               <h2>Frequently Asked Questions</h2>
//               {cancer.faqs?.length ? (
//                 cancer.faqs.map((faq, i) => (
//                   <div key={i} className="ictc-faq-item">
//                     <h4>{faq.question}</h4>
//                     <p>{faq.answer}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="ictc-placeholder-text">No FAQs available.</p>
//               )}
//             </>
//           ) : (
//             <>
//               <h2>{activeTab}</h2>
//               {cancer[activeField] ? (
//                 <div
//                   className="ictc-rich-content"
//                   dangerouslySetInnerHTML={{ __html: cancer[activeField] }}
//                 />
//               ) : (
//                 <p className="ictc-placeholder-text">
//                   Information not available yet.
//                 </p>
//               )}
//             </>
//           )}
//         </article>
//       </section>

//       <MeetOurExperts />
//     </>
//   );
// };

// export default CancerDetails;







import { useEffect, useState, useRef } from "react";
import "./CancerDetails.css";
import MeetOurExperts from "../Home/MeetOurExperts/MeetOurExperts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCancerById,
  clearSelectedCancer,
} from "../../redux/cancers/cancersSlice";

const TABS = [
  { label: "Overview",      field: "overview"     },
  { label: "Risk Factors",  field: "riskFactors"  },
  { label: "Symptoms",      field: "symptoms"     },
  { label: "Diagnosis",     field: "diagnosis"    },
  { label: "Treatment",     field: "treatment"    },
  { label: "Do's & Don'ts", field: "dosAndDonts"  },
  { label: "FAQ's",         field: null           }, // handled separately
];

/* ---------- COMPONENT ---------- */

const CancerDetails = () => {
  const { slug, id }   = useParams();
  const dispatch   = useDispatch();
  const { selected: cancer, loading, error } = useSelector((s) => s.cancers);

  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isScrolled, setIsScrolled] = useState(false);

  /* Fetch on slug change */
  useEffect(() => {
    dispatch(fetchCancerById(id));
    setActiveTab("Overview");
    return () => dispatch(clearSelectedCancer());
  }, [dispatch, id]);

  /* Sticky bar shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Loading / Error / Not found ── */
  if (loading) {
    return (
      <section className="ictc-cancer-details">
        <p className="ictc-placeholder-text">Loading…</p>
      </section>
    );
  }

  if (error || !cancer) {
    return (
      <section className="ictc-cancer-details">
        <h1 className="ictc-cancer-title">Cancer Details Not Found</h1>
        <p className="ictc-placeholder-text">
          The requested cancer information is not available.
        </p>
      </section>
    );
  }

  /* ── Helpers ── */
  const handleTabClick = (label) => {
    setActiveTab(label);
    if (tabsRef.current) {
      const top =
        tabsRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const activeField = TABS.find((t) => t.label === activeTab)?.field;

  return (
    <>
      <section className="ictc-cancer-details">
        {/* INTRO */}
        {/* <div className="ictc-cancer-intro-block">
          <h1 className="ictc-cancer-title">{cancer.name}</h1>
        </div> */}

        <div className="ictc-cancer-intro-block">
           <h1 className="ictc-cancer-title">{cancer.name}</h1>
          {cancer.metaDescription && (
             <p className="ictc-cancer-intro">{cancer.metaDescription}</p>
           )}
         </div>

        {/* STICKY TABS */}
        <div
          ref={tabsRef}
          className={`ictc-cancer-sticky-bar ${isScrolled ? "scrolled" : ""}`}
        >
          <nav className="ictc-cancer-tabs">
            {TABS.map(({ label }) => (
              <button
                key={label}
                className={`ictc-cancer-tab ${activeTab === label ? "active" : ""}`}
                onClick={() => handleTabClick(label)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* TAB CONTENT */}
        <article className="ictc-cancer-content">
          {activeTab === "FAQ's" ? (
            <>
              <h2>Frequently Asked Questions</h2>
              {cancer.faqs?.length ? (
                cancer.faqs.map((faq, i) => (
                  <div key={i} className="ictc-faq-item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))
              ) : (
                <p className="ictc-placeholder-text">No FAQs available.</p>
              )}
            </>
          ) : (
            <>
              <h2>{activeTab}</h2>
              {cancer[activeField] ? (
                <div
                  className="ictc-rich-content"
                  dangerouslySetInnerHTML={{ __html: cancer[activeField] }}
                />
              ) : (
                <p className="ictc-placeholder-text">
                  Information not available yet.
                </p>
              )}
            </>
          )}
        </article>
      </section>

      <MeetOurExperts />
    </>
  );
};

export default CancerDetails;