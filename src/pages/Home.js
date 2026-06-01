import ProductCard from "../components/Produccard";
import Carousel from "react-bootstrap/Carousel";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../config/redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import Toastify from "../components/Toastify";
import { Images } from "../assets";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyModal from "../components/Modal";
import BannerService from "../api/banners/BannerService";
import CategoryService from "../api/category/CategoryService";


function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [shortData, setShortData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [instaData, setInstaData] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  let url = "https://fakestoreapi.com/products";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastify = Toastify;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  function getProducts() {
    axios
      .get(url)
      .then((res) => {
        setData([...data, ...res.data]);

        let item1 = res.data.find((x) => x.id === 2);
        let item2 = res.data.find((x) => x.id === 7);
        let item3 = res.data.find((x) => x.id === 14);
        let item4 = res.data.find((x) => x.id === 20);

        setRandomData([...randomData, item1, item2, item3, item4]);

        let shDtItem1 = res.data.find((x) => x.id === 3);
        let shDtItem2 = res.data.find((x) => x.id === 4);
        let shDtItem3 = res.data.find((x) => x.id === 15);
        let shDtItem4 = res.data.find((x) => x.id === 16);

        setShortData([
          ...shortData,
          shDtItem1,
          shDtItem2,
          shDtItem3,
          shDtItem4,
        ]);

        let instaItem1 = res.data.find((x) => x.id === 1);
        let instaItem2 = res.data.find((x) => x.id === 8);
        let instaItem3 = res.data.find((x) => x.id === 12);
        let instaItem4 = res.data.find((x) => x.id === 17);

        setInstaData([
          ...instaData,
          instaItem1,
          instaItem2,
          instaItem3,
          instaItem4,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleHeroButton = () => {
    navigate("/products");
  };

  const handleMenCategory = () => {
    navigate("/category/menwear");
  };

  const handleAccessoriesCategory = () => {
    navigate("/category/accessories");
  };

  const handleWomenCategory = () => {
    navigate("/category/womenwear");
  };

  const handleElectronicCategory = () => {
    navigate("/category/electronics");
  };

  const handleAdd = (event, product) => {
    event.stopPropagation();
    dispatch(add(product));
    toastify.ToastifyVariants.success("Product added to cart")
  };

  const handleProductDescription = (event, product) => {
    event.stopPropagation();
    navigate(`/description/${product.id}`, { state: product });
  };

  const getCategories = async () => {
    try {
      const result = await CategoryService.getCategories();
      if (result?.status) {
        const arr = result?.data?.categories?.filter(c => c?.isPopular === true);
        setCategories(arr);
      }
    } catch (error) {
      toastify.ToastifyVariants.error(error);
    };
  };

  const getBanners = async () => {
    try {
      const result = await BannerService.getBanner();
      if (result?.status) {
        setBanners(result?.data?.banners);
      }
    } catch (error) {
      toastify.ToastifyVariants.error(error);
    };
  };

  useEffect(() => {
    getProducts();
    getBanners();
    getCategories();
  }, []);

  return (
    <Fragment>
      {/* Hero Section */}

      <section className="hero">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="slider"
        >
          {banners?.map((item, ind) => (
            <Carousel.Item key={ind}>
              <div className="overlay">
                <img
                  className="d-block"
                  src={item?.image}
                  alt={item?.category?.type}
                />
              </div>
              <Carousel.Caption>
                <p>
                  <Button onClick={handleHeroButton} />
                  <span>{item?.tagline}</span>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Category Section */}

      <section className="categories">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="head text-center my-5">
                <h1 className="display-4">Shop by category</h1>
              </div>
            </div>
            {categories?.map((category, ind) => (
              <div className="col-md-3 my-5" key={ind}>
                <div onClick={handleMenCategory}>
                  <img src={category?.image} alt={category?.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <section className="product-cards">
        <div className="container">
          <div className="d-flex p-3 justify-content-center align-items-center">
            <h1 className="display-4">Hot Products Selling on Demand</h1>
          </div>
          <div className="row mb-5">
            {shortData.map((x, i) => (
              <div
                className="col-xl-3 col-lg-3 col-md-6 col-sm-12 my-5"
                key={i}
              >
                <div className="card-container">
                  <ProductCard
                    handleNavigate={(e) => handleProductDescription(e, x)}
                    data={x}
                    Price={x.price}
                    id={x.id}
                    CardTitle={x.title}
                    src={x.image}
                    onClick={(e) => handleAdd(e, x)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <section className="product-cards">
        <div className="container">
          <div className="d-flex p-3 justify-content-center align-items-center">
            <h1 className="display-4">Featured Products You Like</h1>
          </div>
          <div className="row mb-5">
            {randomData.map((x, i) => (
              <div
                className="col-xl-3 col-lg-3 col-md-6 col-sm-12 my-5"
                key={i}
              >
                <div className="card-container">
                  <ProductCard
                    handleNavigate={(e) => handleProductDescription(e, x)}
                    data={x}
                    Price={x.price}
                    id={x.id}
                    CardTitle={x.title}
                    src={x.image}
                    onClick={(e) => handleAdd(e, x)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}

      <section className="instagram">
        <div className="container">
          <div className="p-5 d-flex justify-content-center align-items-center">
            <h1 className="display-4">Gallery Of Our Featured Produts</h1>
          </div>
          <div className="row mb-5">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="insta-images">
                <img
                  src={Images.bannerImg1}
                  alt=""
                  width="100%"
                  height="300px"
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="insta-images">
                <img
                  src={Images.bannerImg2}
                  alt=""
                  width="100%"
                  height="300px"
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="insta-images">
                <img
                  src={Images.bannerImg3}
                  alt=""
                  width="100%"
                  height="300px"
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="insta-images">
                <img
                  src={Images.bannerImg4}
                  alt=""
                  width="100%"
                  height="300px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default Home;
