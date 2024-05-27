import { useState, useEffect, Fragment } from "react";
import ProductCard from "../components/Produccard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import Toastify from "../components/Toastify";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Accessories() {
  const [data, setData] = useState([]);
  let url = "https://fakestoreapi.com/products";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastify = Toastify;

  function getProducts() {
    axios
      .get(url)
      .then((res) => {
        let filteredData = res.data.filter(
          (item) => item.category === "jewelery"
        );
        setData([...filteredData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAdd = (event, product) => {
    event.stopPropagation();
    dispatch(add(product));
    toastify.ToastifyVariants.success("Product added to cart");
  };

  const handleProductDescription = (event, product) => {
    event.stopPropagation();
    navigate(`/description/${product.id}`, { state: product });
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(data);

  return (
    <Fragment>
      <div className="container">
        <div className="row accessories-section py-5">
          {data.map((x, i) => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
              <div className="card-container">
                <ProductCard
                  handleNavigate={(e) => handleProductDescription(e, x)}
                  data={x}
                  CardTitle={x.title}
                  src={x.image}
                  price={x.price}
                  onClick={(e) => handleAdd(e, x)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Accessories;
