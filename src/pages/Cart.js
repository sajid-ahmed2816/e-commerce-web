import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../config/redux/reducer/cartSlice";

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

      {cartData.map((x, i) => (
        <div key={i}>
          <img src={x.image} width="100px" />
          <h2>{x.title}</h2>
          <button onClick={() => handleRemove(x.id)}>Remove From Cart</button>
        </div>
      ))}

      <Footer />
    </>
  )
}

export default Cart