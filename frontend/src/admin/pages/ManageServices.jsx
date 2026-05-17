import { useState, useEffect } from "react";
import slugify from "slugify";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Dropcursor from "@tiptap/extension-dropcursor";

import "./ManageServices.css";

import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../redux/services/servicesSlice";

import { fetchServiceCategories } from "../../redux/serviceCategories/serviceCategoriesSlice";

import axiosInstance from "../../app/axiosinstance";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const emptyService = {
  title: "",
  slug: "",
  image: null,
  altText: "",
  metaTitle: "",
  metaDescription: "",
  faqs: [],
  categoryId: "",
};

const ManageServices = () => {
  const dispatch = useDispatch();

  const { list: services = [], loading, error } = useSelector((s) => s.services);
  const { list: categories = [] } = useSelector((s) => s.serviceCategories);

  const [service, setService] = useState(emptyService);
  const [faq, setFaq] = useState({ question: "", answer: "" });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  /* ── Fetch on mount ─────────────────────────────────────────────────────── */

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchServiceCategories());
  }, [dispatch]);

  /* ── Cover image dropzone ───────────────────────────────────────────────── */

  const onDrop = (files) => {
    setService((prev) => ({ ...prev, image: files[0] }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  /* ── TipTap editor ──────────────────────────────────────────────────────── */

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Highlight,
      Typography,
      Underline,
      Dropcursor,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your service..." }),
    ],
    content: "",
    onUpdate({ editor }) {
      setPreviewHTML(editor.getHTML());
    },
  });

  /* ── Inline image upload (inside editor) ────────────────────────────────── */

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      setImageUploading(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await axiosInstance.post("/services/upload-content-image", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const url = res.data?.data?.url || res.data?.url;
        if (url) editor.chain().focus().setImage({ src: url }).run();
      } catch {
        alert("Image upload failed. Please try again.");
      } finally {
        setImageUploading(false);
      }
    };

    input.click();
  };

  /* ── FAQ ────────────────────────────────────────────────────────────────── */

  const addFAQ = () => {
    if (!faq.question || !faq.answer) return;
    setService((prev) => ({ ...prev, faqs: [...prev.faqs, faq] }));
    setFaq({ question: "", answer: "" });
  };

  const deleteFAQ = (index) => {
    setService((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  /* ── Save (create or update) ────────────────────────────────────────────── */

  const saveService = async () => {
    if (!service.title.trim()) {
      alert("Title is required.");
      return;
    }

    const formData = new FormData();
    formData.append("slug", service.slug || slugify(service.title, { lower: true, strict: true }));
    formData.append("title", service.title);
    formData.append("altText", service.altText || "");
    formData.append("seoTitle", service.metaTitle || "");
    formData.append("metaDescription", service.metaDescription || "");
    formData.append("content", editor ? editor.getHTML() : "");
    formData.append("faqs", JSON.stringify(service.faqs));

    // Append categoryId (null clears it)
    if (service.categoryId) {
      formData.append("categoryId", service.categoryId);
    } else {
      formData.append("categoryId", "");
    }

    if (service.image instanceof File) {
      formData.append("coverImage", service.image);
    }

    try {
      if (editId) {
        await dispatch(updateService({ id: editId, formData })).unwrap();
      } else {
        await dispatch(createService(formData)).unwrap();
      }

      setService(emptyService);
      setEditId(null);
      if (editor) editor.commands.clearContent();
      setShowModal(false);
    } catch {
      // Error toast is fired automatically by toastMiddleware
    }
  };

  /* ── Edit ───────────────────────────────────────────────────────────────── */

  const handleEdit = (item) => {
    setEditId(item.id);
    setService({
      ...item,
      image: item.coverImage || null,
      metaTitle: item.seoTitle || "",
      categoryId: item.categoryId ?? "",
    });
    setShowModal(true);
    if (editor && item.content) {
      editor.commands.setContent(item.content);
    }
  };

  /* ── Delete ─────────────────────────────────────────────────────────────── */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete service?")) return;
    dispatch(deleteService(id));
  };

  /* ── Helpers ────────────────────────────────────────────────────────────── */

  const imgSrc = (path) => {
    if (!path) return null;
    if (path instanceof File) return URL.createObjectURL(path);
    return path.startsWith("http") ? path : `${API_BASE}${path}`;
  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "—";
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "—";
  };

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <>
      <div className="admin-centers-page">

        {/* HEADER */}
        <div className="admin-centers-header">
          <h2>Manage Services</h2>
          <button
            className="admin-add-btn"
            onClick={() => {
              setService(emptyService);
              setEditId(null);
              if (editor) editor.commands.clearContent();
              setShowModal(true);
            }}
          >
            + Add Service
          </button>
        </div>

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

        {/* TABLE */}
        <div className="admin-centers-table-wrapper">
          <table className="admin-centers-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Slug</th>
                <th>SEO Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>Loading...</td>
                </tr>
              )}
              {!loading && Array.isArray(services) && services.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.coverImage && (
                      <img
                        src={imgSrc(item.coverImage)}
                        className="admin-table-img"
                        alt=""
                      />
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <span className="category-badge">
                      {getCategoryName(item.categoryId)}
                    </span>
                  </td>
                  <td>{item.slug}</td>
                  <td>{item.seoTitle}</td>
                  <td className="admin-actions">
                    <button className="admin-edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="admin-delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editId ? "Edit Service" : "Add Service"}</h3>

            <label>Service Title</label>
            <input
              className="blog-title"
              placeholder="Add service title here"
              value={service.title}
              onChange={(e) => setService((p) => ({ ...p, title: e.target.value }))}
            />

            {/* ── CATEGORY DROPDOWN ── */}
            <label>Category</label>
            <select
              className="service-category-select"
              value={service.categoryId ?? ""}
              onChange={(e) =>
                setService((p) => ({
                  ...p,
                  categoryId: e.target.value ? Number(e.target.value) : null,
                }))
              }
            >
              <option value="">— No Category —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="category-hint">
                No categories yet. Go to <strong>Service Categories</strong> in the sidebar to create some.
              </p>
            )}

            <label>Cover Image</label>
            <div {...getRootProps()} className="hero-upload">
              <input {...getInputProps()} />
              Upload Image
            </div>
            {service.image && (
              <img src={imgSrc(service.image)} className="hero-preview" alt="" />
            )}

            <label>Alt Text</label>
            <input
              placeholder="Add image alt text here"
              value={service.altText}
              onChange={(e) => setService((p) => ({ ...p, altText: e.target.value }))}
            />

            <label>SEO Title</label>
            <input
              placeholder="Add title tag here"
              value={service.metaTitle}
              onChange={(e) => setService((p) => ({ ...p, metaTitle: e.target.value }))}
            />

            <label>Meta Description</label>
            <textarea
              placeholder="Add meta description here"
              value={service.metaDescription}
              onChange={(e) => setService((p) => ({ ...p, metaDescription: e.target.value }))}
            />

            <label>Slug</label>
            <input
              placeholder="add-your-page-slug-here"
              value={service.slug}
              onChange={(e) => setService((p) => ({ ...p, slug: e.target.value }))}
            />

            {editor && (
              <div className="editor-toolbar">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
                <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
                <button type="button" onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                  }}
                >
                  Link
                </button>
                <button type="button" onClick={addImage} disabled={imageUploading}>
                  {imageUploading ? "Uploading..." : "Image"}
                </button>
              </div>
            )}

            <EditorContent editor={editor} className="notion-editor" />

            <h3 style={{ marginTop: "40px" }}>FAQs</h3>
            <input
              placeholder="Write your question here"
              value={faq.question}
              onChange={(e) => setFaq((p) => ({ ...p, question: e.target.value }))}
            />
            <textarea
              placeholder="Write your answer here"
              value={faq.answer}
              onChange={(e) => setFaq((p) => ({ ...p, answer: e.target.value }))}
            />
            <button className="publish-btn" type="button" onClick={addFAQ}>Add +</button>

            {service.faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <div>
                  <strong>{f.question}</strong>
                  <p>{f.answer}</p>
                </div>
                <button type="button" onClick={() => deleteFAQ(i)}>❌</button>
              </div>
            ))}

            <div className="admin-modal-actions">
              <button
                className="admin-submit-btn"
                type="button"
                onClick={saveService}
                disabled={loading}
              >
                {loading ? "Saving..." : editId ? "Update Service" : "Create Service"}
              </button>
              <button
                className="admin-cancel-btn"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="publish-btn"
                type="button"
                onClick={() => setPreviewOpen(true)}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {previewOpen && (
        <div className="blog-preview-modal">
          <div className="blog-preview-container">
            <button className="preview-close" type="button" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </button>
            {service.image && (
              <img src={imgSrc(service.image)} className="preview-hero" alt="" />
            )}
            <h1 className="preview-title">{service.title || "Service Title"}</h1>
            <div className="preview-body" dangerouslySetInnerHTML={{ __html: previewHTML }} />
          </div>
        </div>
      )}
    </>
  );
};

export default ManageServices;