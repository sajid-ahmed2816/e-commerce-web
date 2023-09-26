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
import { useNavigate } from "react-router-dom";
import "../App.css";

function Header({ data }) {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState({});

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.Cart);
  const productsData = data;
  // console.log("productsData", productsData);

  const handleSearch = (text) => {
    const filterData = productsData.find((item) => item.title === text);
    setSearchData({ ...filterData });
    if (searchData.length !== 0) {
      navigate(`/search/${text}`, { state: searchData });
    }
  };

  useEffect(() => {
    console.log(searchData); // Log searchData whenever it changes
  }, [searchData]);

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
          <Link to="/cart">
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
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{
              color: "#fff",
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
            }}
          />
        </div>
      </header>
      <div className="sticky-header">
        <header className="header">
          <div className="container">
            <div className="logo">Fashion Brand</div>
            <hr />
            <Navbar expand="lg" className="navbar">
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
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button
                      className="search-btn"
                      onClick={() => handleSearch(text)}
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
