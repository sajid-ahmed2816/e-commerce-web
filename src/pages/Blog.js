// pages/Blog.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Blog() {
  const { state } = useLocation();
  const [blog, setBlog] = useState(null);
  console.log("🚀 ~ Blog ~ blog:", blog)
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setBlog(state);
    }
  }, [state]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!blog) {
    return (
      <section className="stores">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center" style={{ padding: "80px 0" }}>
              <p>Blog not found</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="stores">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            {/* Back button */}
            <button
              className="btn btn-outline-dark mb-4"
              onClick={() => navigate("/blogs")}
              style={{ borderRadius: "30px", padding: "8px 24px" }}
            >
              ← Back to Blogs
            </button>

            {/* Blog Thumbnail */}
            {blog.thumbnail && (
              <div className="mb-4">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
            )}

            {/* Blog Title */}
            <h1 className="display-5 fw-bold mb-3">{blog.title}</h1>

            {/* Date & Status */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="text-muted" style={{ fontSize: "14px" }}>
                📅 {formatDate(blog.date)}
              </span>
              {blog.status && (
                <span
                  className="badge"
                  style={{
                    background: blog.status === "published" ? "#28a745" : "#ffc107",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {blog.status}
                </span>
              )}
            </div>

            {/* Blog Content (rendered as HTML) */}
            <div
              className="blog-content"
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "#333",
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Optional: Add a divider */}
            <hr className="my-5" />

            {/* Share or extra buttons (optional) */}
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted" style={{ fontSize: "14px" }}>
                Published on {formatDate(blog.date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;