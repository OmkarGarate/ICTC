import { useState, useEffect } from "react";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../../redux/serviceCategories/serviceCategoriesSlice";

import "./ManageServiceCategories.css";

const emptyCategory = { name: "", slug: "", sequence: 0 };

const ManageServiceCategories = () => {
  const dispatch = useDispatch();
  const { list: categories = [], loading, error } = useSelector(
    (s) => s.serviceCategories
  );

  const [category, setCategory] = useState(emptyCategory);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchServiceCategories());
  }, [dispatch]);

  /* Auto-generate slug from name */
  const handleNameChange = (e) => {
    const name = e.target.value;
    setCategory((prev) => ({
      ...prev,
      name,
      // Only auto-generate if user hasn't manually changed the slug
      slug: editId ? prev.slug : slugify(name, { lower: true, strict: true }),
    }));
  };

  const openAdd = () => {
    setCategory(emptyCategory);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setCategory({ name: item.name, slug: item.slug, sequence: item.sequence ?? 0 });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!category.name.trim()) { alert("Name is required."); return; }
    if (!category.slug.trim()) { alert("Slug is required."); return; }

    const payload = {
      name: category.name.trim(),
      slug: category.slug.trim(),
      sequence: Number(category.sequence) || 0,
    };

    try {
      if (editId) {
        await dispatch(updateServiceCategory({ id: editId, data: payload })).unwrap();
      } else {
        await dispatch(createServiceCategory(payload)).unwrap();
      }
      setShowModal(false);
      setCategory(emptyCategory);
      setEditId(null);
    } catch {
      // Error handled by toast middleware
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category? Services assigned to it will become uncategorised.")) return;
    dispatch(deleteServiceCategory(id));
  };

  return (
    <>
      <div className="admin-centers-page">

        {/* HEADER */}
        <div className="admin-centers-header">
          <div>
            <h2>Service Categories</h2>
            <p className="category-subtitle">
              Create and manage categories — then assign them to services via the Services page.
            </p>
          </div>
          <button className="admin-add-btn" onClick={openAdd}>
            + Add Category
          </button>
        </div>

        {error && <div className="category-error">{error}</div>}

        {/* TABLE */}
        <div className="admin-centers-table-wrapper">
          <table className="admin-centers-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Sequence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 24 }}>Loading…</td>
                </tr>
              )}
              {!loading && categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="category-empty">
                    No categories yet. Click <strong>+ Add Category</strong> to create one.
                  </td>
                </tr>
              )}
              {!loading && categories.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{item.name}</strong></td>
                  <td><code className="slug-chip">{item.slug}</code></td>
                  <td>{item.sequence}</td>
                  <td className="admin-actions">
                    <button className="admin-edit-btn" onClick={() => openEdit(item)}>Edit</button>
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
          <div className="admin-modal category-modal">
            <h3>{editId ? "Edit Category" : "Add Category"}</h3>

            <label>Category Name <span className="req">*</span></label>
            <input
              className="blog-title"
              placeholder="e.g. Treatment Modalities"
              value={category.name}
              onChange={handleNameChange}
            />

            <label>Slug <span className="req">*</span></label>
            <input
              placeholder="e.g. treatment-modalities"
              value={category.slug}
              onChange={(e) =>
                setCategory((p) => ({ ...p, slug: e.target.value }))
              }
            />
            <p className="field-hint">Used in URLs. Auto-generated from name, but you can edit it.</p>

            <label>Display Sequence</label>
            <input
              type="number"
              min={0}
              placeholder="0"
              value={category.sequence}
              onChange={(e) =>
                setCategory((p) => ({ ...p, sequence: e.target.value }))
              }
            />
            <p className="field-hint">Lower number = shown first in the navbar dropdown.</p>

            <div className="admin-modal-actions">
              <button
                className="admin-submit-btn"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving…" : editId ? "Update Category" : "Create Category"}
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
    </>
  );
};

export default ManageServiceCategories;