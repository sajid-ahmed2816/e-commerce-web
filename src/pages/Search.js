import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/Produccard";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import Toastify from "../components/Toastify";

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const toastify = Toastify;

  console.log(data);

  const handleAdd = (product) => {
    dispatch(add(product));
    toastify.ToastifyVariants.success();
  };

  const handleProductDescription = (event, product) => {
    event.stopPropagation();
    navigate(`/description/${product.id}`, { state: product });
  };

  return (
    <Fragment>
      <Header />
      <section className="search">
        <Container>
          <div className="row my-5">
            {data.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="card-container">
                  <ProductCard
                    data={item}
                    handleNavigate={(e) => handleProductDescription(e, item)}
                    Price={item.price}
                    id={item.id}
                    CardTitle={item.title}
                    src={item.image}
                    onClick={() => handleAdd(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Search;
