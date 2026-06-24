import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Navbar, Spinner } from "react-bootstrap";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { decrement, increment, remove } from "../config/redux/reducer/cartSlice";
import Offcanvas from 'react-bootstrap/Offcanvas';
import useAuth from "../hooks/useAuth";
import "../App.css";
import PrimaryButton from "./PrimaryButton";
import SearchService from "../api/search/SearchService";
import toastify from "./Toastify";
import MyModal from "./Modal";

const navigations = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Products" },
  { path: "/blogs", name: "Blogs" }
]

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.Cart);

  const { token, name, userLogout } = useAuth();

  const debouncedSearch = useDebounce(text, 500);

  const handleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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

  const getSearchResult = async (query) => {
    if (!query || query.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    };

    setIsSearching(true);
    setShowDropdown(true);

    try {
      const result = await SearchService.getSearchResult({ query: query });
      if (result.status) {
        const { results = [] } = result?.data || {};
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      toastify.error(error?.message || "Search failed");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };


  useEffect(() => {
    getSearchResult(debouncedSearch);
  }, [debouncedSearch]);

  const handleResultClick = (item) => {
    setShowDropdown(false);
    setText("");
    if (item.type === "blog") {
      navigate(`/blogs/blog/${item._id}`, { state: item });
    } else if (item.type === "category") {
      navigate(`/products`, { state: { categoryId: item._id } });
    } else if (item.type === "product") {
      setData(item);
      setModal(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const searchContainer = document.querySelector(".search-container");
      if (searchContainer && !searchContainer.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <MyModal show={modal} onHide={() => setModal(false)} data={data} />
      <Offcanvas
        show={isDrawerOpen}
        onHide={handleDrawer}
        placement={"end"}
        style={{
          zIndex: 9999
        }}
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
                      alt={"logo"}
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
      <Offcanvas
        placement={"top"}
        show={isMenuOpen}
        onHide={handleMenu}
        style={{
          zIndex: 9999,
          height: searchResults?.length > 0 ? "82vh" : "calc(100vh - 436px)"
        }}
      >
        <Offcanvas.Header
          closeButton
          style={{
            borderBottom: "1px solid #adadad"
          }}
        >
          <h1 className="display-4 m-0">Fashion Brand</h1>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {navigations.map((nav, ind) => (
                <li key={ind}>
                  <Link style={{ textDecoration: "none", color: "#000000" }} to={nav.path}>
                    {nav.name}
                  </Link>
                </li>
              ))}
              <li className="navitem">
                <div className="d-flex">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search here..."
                    style={{
                      flex: 1,
                      padding: "5px 0px 5px 10px",
                      borderRadius: "6px 0px 0px 6px"
                    }}
                  />
                  <button
                    className="search-btn"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
                {showDropdown && (
                  <div
                    className="search-dropdown-mobile"
                    style={{
                      marginTop: "8px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {isSearching ? (
                      <div style={{ padding: "12px 16px", textAlign: "center" }}>
                        <Spinner animation="grow" style={{ color: "#000000" }} />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleResultClick(item)}
                            style={{
                              padding: "10px 16px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f5f5f5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {(item.thumbnail || item.image) && (
                              <img
                                src={item.thumbnail || item.image}
                                alt={item.title || item.name}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            )}
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  color: "#333",
                                  marginBottom: "2px",
                                }}
                              >
                                {item.title || item.name}
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#888",
                                  display: "flex",
                                  gap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    background: item.type === "blog" ? "#e8f5e9" : "#e3f2fd",
                                    color: item.type === "blog" ? "#2e7d32" : "#1565c0",
                                    padding: "2px 8px",
                                    borderRadius: "12px",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {item.type}
                                </span>
                                {item.type === "product" && item.price && (
                                  <span>${item.price}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : text.trim() && !isSearching ? (
                      <div style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>
                        No results found
                      </div>
                    ) : null}
                  </div>
                )}
              </li>
            </ul>
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
                    <Dropdown.Item onClick={() => navigate("/orders")}>Orders</Dropdown.Item>
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
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="m-0 logo">Fashion Brand</h1>
              <Navbar className="navbar d-lg-flex d-md-flex d-sm-none">
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
              </Navbar>
              <div className="navitem d-lg-flex d-md-flex d-sm-none search-container">
                <div className="navitem d-lg-flex d-md-flex d-sm-none">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      onChange={(e) => setText(e.target.value)}
                      value={text}
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
                  {showDropdown && (
                    <div
                      className="search-dropdown"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 890,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "0 0 6px 6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        zIndex: 9999,
                        maxHeight: "400px",
                        overflowY: "auto",
                        marginTop: "4px",
                      }}
                    >
                      {isSearching ? (
                        <div style={{ padding: "12px 16px", textAlign: "center" }}>
                          <Spinner animation="grow" style={{ color: "#000000" }} />
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => handleResultClick(item)}
                              style={{
                                padding: "10px 16px",
                                cursor: "pointer",
                                borderBottom: "1px solid #f0f0f0",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f5f5f5";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                              }}
                            >
                              {/* Thumbnail */}
                              {(item.thumbnail || item.image) && (
                                <img
                                  src={item.thumbnail || item.image}
                                  alt={item.title || item.name}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                  }}
                                />
                              )}
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#333",
                                    marginBottom: "2px",
                                  }}
                                >
                                  {item.title || item.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#888",
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      background: item.type === "blog" ? "#e8f5e9" : "#e3f2fd",
                                      color: item.type === "blog" ? "#2e7d32" : "#1565c0",
                                      padding: "2px 8px",
                                      borderRadius: "12px",
                                      fontSize: "10px",
                                      fontWeight: 600,
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {item.type}
                                  </span>
                                  {item.type === "product" && item.price && (
                                    <span>${item.price}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : text.trim() && !isSearching ? (
                        <div style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>
                          No results found
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <header>
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="m-0 logo">Fashion Brand</h1>
            <div className="header-menu-button-wrapper">
              <button
                className="header-menu-button"
                onClick={handleMenu}
              >
                <FontAwesomeIcon
                  className="header-menu-icon"
                  icon={faBars}
                />
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
