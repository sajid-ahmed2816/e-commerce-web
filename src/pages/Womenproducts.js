import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import ProductCard from "../components/Produccard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import "../App.css";
import Toastify from "../components/Toastify";

function Womenproducts() {
  const [data, setData] = useState([]);
  let url = "https://fakestoreapi.com/products";
  const dispatch = useDispatch();
  const toastify = Toastify;

  function getProducts() {
    axios
      .get(url)
      .then((res) => {
        let filteredData = res.data.filter(
          (item) => item.category === "women's clothing"
        );
        setData([...filteredData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAdd = (product) => {
    dispatch(add(product));
    toastify.ToastifyVariants.success();
  };

  useEffect(() => {
    getProducts();
  });

  console.log(data);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row women-section py-5">
          {data.map((x, i) => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
              <div className="card-container">
                <ProductCard
                  data={x}
                  CardTitle={x.title}
                  src={x.image}
                  Price={x.price}
                  onClick={() => handleAdd(x)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Womenproducts;
