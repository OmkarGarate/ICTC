import { useState } from "react";
import { useParams } from "react-router-dom";
import "./FAQ_ISWL.css";

import arrowIcon from "../../assets/cuida_dropdown-outline.png";
import { slugToCentreName } from "../../data/centerData";

const FAQ_ISWL = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const { slug } = useParams();

  const locationName = (
    slugToCentreName[slug?.toLowerCase()] || "Mumbai"
  ).replace(/^ICTC\s+/i, "");

  const faqs = [
    {
      question: `Where can I get cancer treatment in ${locationName}?`,
      answer: `ICTC provides comprehensive cancer care in ${locationName}, including oncology consultations, chemotherapy, immunotherapy, targeted therapy, cancer screening, and second opinions.`,
    },
    {
      question: `How can I reach the ICTC cancer centre in ${locationName}?`,
      answer:
        "Our centre is conveniently accessible by road and public transport. Contact our team for directions and appointment assistance.",
    },
    {
      question: `Is chemotherapy available in ${locationName}?`,
      answer: `Yes, ICTC offers chemotherapy services in ${locationName} under the supervision of experienced medical oncologists, with personalized treatment plans based on the patient's diagnosis.`,
    },
    {
      question: `How do I book an appointment with a cancer specialist in ${locationName}?`,
      answer: `You can book an appointment online or contact our helpline to consult an experienced oncologist at our ${locationName} centre.`,
    },
    {
      question: `Do I need a referral to see an oncologist in ${locationName}?`,
      answer:
        "No. Patients can directly schedule a consultation with an oncologist for cancer symptoms, diagnosis, treatment planning, or a second opinion.",
    },
    {
      question: `Can I get a second opinion for cancer treatment in ${locationName}?`,
      answer:
        "Yes. Our oncology specialists provide detailed second opinions to help patients understand their diagnosis and explore treatment options confidently.",
    },
    {
      question: `What cancer treatments are available at ICTC in ${locationName}?`,
      answer:
        "Treatment options may include chemotherapy, immunotherapy, targeted therapy, hormonal therapy, supportive care, and coordinated treatment planning depending on the type and stage of cancer.",
    },
  ];

  return (
    <section className="ictc-faq-section">
      <h2 className="ictc-faq-title">FAQ’s</h2>

      <div className="ictc-faq-list">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className={`ictc-faq-item_iswl ${
                isActive ? "active" : ""
              }`}
            >
              <button
                className="ictc-faq-question"
                onClick={() =>
                  setActiveIndex(
                    isActive ? null : index
                  )
                }
              >
                <span>{faq.question}</span>

                <img
                  src={arrowIcon}
                  alt="toggle"
                  className={isActive ? "rotate" : ""}
                />
              </button>

              {isActive && (
                <div className="ictc-faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ_ISWL;