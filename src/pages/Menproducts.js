import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import ProductCard from "../components/Produccard";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import "../App.css";
import Toastify from "../components/Toastify";
import { useNavigate } from "react-router-dom";

function MenProducts() {
  const [data, setData] = useState([]);
  let url = "https://fakestoreapi.com/products";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastify = Toastify;

  function getProducts() {
    axios
      .get(url)
      .then((res) => {
        let filteredData = res.data.filter(
          (item) => item.category === "men's clothing"
        );
        setData([...filteredData]);
      })
      .catch((err) => console.log(err));
  }

  const handleAdd = (product) => {
    dispatch(add(product));
    toastify.ToastifyVariants.success();
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
    <>
      <Header />
      <div className="container">
        <div className="row men-section py-5">
          {data.map((x, i) => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
              <div className="card-container">
                <ProductCard
                  handleNavigate={(e) => handleProductDescription(e, x)}
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

export default MenProducts;
