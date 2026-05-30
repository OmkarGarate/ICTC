import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchCenters,
  createCenter,
  updateCenter,
  deleteCenter,
} from "../../redux/centers/centersSlice";

import "./ManageCenters.css";

// ✅ Fix 1: No more hardcoded localhost — reads from env at build time
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const emptyForm = {
  slug: "",
  name: "",
  fullName: "",
  rating: "",
  reviews: "",
  phone: "",
  lat: "",
  lng: "",
  mapEmbed: "",
  mapQuery: "",
  address: "",
  timing: "",
  heroBg: null,
  image: null,
  description: "",
  gallery: [],
};

const ManageCenters = () => {
  const dispatch = useDispatch();

  const { list = [], loading } = useSelector((state) => state.centers || {});
  const centers = Array.isArray(list) ? list : [];

  const [form, setForm]             = useState(emptyForm);
  const [showModal, setShowModal]   = useState(false);
  const [editId, setEditId]         = useState(null);
  const [dragIndex, setDragIndex]   = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Fix 2: loading state

  /* ================= FETCH CENTERS ================= */

  useEffect(() => {
    dispatch(fetchCenters());
  }, [dispatch]);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, [field]: { file, url: URL.createObjectURL(file) } });
  };

  /* ================= GALLERY ================= */

  const handleGalleryUpload = (e) => {
    const images = Array.from(e.target.files).map((file) => ({
      file,
      // Store the File object reference — the blob URL is only used for preview
      // inside this render cycle. When we submit we read from .file, so even if
      // the blob URL were revoked the upload still works.
      url: URL.createObjectURL(file),
    }));
    setForm((prev) => ({ ...prev, gallery: [...prev.gallery, ...images] }));
    // Reset the input so the same file can be re-selected if needed
    e.target.value = "";
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...form.gallery];
    newGallery.splice(index, 1);
    setForm({ ...form, gallery: newGallery });
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async () => {
    // Basic validation
    if (!form.slug.trim() || !form.name.trim() || !form.fullName.trim()) {
      toast.error("Slug, Name, and Full Name are required.");
      return;
    }

    const formData = new FormData();

    formData.append("slug",      form.slug);
    formData.append("name",      form.name);
    formData.append("fullName",  form.fullName);
    formData.append("phone",     form.phone);
    formData.append("rating",    form.rating);
    formData.append("reviews",   form.reviews);
    formData.append("timing",    form.timing);
    formData.append("lat",       form.lat);
    formData.append("lng",       form.lng);
    formData.append("mapEmbed",  form.mapEmbed);
    formData.append("mapQuery",  form.mapQuery);
    formData.append("address",   form.address);

    form.description
      .split("\n")
      .filter((d) => d.trim())
      .forEach((desc) => formData.append("description", desc));

    /* ── Files ── */

    if (form.heroBg?.file) {
      formData.append("heroImage", form.heroBg.file);
    }

    if (form.image?.file) {
      formData.append("centerImage", form.image.file);
    }

    /*
     * Gallery — split into two groups:
     *   1. existingGallery: images already on the server (url only, no .file)
     *      → send server-relative path so backend knows to keep them
     *   2. New uploads (.file present) → append as multipart files
     */
    form.gallery.forEach((img) => {
      if (img.file) {
        formData.append("gallery", img.file);
      } else {
        // Existing server image — prefer the stored serverPath, fall back to parsing the URL
        const path = img.serverPath || (() => {
          try {
            return new URL(img.url).pathname;
          } catch {
            return img.url;
          }
        })();
        formData.append("existingGallery", path);
      }
    });

    // ✅ Fix 2: disable button while request is in flight
    setIsSubmitting(true);

    try {
      if (editId) {
        await dispatch(updateCenter({ id: editId, data: formData })).unwrap();
        // toast.success("Center updated successfully!");
      } else {
        await dispatch(createCenter(formData)).unwrap();
        // toast.success("Center created successfully!");
      }

      setForm(emptyForm);
      setEditId(null);
      setShowModal(false);
      dispatch(fetchCenters());
    } catch (err) {
      // ✅ Fix 3: show error to admin instead of silently logging
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (center) => {
    setEditId(center.id);
    setForm({
      ...center,
      // ✅ Fix 1: use API_BASE instead of hardcoded localhost
      heroBg: center.heroImage
        ? { url: `${API_BASE}${center.heroImage}` }
        : null,
      image: center.centerImage
        ? { url: `${API_BASE}${center.centerImage}` }
        : null,
      // Existing server images: url is full URL, no .file → backend keeps them via existingGallery
      gallery: (center.gallery || []).map((img) => ({
        url: `${API_BASE}${img}`,
        serverPath: img, // keep original server-relative path for existingGallery submission
      })),
      description: Array.isArray(center.description)
        ? center.description.join("\n")
        : (center.description || ""),
    });
    setShowModal(true);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this center?")) return;
    try {
      await dispatch(deleteCenter(id)).unwrap();
      // toast.success("Center deleted.");
      dispatch(fetchCenters());
    } catch (err) {
      toast.error("Failed to delete center. Please try again.");
      console.error("Delete error:", err);
    }
  };

  /* ================= DRAG ================= */

  const dragStart = (index) => setDragIndex(index);

  const dragOver = (index) => {
    const newGallery = [...form.gallery];
    const dragged = newGallery[dragIndex];
    newGallery.splice(dragIndex, 1);
    newGallery.splice(index, 0, dragged);
    setDragIndex(index);
    setForm({ ...form, gallery: newGallery });
  };

  /* ================= RENDER ================= */

  return (
    <div className="admin-centers-page">

      <div className="admin-centers-header">
        <h2>Manage ICTC Centers</h2>
        <button
          className="admin-add-btn"
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowModal(true);
          }}
        >
          + Add Center
        </button>
      </div>

      {/* TABLE */}
      <div className="admin-centers-table-wrapper">
        <table className="admin-centers-table">
          <thead>
            <tr>
              <th>Hero</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Slug</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {centers.map((center) => (
              <tr key={center.id}>
                <td>
                  {center.heroImage && (
                    <img
                      // ✅ Fix 1: use API_BASE
                      src={`${API_BASE}${center.heroImage}`}
                      className="admin-table-img"
                      alt={center.name}
                    />
                  )}
                </td>
                <td>{center.name}</td>
                <td>{center.phone}</td>
                <td>{center.slug}</td>
                <td>{center.rating}</td>
                <td className="admin-actions">
                  <button className="admin-edit-btn"   onClick={() => handleEdit(center)}>Edit</button>
                  <button className="admin-delete-btn" onClick={() => handleDelete(center.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">

            <h3>{editId ? "Edit Center" : "Add Center"}</h3>

            <div className="admin-form-grid">
              <input name="slug"      placeholder="Slug"             value={form.slug}      onChange={handleChange} />
              <input name="name"      placeholder="Name"             value={form.name}      onChange={handleChange} />
              <input name="fullName"  placeholder="Full Name"        value={form.fullName}  onChange={handleChange} />
              <input name="phone"     placeholder="Phone"            value={form.phone}     onChange={handleChange} />
              <input name="rating"    placeholder="Rating"           value={form.rating}    onChange={handleChange} />
              <input name="reviews"   placeholder="Reviews"          value={form.reviews}   onChange={handleChange} />
              <input name="timing"    placeholder="Timing"           value={form.timing}    onChange={handleChange} />
              <input name="lat"       placeholder="Latitude"         value={form.lat}       onChange={handleChange} />
              <input name="lng"       placeholder="Longitude"        value={form.lng}       onChange={handleChange} />
              <input name="mapQuery"  placeholder="Map Query"        value={form.mapQuery}  onChange={handleChange} />
              <input name="mapEmbed"  placeholder="Google Map Embed" value={form.mapEmbed}  onChange={handleChange} />
              <textarea name="address" placeholder="Address"         value={form.address}   onChange={handleChange} />
            </div>

            {/* HERO IMAGE */}
            <div className="admin-upload-section">
              <label>Hero Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "heroBg")} />
              {form.heroBg && <img src={form.heroBg.url} className="admin-preview-img" alt="hero preview" />}
            </div>

            {/* CENTER IMAGE */}
            <div className="admin-upload-section">
              <label>Center Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "image")} />
              {form.image && <img src={form.image.url} className="admin-preview-img" alt="center preview" />}
            </div>

            {/* DESCRIPTION */}
            <div className="admin-upload-section">
              <label>Description</label>
              <textarea
                name="description"
                className="admin-rich-editor"
                placeholder="Enter description (one paragraph per line)"
                value={form.description}
                onChange={handleChange}
                rows={6}
              />
            </div>

            {/* GALLERY */}
            <div className="admin-upload-section">
              <label>Gallery Upload</label>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
              <div className="admin-gallery-grid">
                {form.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="admin-gallery-item"
                    draggable
                    onDragStart={() => dragStart(index)}
                    onDragOver={() => dragOver(index)}
                  >
                    <img src={img.url} alt={`gallery-${index}`} />
                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="admin-remove-img"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-modal-actions">
              {/* ✅ Fix 2: disabled + label change while submitting */}
              <button
                className="admin-submit-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : editId ? "Update Center" : "Create Center"}
              </button>
              <button
                className="admin-cancel-btn"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
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

export default ManageCenters;