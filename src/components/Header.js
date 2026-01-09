import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "../App.css";

function Header() {
  const [atTop, setAtTop] = useState(true);
  const cartItems = useSelector((state) => state.Cart);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="announcement-bar">
        <div className="d-flex align-items-center px-3 gap-3">
          <a href="https://www.facebook.com" target="_new">
            <FontAwesomeIcon
              icon={faSquareFacebook}
              style={{
                color: "#fff",
                fontSize: "23px",
                display: "flex",
                alignItems: "center",
              }}
            />
          </a>
          <a href="https://www.instagram.com" target="_new">
            <FontAwesomeIcon
              icon={faInstagram}
              style={{
                color: "#fff",
                fontSize: "25px",
                display: "flex",
                alignItems: "center",
              }}
            />
          </a>
        </div>
        <div className="d-flex align-items-center px-3 greeting">
          <p className="text-white">Welcome to our store</p>
        </div>
        <div className="d-flex align-items-center px-3 gap-3">
          <Link to={"/cart"}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{
                color: "#fff",
                fontSize: "21px",
                display: "flex",
                alignItems: "center",
              }}
            />
            {cartItems.length > 0 ? (
              <span className="counter-container">
                <span className="cartItems-length">{cartItems.length}</span>
              </span>
            ) : (
              <span style={{ display: "none" }}></span>
            )}
          </Link>
          <Link to={"/login"}>
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{
                color: "#fff",
                fontSize: "22px",
                display: "flex",
                alignItems: "center",
              }}
            />
          </Link>
        </div>
      </header>
      <div className="sticky-header">
        <header className="header">
          <div className="container">
            <div className={`logo ${atTop ? "" : "hidden"}`}>Fashion Brand</div>
            <hr />
            <Navbar expand="lg" className="navbar">
              <div className="logo-sm">Fashion Brand</div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navlinks">
                  <li className="navitem">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="navitem">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="navitem">
                    <Link to="/products">
                      Products{" "}
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        style={{ fontSize: "10px" }}
                      />
                    </Link>
                    <ul className="product-submenu">
                      <li>
                        <Link to="/category/menwear">Men's Clothing</Link>
                      </li>
                      <li>
                        <Link to="/category/womenwear">Women's Clothing</Link>
                      </li>
                      <li>
                        <Link to="/category/accessories">Jewelery</Link>
                      </li>
                      <li>
                        <Link to="/category/electronics">Electronics</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="navitem">
                    <Link to="/store">Stores</Link>
                  </li>
                  <li className="navitem">
                    <input
                      type="text"
                    // onChange={(e) => setText(e.target.value)}
                    />
                    <button
                      className="search-btn"
                    // onClick={() => handleSearch(text)}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ color: "gray" }}
                      />
                    </button>
                  </li>
                </ul>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
