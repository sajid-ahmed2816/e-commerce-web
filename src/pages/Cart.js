import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../config/redux/reducer/cartSlice";
import { useState } from "react";
import '../App.css';

function Cart() {
  const cartData = useSelector(a => a.Cart)
  let price = useSelector(a => a.Cart.price)
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(price);
  const dispatch = useDispatch();
  
  function handleRemove(id) {
    dispatch(remove(id))
    console.log(cartData);
  }

  const handleDecrease = () => {
    setQuantity(quantity-1)
    setSubTotal(subTotal*quantity)
    console.log(subTotal)
  }

  const handleIncrease = () => {
    setQuantity(quantity+1)
    setSubTotal(subTotal*quantity)
    console.log(subTotal)
  }

  return (
    <>
      <Header />

      {/* Cart items table */}
      {/* {cartData.length !== 0   
        ? cartData.map((x, i) => (
          <section className="cart-table">
            <div className="container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                        Products    
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody key={i}>
                  <tr>
                    <td>
                      <button onClick={() => handleRemove(x)}>Remove from cart</button>
                    </td>  
                    <td>
                      <img src={x.image} alt="product" width="100px" />
                    </td>
                    <td>
                      <p><b>$</b>{x.price}0</p>
                    </td>
                    <td>
                      <p>
                        <span onClick={handleDecrease}>-</span>
                        {quantity}
                        <span onClick={handleIncrease}>+</span>
                      </p>
                    </td>
                    <td>
                      <p><b>$</b>{subTotal}0</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        ))
        : (
            <section className="cart-table">
              <div className="container">
                <div>Your Cart is empty</div>
              </div>
            </section>
          )
      } */}

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
              {cartData.length !==0 
                ? cartData.map((x,i)=>(
                  <tbody>
                    <tr key={i}>
                      <td>
                        <button onClick={() => handleRemove(x)}>Remove from Cart</button>
                      </td>
                      <td>
                        <img src={x.image} alt="product" width="50px" />
                      </td>
                      <td>
                        <p><b>$</b>{x.price}</p>
                      </td>
                      <td>
                        <p><span onClick={handleDecrease}>-</span>{quantity}<span onClick={handleIncrease}>+</span></p>
                      </td>
                      <td>
                        <p><b>$</b>{subTotal}</p>
                      </td>
                    </tr>
                  </tbody>
                ))
                : <tbody>
                  <tr>
                    <td>
                      <p>
                        Your Cart is Empty
                      </p>
                    </td>
                  </tr>
                </tbody>
              }
          </table>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Cart