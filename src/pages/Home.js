import Carousel from "react-bootstrap/Carousel";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../config/redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import toastify from "../components/Toastify";
import { Images } from "../assets";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BannerService from "../api/banners/BannerService";
import CategoryService from "../api/category/CategoryService";
import Loader from "../components/Loader";
import ProductService from "../api/product/ProductService";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from "../components/ProductCard";

function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleHeroButton = () => {
    navigate("/products");
  };

  const handleNavigate = (id) => {
    navigate("/products", { state: { categoryId: id } });
  };

  const handleAdd = (event, product) => {
    event.stopPropagation();
    dispatch(increment(product));
    toastify.success("Product added to cart")
  };

  const getData = async () => {
    setIsLoading(true);
    const productsParams = {
      page: 1,
      limit: "all"
    }
    try {
      const [bannersData, categoriesData, productsData] = await Promise.all([BannerService.getBanner(), CategoryService.getCategories(), ProductService.getProducts(productsParams)]);
      if (bannersData?.status) {
        setBanners(bannersData?.data?.banners);
      };
      if (categoriesData?.status) {
        setCategories(categoriesData?.data?.categories);
      };
      if (productsData?.status) {
        setData(productsData?.data?.products);
        const featuredProducts = productsData?.data?.products?.filter(p => p.isFeatured === true);
        setFeaturedData(featuredProducts);
      };
    } catch (error) {
      toastify.error(error);
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    getData();
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
                  <span style={{ textAlign: "start" }}>{item?.tagline}</span>
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
                <div onClick={() => handleNavigate(category?._id)}>
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
            <h1 className="display-4 m-0">Hot Products Selling on Demand</h1>
          </div>
          <div className="my-5">
            <Swiper
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
              }}
              style={{
                padding: "12px"
              }}
            >
              {data.map((x, i) => (
                <SwiperSlide key={i}>
                  <div className="card-container h-100">
                    <ProductCard
                      data={x}
                      Price={x.price}
                      id={x.id}
                      CardTitle={x.name}
                      src={x.image}
                      onClick={(e) => handleAdd(e, x)}
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </Swiper>
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
            {featuredData.map((x, i) => (
              <div
                className="col-xl-3 col-lg-3 col-md-6 col-sm-12 my-5"
                key={i}
              >
                <div className="card-container">
                  <ProductCard
                    data={x}
                    Price={x.price}
                    id={x.id}
                    CardTitle={x.name}
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
