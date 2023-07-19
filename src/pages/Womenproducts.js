import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import ProductCard from "../components/Produccard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import "../App.css";

function Womenproducts() {
    const [data, setData] = useState([]);
    let url = 'https://fakestoreapi.com/products';
    const dispatch = useDispatch();

    function getProducts() {
        axios.get(url)
        .then((res) => {
            let filteredData = res.data.filter(item => item.category === "women's clothing");
            setData([...filteredData]);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleAdd = (product) => {
        dispatch(add(product));
    }

    useEffect(() => {
        getProducts()
    }, []);

    console.log(data)

  return (
    <>
    <Header />
    <div className="container">
        <div className="row">
            {data.map((x, i) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                    <ProductCard
                      CardTitle={x.title}
                      src={x.image}
                      Price={x.price}
                      onClick={()=>handleAdd(x)}
                    />
                </div>
            ))}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Womenproducts