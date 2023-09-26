import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/Produccard";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import Toastify from "../components/Toastify";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const toastify = Toastify;

  console.log(data);

  const handleAdd = (product) => {
    dispatch(add(product));
    toastify.ToastifyVariants.success();
  };
  return (
    <Fragment>
      <Header />
      <section className="search">
        <Container>
          <div className="row my-5">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="card-container">
                <ProductCard
                  Price={data.price}
                  id={data.id}
                  CardTitle={data.title}
                  src={data.image}
                  onClick={() => handleAdd(item)}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Search;
