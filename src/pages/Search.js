import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/Produccard";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const handleAdd = (product) => {
    dispatch(add(product));
  };
  return (
    <Fragment>
      <Header />
      <section className="search">
        <Container>
          <div className="row my-5">
            {data.map((item, index) => (
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={index}>
                <div className="card-container">
                  <ProductCard
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
