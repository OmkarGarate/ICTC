import "./WhyChooseICTC.css";

import imgAffordable from "../../../assets/whyUs1.png";
import imgLargest from "../../../assets/whyUs2.png";
import imgExpertise from "../../../assets/whyUs3.png";
import imgPatient from "../../../assets/whyUs4.png";

const cards = [
  
  {
  title: "Mumbai’s Largest Accessible Cancer Care",
  image: imgLargest,
},
{
  title: "Unmatched Expertise From Premier Institutions",
  image: imgExpertise,
},
{
  title: "Affordable And Compassionate Cancer Care",
  image: imgAffordable,
},
{
  title: "Patient Centric And Holistic Care",
  image: imgPatient,
},

];

const WhyChooseICTC = () => {
  return (
    <section className="why-ictc">
      <h2 className="why-title">Why Choose ICTC</h2>

      <div className="why-grid">
        {cards.map((card, index) => (
          <div className="why-card" key={index}>
            <div className="why-card-content">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>

            <div className="why-card-image">
              <img src={card.image} alt={card.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseICTC;
