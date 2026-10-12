import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const handleClick = (id) => {
    navigate(`/products/${id}`)
  };

  const handleProductDescription = (event, product) => {
    event.stopPropagation();
    navigate(`/description/${product.id}`, { state: product });
  };

  return (
    <Fragment>
      <section className="search">
        <Container>
          <div className="row my-5">
            {data.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="card-container">
                  <ProductCard
                    data={item}
                    handleNavigate={(e) => handleProductDescription(e, item)}
                    Price={item?.minVariantPrice != null ? item?.minVariantPrice : "N/A"}
                    id={item.id}
                    CardTitle={item.title}
                    src={item.thumbnail}
                    onClick={() => handleClick(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </Fragment>
  );
}

export default Search;
