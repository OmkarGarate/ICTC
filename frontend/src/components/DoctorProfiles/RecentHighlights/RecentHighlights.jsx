import "./RecentHighlights.css";

/* IMAGES (replace with real assets) */
import thumb1 from "../../../assets/Patient Testimonials Videos (1).png";
import thumb2 from "../../../assets/Patient Testimonials Videos.png";
import thumb3 from "../../../assets/Patient Testimonials Videos (1).png";
import thumb4 from "../../../assets/Patient Testimonials Videos.png";
import thumb5 from "../../../assets/Patient Testimonials Videos (1).png";
import thumb6 from "../../../assets/Patient Testimonials Videos.png";

const highlights = [
  {
    img: thumb1,
    title:
      "Unlocking Insights of Ovarian Cancer Maintenance Therapy | ICTC Dr Rohit Pai",
  },
  {
    img: thumb2,
    title:
      "Hodgkin’s Lymphoma Explained – All You Need to Know with Hematologist Dr Kunal Goyal | ICTC",
  },
  {
    img: thumb3,
    title:
      "4 Common Cancers in Men You Can Prevent | Dr. Salil Patkar's Expert Advice on Early Detection – ICTC",
  },
  {
    img: thumb4,
    title:
      "4 Common Cancers in Men You Can Prevent | Dr. Salil Patkar's Expert Advice on Early Detection – ICTC",
  },
  {
    img: thumb5,
    title:
      "Unlocking Insights of Ovarian Cancer Maintenance Therapy | ICTC Dr Rohit Pai",
  },
  {
    img: thumb6,
    title:
      "Hodgkin’s Lymphoma Explained – All You Need to Know with Hematologist Dr Kunal Goyal | ICTC",
  },
];

const RecentHighlights = () => {
  return (
    <section className="rh-wrapper">
      <h2 className="rh-title">Recent Highlights & News</h2>

      <div className="rh-grid">
        {highlights.map((item, index) => (
          <div className="rh-card" key={index}>
            <div className="rh-thumb">
              <img src={item.img} alt="news" />
            </div>

            <p className="rh-text">{item.title}</p>
          </div>
        ))}
      </div>

      <button className="rh-view-btn">
        View All <span>→</span>
      </button>
    </section>
  );
};

export default RecentHighlights;
