import { useState, useEffect } from "react";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCancerCategories,
  createCancerCategory,
  updateCancerCategory,
  deleteCancerCategory,
} from "../../redux/cancerCategories/cancerCategoriesSlice";

import PageLoader from "../common/PageLoader";
import "./ManageServiceCategories.css"; // reuse the same styles

const emptyCategory = { name: "", slug: "", sequence: 0 };

const ManageCancerCategories = () => {
  const dispatch = useDispatch();
  const { list: categories = [], loading, error } = useSelector(
    (s) => s.cancerCategories
  );

  const [category, setCategory] = useState(emptyCategory);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCancerCategories());
  }, [dispatch]);

  /* Auto-generate slug from name */
  const handleNameChange = (e) => {
    const name = e.target.value;
    setCategory((prev) => ({
      ...prev,
      name,
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
        await dispatch(updateCancerCategory({ id: editId, data: payload })).unwrap();
      } else {
        await dispatch(createCancerCategory(payload)).unwrap();
      }
      setShowModal(false);
      setCategory(emptyCategory);
      setEditId(null);
    } catch {
      // Error handled by toast middleware
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category? Cancer types assigned to it will become uncategorised.")) return;
    dispatch(deleteCancerCategory(id));
  };

  return (
    <>
      <div className="admin-centers-page">

        {/* HEADER */}
        <div className="admin-centers-header">
          <div>
            <h2>Cancer Type Categories</h2>
            <p className="category-subtitle">
              Create and manage categories — then assign them to cancer types via the Cancer Types page.
            </p>
          </div>
          <button className="admin-add-btn" onClick={openAdd}>
            + Add Category
          </button>
        </div>

        {error && <div className="category-error">{error}</div>}

        {/* TABLE */}
        <div className="admin-centers-table-wrapper">
          {loading ? (
            /* Skeleton loader: 5 rows, 5 columns (matches table headers) */
            <PageLoader rows={5} cols={5} />
          ) : (
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
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="category-empty">
                      No categories yet. Click <strong>+ Add Category</strong> to create one.
                    </td>
                  </tr>
                )}
                {categories.map((item, idx) => (
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
          )}
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
              placeholder="e.g. Gynaecological Cancers"
              value={category.name}
              onChange={handleNameChange}
            />

            <label>Slug <span className="req">*</span></label>
            <input
              placeholder="e.g. gynaecological-cancers"
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
            <p className="field-hint">Lower number = shown first.</p>

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

export default ManageCancerCategories;