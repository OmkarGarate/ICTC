// import { useState } from "react";
// import "./ManageDoctors.css";

// /* -----------------------------------------
// AVAILABLE CENTRES
// ----------------------------------------- */

// const availableCentres = [
//   "ICTC Vashi",
//   "ICTC Panvel",
//   "ICTC Kalyan",
//   "ICTC Dombivli",
//   "ICTC Sion"
// ];

// /* -----------------------------------------
// FORM FIELD CONFIG
// ----------------------------------------- */

// const doctorFields = [
//   { name: "slug", label: "Slug" },
//   { name: "name", label: "Doctor Name" },
//   { name: "designation", label: "Designation" },
//   { name: "qualification", label: "Qualification" },
//   { name: "phone", label: "Phone" },
//   { name: "rating", label: "Rating" },
//   { name: "reviews", label: "Reviews" }
// ];

// /* -----------------------------------------
// EMPTY FORM
// ----------------------------------------- */

// const emptyForm = {
//   slug: "",
//   name: "",
//   designation: "",
//   qualification: "",
//   rating: "",
//   reviews: "",
//   phone: "",
//   centres: [],
//   languages: [],
//   stories: [],
//   summary: "",
//   philosophy: "",
//   expertise: [],
//   education: [],
//   experience: [],
//   achievements: [],
//   image: null
// };

// /* -----------------------------------------
// LIST EDITOR COMPONENT
// ----------------------------------------- */

// const ListEditor = ({ label, field, form, setForm }) => {

//   const [input,setInput] = useState("");

//   const addItem = () => {

//     if(!input.trim()) return;

//     setForm({
//       ...form,
//       [field]: [...form[field], input]
//     });

//     setInput("");

//   };

//   const removeItem = (index) => {

//     const updated = [...form[field]];
//     updated.splice(index,1);

//     setForm({
//       ...form,
//       [field]: updated
//     });

//   };

//   return(

//     <div className="admin-upload-section">

//       <label>{label}</label>

//       <div className="admin-list-input">

//         <input
//           value={input}
//           placeholder={`Add ${label}`}
//           onChange={(e)=>setInput(e.target.value)}
//         />

//         <button onClick={addItem}>
//           Add
//         </button>

//       </div>

//       <ul className="admin-tag-list">

//         {form[field].map((item,i)=>(
//           <li key={i}>
//             {item}
//             <span onClick={()=>removeItem(i)}>x</span>
//           </li>
//         ))}

//       </ul>

//     </div>

//   );

// };

// /* -----------------------------------------
// TIMELINE EDITOR
// ----------------------------------------- */

// const TimelineEditor = ({
//   label,
//   field,
//   form,
//   setForm
// }) => {

//   const [title,setTitle] = useState("");
//   const [place,setPlace] = useState("");

//   const addItem = () => {

//     if(!title || !place) return;

//     const newItem =
//       field === "education"
//         ? { title, place }
//         : { role: title, place };

//     setForm({
//       ...form,
//       [field]: [...form[field], newItem]
//     });

//     setTitle("");
//     setPlace("");

//   };

//   const removeItem = (index) => {

//     const updated = [...form[field]];
//     updated.splice(index,1);

//     setForm({
//       ...form,
//       [field]: updated
//     });

//   };

//   return(

//     <div className="admin-upload-section">

//       <label>{label}</label>

//       <div className="admin-education-input">

//         <input
//           placeholder={field === "education" ? "Title" : "Role"}
//           value={title}
//           onChange={(e)=>setTitle(e.target.value)}
//         />

//         <input
//           placeholder="Place"
//           value={place}
//           onChange={(e)=>setPlace(e.target.value)}
//         />

//         <button onClick={addItem}>
//           Add
//         </button>

//       </div>

//       <ul className="admin-tag-list">

//         {form[field].map((item,i)=>(
//           <li key={i}>
//             {(item.title || item.role)} - {item.place}
//             <span onClick={()=>removeItem(i)}>x</span>
//           </li>
//         ))}

//       </ul>

//     </div>

//   );

// };

// /* -----------------------------------------
// MAIN COMPONENT
// ----------------------------------------- */

// const ManageDoctors = () => {

//   const [doctors,setDoctors] = useState([]);
//   const [form,setForm] = useState(emptyForm);

//   const [showModal,setShowModal] = useState(false);
//   const [editId,setEditId] = useState(null);

//   const handleChange = (e) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//   };

//   const handleImageUpload = (e) => {

//     const file = e.target.files[0];
//     if(!file) return;

//     const url = URL.createObjectURL(file);

//     setForm({
//       ...form,
//       image:{file,url}
//     });

//   };

//   const toggleCentre = (centre) => {

//     let updated = [...form.centres];

//     if(updated.includes(centre)){
//       updated = updated.filter(c=>c!==centre);
//     }else{
//       updated.push(centre);
//     }

//     setForm({
//       ...form,
//       centres: updated
//     });

//   };

//   const handleSubmit = () => {

//     const newDoctor = {
//       id: editId || Date.now(),
//       ...form
//     };

//     if(editId){

//       setDoctors(
//         doctors.map(d =>
//           d.id === editId ? newDoctor : d
//         )
//       );

//     }else{

//       setDoctors([...doctors,newDoctor]);

//     }

//     setForm(emptyForm);
//     setEditId(null);
//     setShowModal(false);

//   };

//   const handleEdit = (doc) => {

//     setEditId(doc.id);
//     setForm(doc);
//     setShowModal(true);

//   };

//   const handleDelete = (id) => {

//     if(!window.confirm("Delete doctor?")) return;

//     setDoctors(
//       doctors.filter(d => d.id !== id)
//     );

//   };

//   return(

//     <div className="admin-doctors-page">

//       <div className="admin-doctors-header">

//         <h2>Manage Doctors</h2>

//         <button
//           className="admin-add-btn"
//           onClick={()=>{
//             setForm(emptyForm);
//             setShowModal(true);
//           }}
//         >
//           + Add Doctor
//         </button>

//       </div>

//       {/* TABLE */}

//       <div className="admin-doctors-table-wrapper">

//         <table className="admin-doctors-table">

//           <thead>
//             <tr>
//               <th>Photo</th>
//               <th>Name</th>
//               <th>Designation</th>
//               <th>Centres</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {doctors.map(doc=>(
//               <tr key={doc.id}>

//                 <td>
//                   {doc.image && (
//                     <img
//                       src={doc.image.url}
//                       className="admin-table-img"
//                     />
//                   )}
//                 </td>

//                 <td>{doc.name}</td>
//                 <td>{doc.designation}</td>
//                 <td>{doc.centres.join(", ")}</td>

//                 <td className="admin-actions">

//                   <button
//                     className="admin-edit-btn"
//                     onClick={()=>handleEdit(doc)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="admin-delete-btn"
//                     onClick={()=>handleDelete(doc.id)}
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}

//           </tbody>

//         </table>

//       </div>

//       {/* MODAL */}

//       {showModal && (

//         <div className="admin-modal-overlay">

//           <div className="admin-modal">

//             <h3>{editId ? "Edit Doctor" : "Add Doctor"}</h3>

//             {/* BASIC INPUTS */}

//             <div className="admin-form-grid">

//               {doctorFields.map(field=>(
//                 <input
//                   key={field.name}
//                   name={field.name}
//                   placeholder={field.label}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                 />
//               ))}

//             </div>

//             {/* IMAGE */}

//             <div className="admin-upload-section">

//               <label>Doctor Photo</label>

//               <input
//                 type="file"
//                 onChange={handleImageUpload}
//               />

//               {form.image && (
//                 <img
//                   src={form.image.url}
//                   className="admin-preview-img"
//                 />
//               )}

//             </div>

//             {/* CENTRES */}

//             <div className="admin-upload-section">

//               <label>Centres</label>

//               <div className="admin-checkbox-group">

//                 {availableCentres.map(c=>(
//                   <label key={c}>

//                     <input
//                       type="checkbox"
//                       checked={form.centres.includes(c)}
//                       onChange={()=>toggleCentre(c)}
//                     />

//                     {c}

//                   </label>
//                 ))}

//               </div>

//             </div>

//             {/* LIST SECTIONS */}

//             <ListEditor
//               label="Stories"
//               field="stories"
//               form={form}
//               setForm={setForm}
//             />

//             <ListEditor
//               label="Languages"
//               field="languages"
//               form={form}
//               setForm={setForm}
//             />

//             <ListEditor
//               label="Expertise"
//               field="expertise"
//               form={form}
//               setForm={setForm}
//             />

//             <ListEditor
//               label="Achievements"
//               field="achievements"
//               form={form}
//               setForm={setForm}
//             />

//             {/* TIMELINES */}

//             <TimelineEditor
//               label="Education"
//               field="education"
//               form={form}
//               setForm={setForm}
//             />

//             <TimelineEditor
//               label="Experience"
//               field="experience"
//               form={form}
//               setForm={setForm}
//             />

//             {/* SUMMARY */}

//             <div className="admin-upload-section">

//               <label>Summary</label>

//               <div
//                 contentEditable
//                 className="admin-rich-editor"
//                 onInput={(e)=>setForm({
//                   ...form,
//                   summary:e.currentTarget.innerHTML
//                 })}
//                 dangerouslySetInnerHTML={{
//                   __html:form.summary
//                 }}
//               />

//             </div>

//             {/* PHILOSOPHY */}

//             <div className="admin-upload-section">

//               <label>Philosophy</label>

//               <div
//                 contentEditable
//                 className="admin-rich-editor"
//                 onInput={(e)=>setForm({
//                   ...form,
//                   philosophy:e.currentTarget.innerHTML
//                 })}
//                 dangerouslySetInnerHTML={{
//                   __html:form.philosophy
//                 }}
//               />

//             </div>

//             {/* ACTION BUTTONS */}

//             <div className="admin-modal-actions">

//               <button
//                 className="admin-submit-btn"
//                 onClick={handleSubmit}
//               >
//                 Save Doctor
//               </button>

//               <button
//                 className="admin-cancel-btn"
//                 onClick={()=>setShowModal(false)}
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// };

// export default ManageDoctors;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ManageDoctors.css";

import {
  fetchDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../redux/doctors/doctorsSlice";

import { fetchCenters } from "../../redux/centers/centersSlice";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/* -----------------------------------------
FORM FIELD CONFIG
----------------------------------------- */

const doctorFields = [
  { name: "slug", label: "Slug" },
  { name: "name", label: "Doctor Name" },
  { name: "designation", label: "Designation" },
  { name: "qualification", label: "Qualification" },
  { name: "phone", label: "Phone" },
  { name: "rating", label: "Rating" },
  { name: "reviews", label: "Reviews" },
];

/* -----------------------------------------
EMPTY FORM
----------------------------------------- */

const emptyForm = {
  slug: "",
  name: "",
  designation: "",
  qualification: "",
  rating: "",
  reviews: "",
  phone: "",
  centreIds: [],   // ← numeric IDs matching DB
  languages: [],
  stories: [],
  summary: "",
  philosophy: "",
  expertise: [],
  education: [],
  experience: [],
  achievements: [],
  image: null,
};

/* -----------------------------------------
LIST EDITOR COMPONENT
----------------------------------------- */

const ListEditor = ({ label, field, form, setForm }) => {
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;
    setForm({ ...form, [field]: [...form[field], input] });
    setInput("");
  };

  const removeItem = (index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  return (
    <div className="admin-upload-section">
      <label>{label}</label>
      <div className="admin-list-input">
        <input
          value={input}
          placeholder={`Add ${label}`}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button type="button" onClick={addItem}>Add</button>
      </div>
      <ul className="admin-tag-list">
        {form[field].map((item, i) => (
          <li key={i}>
            {item}
            <span onClick={() => removeItem(i)}>×</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* -----------------------------------------
TIMELINE EDITOR
----------------------------------------- */

const TimelineEditor = ({ label, field, form, setForm }) => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

  const addItem = () => {
    if (!title || !place) return;
    const newItem = field === "education" ? { title, place } : { role: title, place };
    setForm({ ...form, [field]: [...form[field], newItem] });
    setTitle("");
    setPlace("");
  };

  const removeItem = (index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  return (
    <div className="admin-upload-section">
      <label>{label}</label>
      <div className="admin-education-input">
        <input
          placeholder={field === "education" ? "Title" : "Role"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button type="button" onClick={addItem}>Add</button>
      </div>
      <ul className="admin-tag-list">
        {form[field].map((item, i) => (
          <li key={i}>
            {(item.title || item.role)} — {item.place}
            <span onClick={() => removeItem(i)}>×</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* -----------------------------------------
MAIN COMPONENT
----------------------------------------- */

const ManageDoctors = () => {
  const dispatch = useDispatch();

  // ── Redux state ──────────────────────────────────────────────────────────
  const { list: doctors = [], loading, error } = useSelector((s) => s.doctors);

  // Pull centers from Redux so we can show name labels but send numeric IDs
  const { list: centers = [] } = useSelector((s) => s.centers);

  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // ── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchCenters());
  }, [dispatch]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: { file, url: URL.createObjectURL(file) } });
  };

  // Toggle centre by numeric ID
  const toggleCentre = (centreId) => {
    const updated = form.centreIds.includes(centreId)
      ? form.centreIds.filter((id) => id !== centreId)
      : [...form.centreIds, centreId];
    setForm({ ...form, centreIds: updated });
  };

  // Resolve centre IDs → names for display in the table
  const getCentreNames = (centreIds = []) => {
    return centreIds
      .map((id) => centers.find((c) => c.id === id)?.name || `#${id}`)
      .join(", ");
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!form.slug || !form.name) {
      return alert("Slug and Name are required.");
    }

    try {
      const formData = new FormData();

      // Scalar fields
      formData.append("slug", form.slug);
      formData.append("name", form.name);
      formData.append("designation", form.designation || "");
      formData.append("qualification", form.qualification || "");
      formData.append("phone", form.phone || "");
      formData.append("rating", form.rating || "");
      formData.append("reviews", form.reviews || "");
      formData.append("summary", form.summary || "");
      formData.append("philosophy", form.philosophy || "");

      // Arrays — send as JSON strings (backend parseJsonArray handles this)
      formData.append("centreIds", JSON.stringify(form.centreIds));
      formData.append("languages", JSON.stringify(form.languages));
      formData.append("stories", JSON.stringify(form.stories));
      formData.append("expertise", JSON.stringify(form.expertise));
      formData.append("achievements", JSON.stringify(form.achievements));
      formData.append("education", JSON.stringify(form.education));
      formData.append("experience", JSON.stringify(form.experience));

      // Image — only append if it's a new File (not an existing URL)
      if (form.image?.file instanceof File) {
        formData.append("image", form.image.file);
      }

      if (editId) {
        await dispatch(updateDoctor({ id: editId, formData })).unwrap();
      } else {
        await dispatch(createDoctor(formData)).unwrap();
      }

      setForm(emptyForm);
      setEditId(null);
      setShowModal(false);
    } catch (err) {
      alert(typeof err === "string" ? err : err?.message || "Something went wrong");
    }
  };

  // ── Edit ─────────────────────────────────────────────────────────────────

  const handleEdit = (doc) => {
    setEditId(doc.id);
    setForm({
      ...doc,
      // centreIds comes from backend as number[] — keep as-is
      centreIds: Array.isArray(doc.centreIds) ? doc.centreIds : [],
      // Wrap existing image URL into { url } shape (no .file → won't be re-uploaded)
      image: doc.image
        ? { url: doc.image.startsWith("http") ? doc.image : `${API_BASE}${doc.image}` }
        : null,
    });
    setShowModal(true);
  };

  // ── Delete ───────────────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm("Delete doctor?")) return;
    try {
      await dispatch(deleteDoctor(id)).unwrap();
    } catch (err) {
      alert(typeof err === "string" ? err : "Delete failed");
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="admin-doctors-page">

      {/* HEADER */}
      <div className="admin-doctors-header">
        <h2>Manage Doctors</h2>
        <button
          className="admin-add-btn"
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowModal(true);
          }}
        >
          + Add Doctor
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

      {/* TABLE */}
      <div className="admin-doctors-table-wrapper">
        <table className="admin-doctors-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Centres</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>Loading...</td>
              </tr>
            )}
            {!loading && Array.isArray(doctors) && doctors.map((doc) => (
              <tr key={doc.id}>
                <td>
                  {doc.image && (
                    <img
                      src={doc.image.startsWith("http") ? doc.image : `${API_BASE}${doc.image}`}
                      className="admin-table-img"
                      alt={doc.name}
                    />
                  )}
                </td>
                <td>{doc.name}</td>
                <td>{doc.designation}</td>
                <td>{getCentreNames(doc.centreIds)}</td>
                <td className="admin-actions">
                  <button className="admin-edit-btn" onClick={() => handleEdit(doc)}>
                    Edit
                  </button>
                  <button className="admin-delete-btn" onClick={() => handleDelete(doc.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editId ? "Edit Doctor" : "Add Doctor"}</h3>

            {/* BASIC FIELDS */}
            <div className="admin-form-grid">
              {doctorFields.map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  placeholder={field.label}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* IMAGE */}
            <div className="admin-upload-section">
              <label>Doctor Photo</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {form.image?.url && (
                <img
                  src={form.image.url}
                  className="admin-preview-img"
                  alt="Preview"
                />
              )}
            </div>

            {/* CENTRES — real IDs from DB */}
            <div className="admin-upload-section">
              <label>Centres</label>
              {centers.length === 0 ? (
                <p style={{ color: "#888", fontSize: 13 }}>
                  No centres loaded. Make sure centres are created first.
                </p>
              ) : (
                <div className="admin-checkbox-group">
                  {centers.map((c) => (
                    <label key={c.id}>
                      <input
                        type="checkbox"
                        checked={form.centreIds.includes(c.id)}
                        onChange={() => toggleCentre(c.id)}
                      />
                      {c.name}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* LIST SECTIONS */}
            <ListEditor label="Stories (URLs)" field="stories" form={form} setForm={setForm} />
            <ListEditor label="Languages" field="languages" form={form} setForm={setForm} />
            <ListEditor label="Expertise" field="expertise" form={form} setForm={setForm} />
            <ListEditor label="Achievements" field="achievements" form={form} setForm={setForm} />

            {/* TIMELINES */}
            <TimelineEditor label="Education" field="education" form={form} setForm={setForm} />
            <TimelineEditor label="Experience" field="experience" form={form} setForm={setForm} />

            {/* SUMMARY */}
            <div className="admin-upload-section">
              <label>Summary</label>
              <textarea
                className="admin-rich-editor"
                rows={4}
                value={form.summary || ""}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </div>

            {/* PHILOSOPHY */}
            <div className="admin-upload-section">
              <label>Philosophy</label>
              <textarea
                className="admin-rich-editor"
                rows={4}
                value={form.philosophy || ""}
                onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
              />
            </div>

            {/* ACTIONS */}
            <div className="admin-modal-actions">
              <button
                className="admin-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Doctor"}
              </button>
              <button
                className="admin-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;