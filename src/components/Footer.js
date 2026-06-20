import { Link } from "react-router-dom";
import "../App.css";

const storeLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Blogs",
    path: "/blogs",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-part-1">
          <div className="footer-items">
            <h3 className="footer-link">Fashion Brand</h3>
            <p>C/12, X Block, Y Road, Z Area, City, State, Country</p>
            <p>123 456 789</p>
          </div>
          <div>
            <h3 className="footer-link">Our Store</h3>
            {storeLinks.map((item, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Link
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  to={item.path}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <h3 className="footer-link">Support</h3>
            <div style={{ marginBottom: "20px" }}>
              <a href="mailto:test@domain.com">
                test@domain.com
              </a>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <a href="tel:123456789">
                123 456 789
              </a>
            </div>
          </div>
          <div>
            <h3 className="footer-link">Quick links</h3>
            <div style={{ marginBottom: "20px" }}>
              <Link
                // to={"/auth/login"}
                style={{
                  color: "#000000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                My account
              </Link>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Link
                to={"/cart"}
                style={{
                  color: "#000000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Checkout
              </Link>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Link
                // to={"/auth/login"}
                style={{
                  color: "#000000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-part-2">
        <p>Created by Sajid.Dev || 2023</p>
      </div>
    </footer>
  );
}

export default Footer;
