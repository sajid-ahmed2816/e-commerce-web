import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Navbar } from "react-bootstrap";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { decrement, increment, remove } from "../config/redux/reducer/cartSlice";
import Offcanvas from 'react-bootstrap/Offcanvas';
import useAuth from "../hooks/useAuth";
import "../App.css";
import Button from "./Button";
import PrimaryButton from "./PrimaryButton";

function Header() {
  const [atTop, setAtTop] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.Cart);

  const { token, name, userLogout } = useAuth();

  const handleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleDecrease = (id) => {
    dispatch(decrement(id));    // new action
  };

  const handleIncrease = (id) => {
    // Find the item to pass the full object to add()
    const item = cartData.find((item) => item._id === id);
    if (item) {
      dispatch(increment(item));
    }
  };

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleLogout = () => {
    userLogout();
    navigate("/login")
  };

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Offcanvas
        show={isDrawerOpen}
        onHide={handleDrawer}
        placement={"end"}
      >
        <Offcanvas.Header
          closeButton
          style={{
            borderBottom: "1px solid #adadad"
          }}
        >
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">
            {cartData.map((item, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #e9e9e9",
                }}
              >
                <div
                  className="d-flex cartItemContainerBox"
                  style={{
                    gap: "10px",
                    padding: "10px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className="del-item-btn"
                      onClick={() => handleRemove(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      width={"48px"}
                      height={"48px"}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "220px"
                      }}
                    >
                      {item.name}
                    </p>
                    <div className="d-flex gap-4">
                      <button
                        className="decreaseBtn"
                        onClick={() => handleDecrease(item._id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="IncreaseBtn"
                        onClick={() => handleIncrease(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
            {cartData?.length > 0 ? (
              <PrimaryButton
                title={"Checkout"}
                onClick={() => {
                  navigate("/cart");
                  handleDrawer();
                }}
              />
            ) : (
              <p className="m-0 text-center">No products</p>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
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
              <button
                onClick={handleDrawer}
                style={{
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  color: "white",
                  position: "relative"
                }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{
                    color: "#fff",
                    fontSize: "21px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />

                {cartData.length > 0 && (
                  <span className="counter-container">
                    <span className="cartItems-length">{cartData.length}</span>
                  </span>
                )}
              </button>
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
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li className="navitem">
                    <Link to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="navitem">
                    <Link to="/blogs">
                      Blogs
                    </Link>
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
                    width: "203.953px",
                    padding: "5px 0px 5px 10px",
                    borderRadius: "6px 0px 0px 6px"
                  }}
                />
                <button
                  className="search-btn"
                // onClick={() => handleSearch(text)}
                >
                  <FontAwesomeIcon icon={faSearch} />
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
