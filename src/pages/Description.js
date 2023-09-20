import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import "../App.css";

function Description() {
  const location = useLocation();
  const product = location.state || {};
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(add(product));
  }

  // if(!product) {
  //   return null;
  // }
  console.log(product)
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <figure className="d-flex align-items-center justify-content-center p-5 h-100">
              <img src={product.image} width="250px"/>
            </figure>
          </div>

          <div className="col-md-6">
            <div className="d-flex flex-column align-items-start justify-content-center p-5 h-100 gap-4">
              
              <h2 className="mb-1">
                {product.title}
              </h2>
              
              <p className="my-1">
                {product.description}
              </p>
              
              <p className="my-1 fs-4">
                Price: ${product.price}
              </p>

              <button className="my-1 des-pg-view-btn" onClick={() => handleAdd(product)}>
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Description;