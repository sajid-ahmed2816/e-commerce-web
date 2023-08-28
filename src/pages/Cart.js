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

  const [itemQuantities, setItemQuantities] = useState(() =>
    cartData.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  useEffect(() => {
    // Set default quantity to 1 for products already in the cart
    const defaultQuantities = cartData.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {});
    setItemQuantities((prevQuantities) => ({ ...prevQuantities, ...defaultQuantities }));
  }, [cartData]);

  const handleNavigate = () => {
    navigate('/products');
  }

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

  const deliveryCharges = getTotalPrice() !== 0 ? 100.00 : 0;

  const grandTotal = getTotalPrice() === 0 ? 0 : getTotalPrice() + deliveryCharges;

  return (
    <>
      <Header />

      {/* Cart items table */}
      {cartData.length === 0 
      ? <div className="emptyMessage-container">
          <h2 className="emptyCart-message display-6">
            Your cart is empty
          </h2>
          <button onClick={handleNavigate} className="emptyCart-btn">See all categories</button>
        </div> 
      : <section className="cart-table">
        <div className="container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length !== 0 ? (
                cartData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button className="del-item-btn" onClick={() => handleRemove(item.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                      </button>
                      <img src={item.image} alt="product" width="50px" />
                      <p>{item.title}</p>
                    </td>
                    <td>
                      <p>${item.price}</p>
                    </td>
                    <td>
                      <p>
                        <span onClick={() => handleDecrease(item.id)}>-</span>
                        {itemQuantities[item.id] || 0}
                        <span onClick={() => handleIncrease(item.id)}>+</span>
                      </p>
                    </td>
                    <td>
                      <p>${item.price * (itemQuantities[item.id] || 0)}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <p>Your Cart is Empty</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <div className="promocode-sec">
                <p className="promocode-sec-heading">Payment Method</p>
                <select className="method-selector" onChange={(e)=>e.target.value}>
                  <option value=""></option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="checkout-sec">
                <p className="checkout-sec-heading">Cart Total</p>
                <table className="checkout-table">
                  <tbody className="checkout-table-body">
                    <tr>
                      <td>Sub Total</td>
                      <td>${getTotalPrice()}</td>
                    </tr>
                    <tr>
                      <td>Delivery Charges</td>
                      <td>${deliveryCharges}</td>
                    </tr>
                    <tr>
                      <td>Grand Total</td>
                      <td>${grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="order-btn-container">
                  <button className="order-btn">Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      }
      <Footer />
    </>
  );
}

export default Cart;