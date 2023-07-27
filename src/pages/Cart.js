import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../config/redux/reducer/cartSlice";
import '../App.css';

function Cart() {
  const cartData = useSelector(a => a.Cart);
  const dispatch = useDispatch();
  console.log(cartData)
  function handleRemove(id) {
    dispatch(remove(id))
  }
  return (
    <>
      <Header />

      {/* Cart items table */}
      <section className="cart-table">
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>
                  <td>x</td>
                </th>
                <th>
                  <td>
                    Products    
                  </td>
                </th>
                <th>
                  <td>
                    Price
                  </td>
                </th>
                <th>
                  <td>
                    Quantity
                  </td>
                </th>
                <th>
                  <td>
                    Subtotal
                  </td>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((x, i) => (
                <tr key={i}>
                  <td>
                    <button onClick={() => handleRemove(x.id)}>x</button>
                  </td>
                  <td>
                    <img src={x.image} width="100px" />
                  </td>
                  <td>
                    <p>{x.price}</p>
                  </td>  
                  <td>
                    <p>1</p>
                  </td>  
                  <td>
                    <p>{x.price}</p>
                  </td>  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Cart