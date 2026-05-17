import "./BlogsSection.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchBlogCategories } from "../../redux/blogs/blogsSlice";
import { encryptId } from "../Common/Idcrypto";
import imgSrc from "../Common/ImgSrc";

const POSTS_PER_PAGE = 6;

const BlogsSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    list = [],
    loading,
    categories = [],
    categoriesLoading,
  } = useSelector((state) => state.blogs || {});

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  // Reset page when category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const blogs = useMemo(() => (Array.isArray(list) ? list : []), [list]);

  const filteredBlogs = useMemo(() => {
    if (!selectedCategory) return blogs;
    return blogs.filter((b) => b.category === selectedCategory);
  }, [blogs, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="blogs-wrapper">
        <p style={{ textAlign: "center", padding: "60px 0" }}>Loading blogs...</p>
      </section>
    );
  }

  return (
    <section className="blogs-wrapper">
      <h2 className="blogs-heading">ICTC Blogs</h2>

      <div className="blogs-layout">
        {/* LEFT SIDEBAR */}
        <aside className="blogs-sidebar">
          {/* Categories from backend */}
          <div className="sidebar-card">
            <h3>Categories</h3>

            {categoriesLoading ? (
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading...</p>
            ) : categories.length > 0 ? (
              <ul>
                <li
                  style={{
                    cursor: "pointer",
                    fontWeight: !selectedCategory ? "600" : "400",
                    color: !selectedCategory ? "#0f172a" : undefined,
                  }}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    style={{
                      cursor: "pointer",
                      fontWeight: selectedCategory === cat ? "600" : "400",
                      color: selectedCategory === cat ? "#0f172a" : undefined,
                    }}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat ? null : cat)
                    }
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                No categories yet.
              </p>
            )}
          </div>

          {/* Latest Posts */}
          <div className="sidebar-card">
            <h3>Latest Posts</h3>
            {blogs.length > 0 ? (
              <ol>
                {blogs.slice(0, 5).map((post, index) => (
                  <li
                    key={post.id}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/blog/${encryptId(post.id)}/${post.slug}`)
                    }
                  >
                    <span className="post-index">{index + 1}</span>

                    <div className="pip">
                      <p>{post.title}</p>

                      <div className="tag-row">
                        <span className={`tag ${(post.type || "blog").toLowerCase()}`}>
                          {post.type || "Blog"}
                        </span>
                        <span className="date">{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>No posts yet.</p>
            )}
          </div>
        </aside>

        {/* BLOG GRID */}
        <div className="blogs-grid">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                className="blog-card"
                key={blog.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/blog/${encryptId(blog.id)}/${blog.slug}`)
                }
              >
                {blog.image && (
                  <img src={imgSrc(blog.image)} alt={blog.title} />
                )}

                <div className="blog-card-body">
                  <div className="tag-row">
                    <span className="tag blog">{blog.type || "Blog"}</span>
                    <span className="date">{formatDate(blog.date)}</span>
                  </div>

                  <h4>{blog.title}</h4>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: "40px 0", color: "#64748b" }}>
              {selectedCategory
                ? `No blogs found in "${selectedCategory}".`
                : "No blogs available yet."}
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogsSection;