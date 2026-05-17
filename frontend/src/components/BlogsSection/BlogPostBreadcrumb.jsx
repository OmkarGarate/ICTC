import "../OurCenters/CenterBreadcrumb/CenterBreadcrumb.css";
import { useParams, useNavigate } from "react-router-dom";
import blogData from "../../data/blogData";
import homeIcon from "../../assets/mdi-light_home.png";

const BlogPostBreadcrumb = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = blogData[slug];

  if (!blog) return null;

  return (
    <nav className="center-breadcrumb">
      <div className="center-breadcrumb__content">
        <img
          src={homeIcon}
          alt="home"
          className="center-breadcrumb__home"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <span className="center-breadcrumb__sep">›</span>

        <span
          className="center-breadcrumb__text"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/blog")}
        >
          Blogs and News
        </span>

        <span className="center-breadcrumb__sep">›</span>

        <span className="center-breadcrumb__current">
          {blog.title}
        </span>
      </div>
    </nav>
  );
};

export default BlogPostBreadcrumb;
