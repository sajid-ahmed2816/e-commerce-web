import { Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Header() {
  const [atTop, setAtTop] = useState(true);

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.Cart);

  const { token, name, userLogout } = useAuth();

  const handleLogout = () => {
    userLogout();
    navigate("/login")
  }
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
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
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
            <div className="d-flex align-items-center greeting">
              <p className="text-white">Welcome to our store</p>
            </div>
            <div className="d-flex align-items-center gap-3">
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
              {token ? (
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-icon d-flex"
                    id="dropdown-basic"
                    variant="link"
                    style={{ textDecoration: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{
                        color: "#fff",
                        fontSize: "21px",
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item disabled>{name}</Dropdown.Item>
                    <Dropdown.Item>Orders</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="sticky-header">
        <header className="header">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="m-0 logo">Fashion Brand</h1>
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
                </ul>
              </Navbar.Collapse>
            </Navbar>
            <div className="navitem">
              <div className="input-wrapper">
                <input
                  type="text"
                  // onChange={(e) => setText(e.target.value)}
                  placeholder="Search here..."
                  style={{
                    width: "203.953px"
                  }}
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
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
