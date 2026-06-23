import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogServices from "../api/blogs/BlogServices";
import toastify from "../components/Toastify";
import Loader from "../components/Loader";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const stripHtml = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const getBlogs = async (page, limit) => {
    setIsLoading(true);
    const params = { page: page, limit: limit };
    try {
      const result = await BlogServices.getBlogs(params);
      if (result.status) {
        setBlogs(result.data.blogs);
      }
    } catch (error) {
      toastify.error(error);
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Fragment>
      <section className="stores">
        <div className="container">
          <div className="row g-4">
            {isLoading ? (
              <div className="col-12">
                <Loader />
              </div>
            ) : blogs.length > 0 ? blogs.map((blog) => (
              <div className="col-lg-4 flex-1" key={blog?._id}
                onClick={() => {
                  navigate(`/blogs/blog/${blog._id}`, { state: blog })
                }}
              >
                <div className="card rounded-5 h-100 card-style">
                  <div className="card-header p-3"
                    style={{
                      borderRadius: "32px 32px 0 0"
                    }}
                  >
                    <img
                      src={blog?.thumbnail}
                      alt={blog.title}
                      style={{
                        borderRadius: "16px",
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body p-3">
                    <div className="d-flex flex-column gap-2">
                      <h5
                        className="m-0"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {blog.title}
                      </h5>
                      <p
                        style={{
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {stripHtml(blog.content)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 544px)" }}>
                  <p className="m-0">No blogs available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Blogs;