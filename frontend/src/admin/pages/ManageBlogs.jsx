import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

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
import imgSrc from "../../components/Common/ImgSrc";

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
  const { list: tagList = [] } = useSelector((state) => state.tags  || {});

  const blogs      = Array.isArray(list)    ? list    : [];
  const tagOptions = Array.isArray(tagList)
    ? tagList.map((t) => ({ value: t.id, label: t.tag }))
    : [];

  const [blog, setBlog]               = useState(emptyBlog);
  const [showModal, setShowModal]     = useState(false);
  const [editId, setEditId]           = useState(null);
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

  const onDrop = (files) => {
    const file = files[0];
    if (!file) return;
    setBlog((prev) => ({ ...prev, image: { file, url: URL.createObjectURL(file) } }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const addImage = () => {
    const input = document.createElement("input");
    input.type  = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const openCreate = () => {
    setBlog(emptyBlog);
    setEditId(null);
    editor.commands.clearContent();
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
      tags: (item.tags || []).map((t) => ({
        value: t.id,
        label: t.tag,
      })),
      image: item.image ? { url: imgSrc(item.image) } : null,
      metaTitle:       item.metaTitle       || "",
      metaDescription: item.metaDescription || "",
      keywords:        item.keywords        || "",
    });
    if (item.content) {
      // FIX: guard against double-parse; item.content may already be an object
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

  const saveBlog = async () => {
    // FIX: basic client-side validation before hitting the network
    if (!blog.title.trim()) {
      alert("Title is required.");
      return;
    }

    const formData = new FormData();

    const resolvedSlug =
      blog.slug || slugify(blog.title, { lower: true, strict: true });

    formData.append("title",           blog.title);
    formData.append("slug",            resolvedSlug);
    formData.append("date",            blog.date            || "");
    formData.append("category",        blog.category        || "");
    formData.append("author",          blog.author          || "");
    formData.append("metaTitle",       blog.metaTitle       || "");
    formData.append("metaDescription", blog.metaDescription || "");
    formData.append("keywords",        blog.keywords        || "");

    const content = editor.getJSON();
    const imageFiles = [];

    const processNodes = async (nodes) => {
      for (const node of nodes || []) {
        if (node.type === "image" && node.attrs?.src?.startsWith("data:")) {
          const res = await fetch(node.attrs.src);
          const blob = await res.blob();
          const file = new File(
            [blob],
            `editor-${Date.now()}.png`,
            { type: blob.type }
          );
          imageFiles.push(file);
          node.attrs.src = `__UPLOAD_${imageFiles.length - 1}__`;
        }
        if (node.content) {
          await processNodes(node.content);
        }
      }
    };

    await processNodes(content.content);

    formData.append("content", JSON.stringify(content));

    imageFiles.forEach((file) => {
      formData.append("contentImages", file);
    });

    blog.tags.forEach((tag) => {
      formData.append("tags", tag.value);
    });

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

      setBlog(emptyBlog);
      setEditId(null);
      editor.commands.clearContent();
      setShowModal(false);
    } catch (err) {
      // Error toast is already shown by middleware via error: true
      console.error("Blog save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await dispatch(deleteBlog(id));
  };

  // FIX: unified preview helper — works for both new File blobs and existing URL strings
  const imagePreviewSrc = (img) => {
    if (!img) return null;
    return img.url || null;
  };

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
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && blogs.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.image && (
                      <img
                        src={imgSrc(item.image)}
                        className="admin-table-img"
                        alt=""
                      />
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
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
                src={imagePreviewSrc(blog.image)}
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
              <button onClick={addImage}>Image</button>
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
              <button className="admin-submit-btn" onClick={saveBlog} disabled={loading}>
                {loading ? "Saving…" : editId ? "Update Blog" : "Publish Blog"}
              </button>
              <button className="admin-cancel-btn" onClick={() => setShowModal(false)}>
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
              <img
                src={imagePreviewSrc(blog.image)}
                className="preview-hero"
                alt=""
              />
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