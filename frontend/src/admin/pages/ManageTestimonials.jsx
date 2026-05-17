import { useState } from "react";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [text, setText] = useState("");

  const addTestimonial = () => {
    if (!text) return;
    setTestimonials([...testimonials, { id: Date.now(), text }]);
    setText("");
  };

  return (
    <div>
      <h2>Manage Testimonials</h2>

      <textarea
        placeholder="Testimonial"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTestimonial}>Add</button>

      <ul>
        {testimonials.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTestimonials;