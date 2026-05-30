import "./ServicesAtICTC_LWSL.css";
import { useParams, useNavigate } from "react-router-dom";
import centerData from "../../data/centerData";
import serviceData from "../../data/serviceData";

const ALLOWED_CATEGORIES = [
  "Treatment Modalities",
  "Diagnostic & Support Services",
];

const ServicesAtICTC_LWSL = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

    const centre = centerData[slug];

  if (!centre) return null;

  const filteredServices = Object.entries(serviceData).filter(
    ([, service]) => ALLOWED_CATEGORIES.includes(service.category)
  );

  return (
    <section className="services-ictc">
      <h2 className="services-title">Services at  {centre.name}</h2>

      <div className="services-grid">
        {filteredServices.map(([slug, service]) => (
          <div
            key={slug}
            className="service-card"
            onClick={() => navigate(`/service/${slug}`)}
          >
            <div className="service-icon">
              <img src={service.icon} alt={service.name} />
            </div>

            <div className="service-content">
              <h3>{service.name}</h3>
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

export default ServicesAtICTC_LWSL;
