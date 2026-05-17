import "./CenterDescription.css";
import imgSrc from "../../Common/ImgSrc";

const CenterDescription = ({ center }) => {
  if (!center) return null;

  return (
    <section className="center-desc-wrapper">
      <div className="center-desc-card">
        {/* LEFT TEXT */}
        <div className="center-desc-content">
          <h2>{`Cancer Care at ${center.name}`}</h2>

          {(center.description || []).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        {/* RIGHT IMAGE */}
        <div className="center-desc-image">
          <img src={imgSrc(center.centerImage)} alt={center.name} />
        </div>
      </div>
    </section>
  );
};

export default CenterDescription;