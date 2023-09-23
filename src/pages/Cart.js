import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../config/redux/reducer/cartSlice";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Cart() {
  const cartData = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartData);

  const [itemQuantities, setItemQuantities] = useState(() =>
    cartData.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  console.log(itemQuantities);
  useEffect(() => {
    // Set default quantity to 1 for products already in the cart
    const defaultQuantities = cartData.reduce(
      (acc, item) => ({ ...acc, [item.id]: 1 }),
      {}
    );
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      ...defaultQuantities,
    }));
  }, [cartData]);

  const handleNavigate = () => {
    navigate("/products");
  };

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleDecrease = (id) => {
    if (itemQuantities[id] > 1) {
      const updatedQuantities = { ...itemQuantities };
      updatedQuantities[id] -= 1;
      setItemQuantities(updatedQuantities);
    } else if (itemQuantities[id] === 1) {
      // If quantity is 1, set it to 0 (prevent negative quantity)
      const updatedQuantities = { ...itemQuantities };
      updatedQuantities[id] = 0;
      setItemQuantities(updatedQuantities);
    }
  };

  const handleIncrease = (id) => {
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[id] = (updatedQuantities[id] || 0) + 1;
    setItemQuantities(updatedQuantities);
  };

  const getTotalPrice = () => {
    return cartData.reduce((total, item) => {
      return total + item.price * (itemQuantities[item.id] || 0);
    }, 0);
  };

  const deliveryCharges = getTotalPrice() !== 0 ? 100.0 : 0;

  const grandTotal =
    getTotalPrice() === 0 ? 0 : getTotalPrice() + deliveryCharges;

  return (
    <>
      <Header />

      {/* Cart items table */}
      {cartData.length === 0 ? (
        <div className="emptyMessage-container">
          <h2 className="emptyCart-message display-6">Your cart is empty</h2>
          <button onClick={handleNavigate} className="emptyCart-btn">
            See all categories
          </button>
        </div>
      ) : (
        <section className="cart-table">
          <div className="container">
            <div className="row">
              {/* Information Form */}
              <div className="col-md-7"></div>

              {/* Cart Item Information */}
              <div className="col-md-5 p-5">
                {cartData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      boxShadow: "1px 1px 15px 1px #efefef",
                      marginBlock: "10px",
                      padding: "15px",
                    }}
                  >
                    <div className="d-flex justify-content-between cartItemContainerBox">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          className="del-item-btn"
                          onClick={() => handleRemove(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          width={"60px"}
                          height={"60px"}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div>
                        <p>{item.title}</p>
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="decreaseBtn"
                            onClick={() => handleDecrease(item.id)}
                          >
                            -
                          </button>
                          <span>{itemQuantities[item.id]}</span>
                          <button
                            className="IncreaseBtn"
                            onClick={() => handleIncrease(item.id)}
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
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Cart;
