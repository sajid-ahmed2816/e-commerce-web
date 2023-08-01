import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../config/redux/reducer/cartSlice";
import { useState, useEffect } from "react";
import "../App.css";

function Cart() {
  const cartData = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  const [itemQuantities, setItemQuantities] = useState(() =>
    cartData.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  useEffect(() => {
    // Set default quantity to 1 for products already in the cart
    const defaultQuantities = cartData.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {});
    setItemQuantities((prevQuantities) => ({ ...prevQuantities, ...defaultQuantities }));
  }, [cartData]);

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

  return (
    <>
      <Header />

      {/* Cart items table */}
      <section className="cart-table">
        <div className="container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length !== 0 ? (
                cartData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button onClick={() => handleRemove(item.id)}>Remove from Cart</button>
                    </td>
                    <td>
                      <img src={item.image} alt="product" width="50px" />
                    </td>
                    <td>
                      <p><b>$</b>{item.price}</p>
                    </td>
                    <td>
                      <p>
                        <span onClick={() => handleDecrease(item.id)}>-</span>
                        {itemQuantities[item.id] || 0}
                        <span onClick={() => handleIncrease(item.id)}>+</span>
                      </p>
                    </td>
                    <td>
                      <p><b>$</b>{item.price * (itemQuantities[item.id] || 0)}</p>
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
        </div>
      </section>
      <p>Total Price: ${getTotalPrice()}</p>

      <Footer />
    </>
  );
}

export default Cart;