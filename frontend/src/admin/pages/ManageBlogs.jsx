import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../../app/axiosinstance";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Dropcursor from "@tiptap/extension-dropcursor";

import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../redux/blogs/blogsSlice";

import { fetchTags } from "../../redux/tags/tagsSlice";

import "./ManageBlogs.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const imgSrc = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
};

const emptyBlog = {
  title:           "",
  slug:            "",
  date:            "",
  category:        "",
  author:          "",
  tags:            [],
  image:           null,
  metaTitle:       "",
  metaDescription: "",
  keywords:        "",
};

const ManageBlogs = () => {
  const dispatch = useDispatch();

  const { list = [], loading } = useSelector((state) => state.blogs || {});
  const { list: tagList = [] }  = useSelector((state) => state.tags  || {});

  const blogs      = Array.isArray(list)    ? list    : [];
  const tagOptions = Array.isArray(tagList)
    ? tagList.map((t) => ({ value: t.id, label: t.tag }))
    : [];

  const [blog, setBlog]               = useState(emptyBlog);
  const [showModal, setShowModal]     = useState(false);
  const [editId, setEditId]           = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchTags());
  }, [dispatch]);

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
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: "Start writing your blog..." }),
    ],
    content: "",
    onUpdate({ editor }) {
      setPreviewHTML(editor.getHTML());
    },
  });

  if (!editor) return null;

  /* ── Cover image dropzone ─────────────────────────────────────────────── */
  const onDrop = (files) => {
    const file = files[0];
    if (!file) return;
    setBlog((prev) => ({
      ...prev,
      image: { file, url: URL.createObjectURL(file) },
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  /* ── Inline content image upload ──────────────────────────────────────────
   * Same pattern as ManageServices / ManageCancers:
   * upload immediately to /blogs/upload-content-image → get a real server URL
   * → insert that URL into the editor.
   * This means the editor JSON always contains real /uploads/... URLs,
   * so the backend never needs to do any placeholder replacement for content images.
   * The image shows correctly on edit because the src IS already a persisted URL.
   * ─────────────────────────────────────────────────────────────────────────── */
  const addImage = () => {
    const input = document.createElement("input");
    input.type   = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setImageUploading(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await axiosInstance.post(
          "/blogs/upload-content-image",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
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

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const resetModal = () => {
    setBlog(emptyBlog);
    setEditId(null);
    editor.commands.clearContent();
  };

  const openCreate = () => {
    resetModal();
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setBlog({
      title:           item.title           || "",
      slug:            item.slug            || "",
      date:            item.date            || "",
      category:        item.category        || "",
      author:          item.author          || "",
      tags: (item.tags || []).map((t) => ({ value: t.id, label: t.tag })),
      // Use API_BASE directly — same pattern as ManageCenters / ManageServices
      image: item.image ? { url: `${API_BASE}${item.image}` } : null,
      metaTitle:       item.metaTitle       || "",
      metaDescription: item.metaDescription || "",
      keywords:        item.keywords        || "",
    });

    if (item.content) {
      const content =
        typeof item.content === "string"
          ? (() => { try { return JSON.parse(item.content); } catch { return item.content; } })()
          : item.content;
      editor.commands.setContent(content);
    } else {
      editor.commands.clearContent();
    }

    setShowModal(true);
  };

  /* ── Save ─────────────────────────────────────────────────────────────── */
  const saveBlog = async () => {
    if (!blog.title.trim()) {
      alert("Title is required.");
      return;
    }

    const resolvedSlug =
      blog.slug || slugify(blog.title, { lower: true, strict: true });

    // Content images are already uploaded; getJSON() has real /uploads/... URLs.
    // No placeholder replacement needed — just stringify as-is.
    const content = editor.getJSON();

    const formData = new FormData();
    formData.append("title",           blog.title);
    formData.append("slug",            resolvedSlug);
    formData.append("date",            blog.date            || "");
    formData.append("category",        blog.category        || "");
    formData.append("author",          blog.author          || "");
    formData.append("metaTitle",       blog.metaTitle       || "");
    formData.append("metaDescription", blog.metaDescription || "");
    formData.append("keywords",        blog.keywords        || "");
    formData.append("content",         JSON.stringify(content));

    // Tags: each ID as a separate field so the backend @Transform picks them up
    blog.tags.forEach((tag) => {
      formData.append("tags", String(tag.value));
    });

    // Cover image — only if a new file was selected
    if (blog.image?.file) {
      formData.append("image", blog.image.file);
    }

    try {
      if (editId) {
        await dispatch(updateBlog({ id: editId, data: formData })).unwrap();
        dispatch(fetchBlogs());
      } else {
        await dispatch(createBlog(formData)).unwrap();
      }
      resetModal();
      setShowModal(false);
    } catch (err) {
      console.error("Blog save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await dispatch(deleteBlog(id));
  };

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <>
      <div className="admin-centers-page">
        <div className="admin-centers-header">
          <h2>Manage Blogs</h2>
          <button className="admin-add-btn" onClick={openCreate}>
            + Add Blog
          </button>
        </div>

        <div className="admin-centers-table-wrapper">
          <table className="admin-centers-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 24 }}>
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && blogs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 24, color: "#94a3b8" }}>
                    No blogs found. Click "+ Add Blog" to create one.
                  </td>
                </tr>
              )}
              {!loading && blogs.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.image ? (
                      <img
                        src={imgSrc(item.image)}
                        className="admin-table-img"
                        alt=""
                      />
                    ) : (
                      <span style={{ color: "#cbd5e1", fontSize: 12 }}>No image</span>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.author || "—"}</td>
                  <td>{item.category || "—"}</td>
                  <td>
                    {item.tags?.length > 0
                      ? item.tags.map((t) => t.tag).join(", ")
                      : "—"}
                  </td>
                  <td>{item.date || "—"}</td>
                  <td className="admin-actions">
                    <button className="admin-edit-btn"   onClick={() => openEdit(item)}>Edit</button>
                    <button className="admin-delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editId ? "Edit Blog" : "Add Blog"}</h3>

            <input
              className="blog-title"
              placeholder="Untitled"
              value={blog.title}
              onChange={(e) => {
                const title = e.target.value;
                setBlog((prev) => ({
                  ...prev,
                  title,
                  slug: editId ? prev.slug : slugify(title, { lower: true, strict: true }),
                }));
              }}
            />

            <div {...getRootProps()} className="hero-upload">
              <input {...getInputProps()} />
              Upload Cover Image
            </div>

            {blog.image && (
              <img
                src={blog.image.url}
                alt="Blog cover"
                className="hero-preview"
              />
            )}

            <div className="meta-grid">
              <div>
                <label>Slug</label>
                <input
                  value={blog.slug}
                  onChange={(e) => setBlog((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="auto-generated from title"
                />
              </div>
              <div>
                <label>Author</label>
                <input
                  value={blog.author}
                  onChange={(e) => setBlog((prev) => ({ ...prev, author: e.target.value }))}
                />
              </div>
              <div>
                <label>Date</label>
                <input
                  type="date"
                  value={blog.date}
                  onChange={(e) => setBlog((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  value={blog.category}
                  onChange={(e) => setBlog((prev) => ({ ...prev, category: e.target.value }))}
                />
              </div>
            </div>

            <div className="tags-section">
              <label>Tags</label>
              <Select
                options={tagOptions}
                isMulti
                value={blog.tags}
                onChange={(val) => setBlog((prev) => ({ ...prev, tags: val || [] }))}
                noOptionsMessage={() => tagOptions.length === 0 ? "No tags available" : "No options"}
              />
            </div>

            <div className="editor-toolbar">
              <button onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
              <button onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
              <button onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
              <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
              <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
              <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
              <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</button>
              <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</button>
              <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</button>
              <button
                onClick={() => {
                  const url = prompt("Enter URL");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
              >
                Link
              </button>
              <button onClick={addImage} disabled={imageUploading}>
                {imageUploading ? "Uploading…" : "Image"}
              </button>
            </div>

            <EditorContent editor={editor} className="notion-editor" />

            <div className="seo-box">
              <h3>SEO Settings</h3>
              <input
                placeholder="Meta Title"
                value={blog.metaTitle}
                onChange={(e) => setBlog((prev) => ({ ...prev, metaTitle: e.target.value }))}
              />
              <textarea
                placeholder="Meta Description"
                value={blog.metaDescription}
                onChange={(e) => setBlog((prev) => ({ ...prev, metaDescription: e.target.value }))}
              />
              <input
                placeholder="Keywords"
                value={blog.keywords}
                onChange={(e) => setBlog((prev) => ({ ...prev, keywords: e.target.value }))}
              />
            </div>

            <div className="admin-modal-actions">
              <button
                className="admin-submit-btn"
                onClick={saveBlog}
                disabled={loading || imageUploading}
              >
                {loading ? "Saving…" : editId ? "Update Blog" : "Publish Blog"}
              </button>
              <button
                className="admin-cancel-btn"
                onClick={() => { resetModal(); setShowModal(false); }}
              >
                Cancel
              </button>
              <button className="publish-btn" onClick={() => setPreviewOpen(true)}>
                Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {previewOpen && (
        <div className="blog-preview-modal">
          <div className="blog-preview-container">
            <button className="preview-close" onClick={() => setPreviewOpen(false)}>
              Close Preview
            </button>

            {blog.image && (
              <img src={blog.image.url} className="preview-hero" alt="" />
            )}

            <h1 className="preview-title">{blog.title || "Blog Title"}</h1>

            <div className="preview-meta">
              {blog.author && <span>By {blog.author}</span>}
              {blog.date   && <span>{blog.date}</span>}
            </div>

            <div
              className="preview-body"
              dangerouslySetInnerHTML={{ __html: previewHTML }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBlogs;