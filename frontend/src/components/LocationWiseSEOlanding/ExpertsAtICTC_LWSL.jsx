import "./ExpertsAtICTC_LWSL.css";
import { useParams, useNavigate } from "react-router-dom";
import doctorData from "../../data/doctorData";
import centerData from "../../data/centerData";

const ExpertsAtICTC_LWSL = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const centre = centerData[slug];

  if (!centre) return null;

  const doctors = Object.values(doctorData).filter((doctor) =>
    doctor.centres?.includes(centre.name)
  );

  return (
    <section className="experts-section-dark">
      <h2 className="experts-heading">
        Experts at {centre.name}
      </h2>

      {doctors.length === 0 ? (
        <p className="no-doctors">
          No doctors available at this centre.
        </p>
      ) : (
        doctors.map((doc, index) => (
          <div
            key={doc.slug}
            className={`expert-row ${
              index % 2 !== 0 ? "reverse" : ""
            }`}
          >
            {/* LEFT CARD */}
            <div className="expert-card">
              <div className="expert-img">
                <img src={doc.image} alt={doc.name} />
              </div>

              <h3>{doc.name}</h3>

              <p className="expert-short">
                {doc.qualification
                  ?.split(",")
                  .map((item, idx) => (
                    <span key={idx}>
                      {item.trim()}
                      <br />
                    </span>
                  ))}
              </p>

              <div className="expert-tag">
                {doc.designation}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="expert-content">
              <h3>{doc.name}</h3>

              <p className="expert-summary">
                {doc.summary}
              </p>

              <span
                className="know-more"
                onClick={() =>
                  navigate(`/doctor/${doc.slug}`)
                }
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

export default ExpertsAtICTC_LWSL;