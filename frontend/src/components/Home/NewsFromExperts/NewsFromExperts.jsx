import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../../../redux/blogs/blogsSlice";
import imgSrc from "../../Common/ImgSrc";
import "./NewsFromExperts.css";

const NewsFromExperts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list = [], loading } = useSelector((state) => state.blogs || {});
  
  const blogs = Array.isArray(list) ? list.slice(0, 4) : [];

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleBlogClick = (item) => {
    navigate(`/blog/${item.id}/${item.slug}`);
  };

  return (
    <section className="news-section">
      <h2 className="news-heading">
        News & Information From Our Experts
      </h2>

      <p className="news-subtitle">
        Get the latest news, important information and updates from ICTC
        experts.
      </p>

      <div className="news-tabs">
        <button className="tab-btn active">From Our Blogs</button>
        <button className="tab-btn">Newsletter</button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
          Loading blogs...
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="news-grid">
          {blogs.map((item) => (
            <div className="news-card" key={item.id}>
              <div className="news-img-wrapper">
                {item.image && (
                  <img src={imgSrc(item.image)} alt={item.title} />
                )}

                <div className="news-badges">
                  {item.date && (
                    <span className="badge">{formatDate(item.date)}</span>
                  )}
                  <span className="badgeType">{item.type || "Blog"}</span>
                </div>
              </div>

              <h3 className="news-title">{item.title}</h3>

              <button
                className="read-more"
                onClick={() => handleBlogClick(item)}
              >
                Read More <span>→</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>
          No blogs available yet.
        </div>
      )}

      {blogs.length > 0 && (
        <button
          className="view-all"
          onClick={() => navigate("/blog")}
        >
          View All <span>→</span>
        </button>
      )}
    </section>
  );
};

export default NewsFromExperts;