import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../App.css"

function Header() {
  return (
    <>
      <header className="announcement-bar">
        <div className="d-flex align-items-center px-3 gap-3">
          <a href="https://www.facebook.com" target="_new">
            <FontAwesomeIcon icon={faSquareFacebook} style={{ color: '#fff', fontSize: '22px', display: 'flex', alignItems: 'center' }} />
          </a>
          <a href="https://www.instagram.com" target="_new">
            <FontAwesomeIcon icon={faInstagram} style={{ color: '#fff', fontSize: '24px', display: 'flex', alignItems: 'center' }} />
          </a>
        </div>
        <div className="d-flex align-items-center px-3 greeting">
          <p className="text-white">Welcome to our store</p>
        </div>
        <div className="d-flex align-items-center px-3 gap-3">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center' }} />
          </Link>
          <FontAwesomeIcon icon={faCircleUser} style={{ color: '#fff', fontSize: '22px', display: 'flex', alignItems: 'center' }} />
        </div>
      </header>
      <div className="sticky-header">
        <header className="header">
          <div className="container">
            <div className="logo">
              Fashion Brand
            </div>
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
                    <Link to="/products">Products</Link>
                    <ul className="product-submenu">
                      <li>Men's Clothing</li>
                      <li>Women's Clothing</li>
                      <li>Jewellery</li>
                      <li>Electronics</li>
                    </ul>
                  </li>
                  <li className="navitem">
                    <Link to="/store">Stores</Link>
                  </li>
                  <li className="navitem">
                    <input type="text" />
                    <button className="search-btn">
                      <FontAwesomeIcon icon={faSearch} style={{ color: 'gray' }} />
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