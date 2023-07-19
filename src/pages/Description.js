import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLocation } from "react-router-dom"

function Description() {
  const location = useLocation();
  const {product} = location.state || {};

  if(!product) {
    return null;
  }
  console.log(product)
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <figure className="d-flex align-items-center justify-content-center p-5">
              <img src={product.image} width="300px"/>
            </figure>
          </div>

          <div className="col-md-6">
            <div className="product-description-body">
              <h2>
                {product.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Description;