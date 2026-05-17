import "./AboutUs.css";
import { useNavigate } from "react-router-dom";

/* ICONS */
import arrowDefault from "../../assets/tabler_arrow-up.png";

import OurDoctorTeam from "../OurDoctorTeam/OurDoctorTeam";

const stats = [
  {
    value: "55000+",
    title: "Patients Treated",
    desc: "Largest Cancer Care Chain in Mumbai",
    showArrow: false,
  },
  {
    value: "11",
    title: "Centres & Growing",
    desc: "Largest Cancer Care Chain in Mumbai",
    showArrow: true,
    link: "/allCenters", // ✅ ADD
  },
  {
    value: "25000+",
    title: "Chemotherapies an year",
    desc: "Largest Cancer Care Chain in Mumbai",
    showArrow: false,
  },
  {
    value: "15+",
    title: "Cancer Care Services",
    desc: "Largest Cancer Care Chain in Mumbai",
    showArrow: true,
    link: "/AllService", // ✅ ADD
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="ictc-about">
        {/* CONTENT */}
        <h2 className="ictc-about-title">About ICTC</h2>

        <div className="ictc-about-content">
          <p>
            At ICTC, we are dedicated to providing{" "}
            <span>compassionate, high-quality cancer treatment</span> that
            remains <span>affordable</span> for everyone.
          </p>

          <p>
            Founded by a team of expert doctors from renowned institutions such
            as <span>TATA</span>, <span>AIIMS Delhi</span>, and{" "}
            <span>GCRI</span>, ensuring every patient receives care guided by
            world-class medical expertise and unwavering support.
          </p>
        </div>

        {/* STATS */}
        <div className="ictc-about-stats">
          {stats.map((item, index) => (
            <div
              className="ictc-stat-card"
              key={index}
              onClick={() => item.link && navigate(item.link)}
              style={{ cursor: item.link ? "pointer" : "default" }}
            >
              <div className="ictc-stat-top">
                <span className="ictc-stat-value">{item.value}</span>

                {item.showArrow && (
                  <div className="ictc-arrow">
                    <img src={arrowDefault} alt="arrow" />
                  </div>
                )}
              </div>

              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <OurDoctorTeam />
    </>
  );
};

export default AboutUs;
