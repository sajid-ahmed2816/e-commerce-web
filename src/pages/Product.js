import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import ProductCard from "../components/Produccard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import "../App.css";
import Toastify from "../components/Toastify";
import { Spinner } from "react-bootstrap";

function Product() {
  const [data, setData] = useState([]);
  const [menWear, setMenWear] = useState([]);
  const [womenWear, setWomenWear] = useState([]);
  const [jewelery, setJewelery] = useState([]);
  const [electronic, setElectronics] = useState([]);
  const [spinner, setSpinner] = useState(false);
  let url = "https://fakestoreapi.com/products";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastify = Toastify;

  const handleAdd = (event, product) => {
    event.stopPropagation();
    dispatch(add(product));
    toastify.ToastifyVariants.success("Product added to cart");
  };

  function getProducts() {
    setSpinner(true);
    axios
      .get(url)
      .then((res) => {
        setData([...data, ...res.data]);
        setSpinner(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  }

  const handleProductDescription = (event, product) => {
    event.stopPropagation();
    navigate(`/description/${product.id}`, { state: product });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let menProducts = data.filter((item) => item.category === "men's clothing");
    setMenWear([...menProducts]);

    let womenProducts = data.filter(
      (item) => item.category === "women's clothing"
    );
    setWomenWear([...womenProducts]);

    let accessories = data.filter((item) => item.category === "jewelery");
    setJewelery([...accessories]);

    let electronics = data.filter((item) => item.category === "electronics");
    setElectronics([...electronics]);
  }, [data]);

  return (
    <Fragment>
      <div className="container">
        <div className="all-products">
          {spinner ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <Spinner animation="grow" style={{ color: "#000000" }} />
            </div>
          ) : (
            <div className="row">
              <h2 className="p-4 my-5 text-center display-5">Men's Clothing</h2>
              {menWear.map((x, i) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                  <div className="card-container">
                    <ProductCard
                      handleNavigate={(e) => handleProductDescription(e, x)}
                      data={x}
                      id={x.id}
                      src={x.image}
                      Price={x.price}
                      CardTitle={x.title}
                      onClick={(e) => handleAdd(e, x)}
                    />
                  </div>
                </div>
              ))}

              <h2 className="p-4 my-5 text-center display-5">
                Women's Clothing
              </h2>
              {womenWear.map((x, i) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                  <div className="card-container">
                    <ProductCard
                      handleNavigate={(e) => handleProductDescription(e, x)}
                      data={x}
                      id={x.id}
                      src={x.image}
                      Price={x.price}
                      CardTitle={x.title}
                      onClick={(e) => handleAdd(e, x)}
                    />
                  </div>
                </div>
              ))}

              <h2 className="p-4 my-5 text-center display-5">Jeweleries</h2>
              {jewelery.map((x, i) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                  <div className="card-container">
                    <ProductCard
                      handleNavigate={(e) => handleProductDescription(e, x)}
                      data={x}
                      id={x.id}
                      src={x.image}
                      Price={x.price}
                      CardTitle={x.title}
                      onClick={(e) => handleAdd(e, x)}
                    />
                  </div>
                </div>
              ))}

              <h2 className="p-4 my-5 text-center display-5">Electronics</h2>
              {electronic.map((x, i) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                  <div className="card-container">
                    <ProductCard
                      handleNavigate={(e) => handleProductDescription(e, x)}
                      data={x}
                      id={x.id}
                      src={x.image}
                      Price={x.price}
                      CardTitle={x.title}
                      onClick={(e) => handleAdd(e, x)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
