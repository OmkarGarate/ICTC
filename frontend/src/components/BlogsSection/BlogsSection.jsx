import "./BlogsSection.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/blogs/blogsSlice";
import imgSrc from "../Common/ImgSrc";

const categories = [
  "Cancer Treatment",
  "Cancer Prevention & Detection",
  "Cancer Awareness",
  "Cost of Care",
  "Diet & Nutrition",
  "Cancer Types",
  "ICTC Cares",
  "Childhood Cancer",
];

const POSTS_PER_PAGE = 6;

const BlogsSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list = [], loading } = useSelector((state) => state.blogs || {});

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blogs = useMemo(() => {
    return Array.isArray(list) ? list : [];
  }, [list]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

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
          <div className="sidebar-card">
            <h3>Categories</h3>
            <ul>
              {categories.map((cat, i) => (
                <li key={i}>{cat}</li>
              ))}
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Latest Posts</h3>
            <ol>
              {blogs.slice(0, 5).map((post, index) => (
                <li
                  key={post.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/blog/${post.id}/${post.slug}`)}
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
          </div>
        </aside>

        {/* BLOG GRID */}
        <div className="blogs-grid">
          {currentBlogs.map((blog) => (
            <div
              className="blog-card"
              key={blog.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/blog/${blog.id}/${blog.slug}`)}
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
          ))}
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            )
          )}

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