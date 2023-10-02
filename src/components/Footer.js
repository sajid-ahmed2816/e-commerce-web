import { Link } from "react-router-dom";
import "../App.css";

const storeLinks = [
  {
    name: "Men Wear",
    path: "/category/menwear",
  },
  {
    name: "Women Wear",
    path: "/category/womenwear",
  },
  {
    name: "Accessories",
    path: "/category/accessories",
  },
  {
    name: "Electronices",
    path: "/category/electronics",
  },
];

const supportLinks = [
  {
    name: "Contact us",
    path: "/store",
  },
  {
    name: "About us",
    path: "/about",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-part-1">
          <div className="footer-items">
            <h3 className="footer-link">Fashion Brand</h3>
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
            {supportLinks.map((item, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Link
                  to={item.path}
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <h3 className="footer-link">Quick links</h3>
            <Link
              to={"/auth/login"}
              style={{
                color: "#000000",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              My account
            </Link>
            <p>Checkout</p>
            <p>Newsletter</p>
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
