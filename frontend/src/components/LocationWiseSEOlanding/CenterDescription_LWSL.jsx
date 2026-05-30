import "./CenterDescription_LWSL.css";
import { useParams } from "react-router-dom";
import centerData from "../../data/centerData";

const CenterDescription_LWSL = () => {
  const { slug } = useParams();

  const center = centerData[slug];

  if (!center) return null;

  return (
    <section className="center-desc-wrapper">
      <div className="center-desc-card">
        {/* LEFT TEXT */}
        <div className="center-desc-content">
          <h2>{`Cancer Care at ${center.name}`}</h2>

          {center.description.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        {/* RIGHT IMAGE */}
        <div className="center-desc-image">
          <img src={center.image} alt={center.name} />
        </div>
      </div>
    </section>
  );
};

export default CenterDescription_LWSL;
