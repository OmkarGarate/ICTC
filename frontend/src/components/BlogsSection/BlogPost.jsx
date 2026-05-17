import "./BlogPost.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, fetchBlogs } from "../../redux/blogs/blogsSlice";
import imgSrc from "../Common/ImgSrc";

import userIcon from "../../assets/solar_user-bold.png";
import shareIcon from "../../assets/ri_share-line.png";
import ictcLogo from "../../assets/ICTC_Logo(long).png";
import doctorImg from "../../assets/High res images 1.png";

const BlogPost = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected: blog, list: allBlogs, loading } = useSelector((state) => state.blogs || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
    dispatch(fetchBlogs());
  }, [id, dispatch]);

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading blog...</p>;
  }

  if (!blog || !blog.content) {
    return <p style={{ padding: "40px" }}>Blog not found.</p>;
  }

  const similarBlogs = Array.isArray(allBlogs) 
    ? allBlogs.filter((b) => b.id !== blog.id).slice(0, 3)
    : [];

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied! You can now share it.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const renderContent = (content) => {
    if (!content) return null;

    // If content is TipTap JSON
    if (typeof content === "object" && content.type === "doc") {
      return convertTipTapToBlocks(content);
    }

    // If content is array of blocks (old format)
    if (Array.isArray(content)) {
      return content.map((block, index) => {
        if (block.type === "paragraph")
          return <p key={index}>{block.text}</p>;

        if (block.type === "heading")
          return <h2 key={index}>{block.text}</h2>;

        if (block.type === "list")
          return (
            <ul key={index}>
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );

        if (block.type === "image")
          return (
            <div key={index} className="ictc-blogpost-inline-img-wrapper">
              <img
                src={block.src}
                alt={block.alt || blog.title}
                className="ictc-blogpost-inline-img"
                loading="lazy"
              />
            </div>
          );

        return null;
      });
    }

    return null;
  };

  const convertTipTapToBlocks = (json) => {
    if (!json || !json.content) return null;

    return json.content.map((node, index) => {
      switch (node.type) {
        case "paragraph":
          return <p key={index}>{getTextFromNode(node)}</p>;
        
        case "heading":
          const level = node.attrs?.level || 2;
          const Heading = `h${level}`;
          return <Heading key={index}>{getTextFromNode(node)}</Heading>;
        
        case "bulletList":
          return (
            <ul key={index}>
              {node.content?.map((item, i) => (
                <li key={i}>{getTextFromNode(item)}</li>
              ))}
            </ul>
          );
        
        case "orderedList":
          return (
            <ol key={index}>
              {node.content?.map((item, i) => (
                <li key={i}>{getTextFromNode(item)}</li>
              ))}
            </ol>
          );
        
        case "image":
          return (
            <div key={index} className="ictc-blogpost-inline-img-wrapper">
              <img
                src={imgSrc(node.attrs?.src)}
                alt={node.attrs?.alt || blog.title}
                className="ictc-blogpost-inline-img"
                loading="lazy"
              />
            </div>
          );
        
        default:
          return null;
      }
    });
  };

  const getTextFromNode = (node) => {
    if (!node.content) return "";
    
    return node.content.map((c, i) => {
      if (c.type === "text") {
        let text = c.text;
        
        if (c.marks) {
          c.marks.forEach(mark => {
            if (mark.type === "bold") return <strong key={i}>{text}</strong>;
            if (mark.type === "italic") return <em key={i}>{text}</em>;
            if (mark.type === "underline") return <u key={i}>{text}</u>;
            if (mark.type === "link") return <a key={i} href={mark.attrs.href}>{text}</a>;
          });
        }
        
        return text;
      }
      return "";
    }).filter(Boolean);
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

  return (
    <>
      <main className="ictc-blogpost-layout">
        {/* LEFT CONTENT */}
        <article className="ictc-blogpost-article">
          <div className="blg">
            <img
              src={imgSrc(blog.image)}
              alt={blog.title}
              className="ictc-blogpost-hero"
            />

            <div className="ictc-blg-padd">
              <div className="ictc-blogpost-meta-row">
                <div className="ictc-blogpost-meta-tags">
                  <span className="tag blog">{blog.type || "Blog"}</span>

                  {blog.tags?.map((tag) => (
                    <span key={tag.id} className="tag childhood-cancer">
                      {tag.tag}
                    </span>
                  ))}

                  <span className="date">{formatDate(blog.date)}</span>
                </div>
              </div>

              <h1 className="ictc-blogpost-title">{blog.title}</h1>

              <div className="ictc-bp-flex">
                <div className="ictc-blogpost-author">
                  <img src={userIcon} alt="Author" />
                  <span>by {blog.author || "ICTC Team"}</span>
                </div>

                <button
                  className="ictc-blogpost-share-btn"
                  onClick={handleShare}
                >
                  <img src={shareIcon} alt="Share blog" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* BODY */}
          <section className="ictc-blogpost-body">
            {renderContent(blog.content)}
          </section>
        </article>

        {/* RIGHT SIDEBAR */}
        <aside className="ictc-blogpost-sidebar">
          <h3 className="ictc-blogpost-sidebar-title">
            Similar Blogs
          </h3>

          {similarBlogs.map((item) => (
            <div
              key={item.id}
              className="ictc-blogpost-similar-card"
              onClick={() => navigate(`/blog/${item.id}/${item.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={imgSrc(item.image)} alt={item.title} />

              <div className="ictc-blogpost-meta-tags">
                <span className="tag blog">{item.type || "Blog"}</span>
                <span className="date">{formatDate(item.date)}</span>
              </div>

              <p className="ictc-blg-text">{item.title}</p>
            </div>
          ))}

          {/* CTA */}
          <div className="ictc-blogpost-cta">
            <div className="ictc-blogpost-cta-content">
              <h3>Need Cancer Treatment or Guidance?</h3>
              <p>Book a Free Consultation or Second Opinion at</p>

              <img
                src={ictcLogo}
                alt="ICTC Logo"
                className="ictc-blogpost-cta-logo"
              />

              <h2>Mumbai's Largest Cancer Care Chain</h2>

              <button
                className="book-btn ictc-blogpost-cta-btn"
                onClick={() => navigate("/BookAppoinment")}
              >
                Book a Consultation
              </button>
            </div>

            <img
              src={doctorImg}
              alt="Doctor"
              className="ictc-blogpost-cta-doctor"
            />
          </div>
        </aside>
      </main>

      {/* TAGS */}
      <section className="ictc-blogpost-tags-section">
        <h3 className="ictc-blogpost-tags-title">Tags</h3>

        <div className="ictc-blogpost-tags-list">
          {blog.tags?.map((tag) => (
            <span key={tag.id}>{tag.tag}</span>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogPost;