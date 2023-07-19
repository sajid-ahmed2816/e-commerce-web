import Header from '../components/Header';
import ProductCard from '../components/Produccard';
import Footer from '../components/Footer';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../config/redux/reducer/cartSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  let imgsArr = [
    "https://www.realmenrealstyle.com/wp-content/uploads/2013/07/Style-Tips-For-Tall-Men.jpg",
    "https://content.api.news/v3/images/bin/9e887bb6e1921efa8550896c0840a3e3",
    "https://img.freepik.com/free-photo/positive-woman-stylish-outfit-moves-pink-background-pretty-woman-white-blouse-red-high-heels-is-smiling-camera_197531-18611.jpg?w=2000"
  ];
  let url = 'https://fakestoreapi.com/products'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }

  function getProducts() {
    axios.get(url)
      .then((res) => {
        setData([...data, ...res.data])
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleHeroButton =() => {
    navigate('/products')
  }

  const handleMenCategory = () => {
    navigate('/category/menwear')
  }

  const handleAccessoriesCategory = () => {
    navigate('/category/accessories')
  }

  const handleWomenCategory = () => {
    navigate('/category/womenwear')
  }

  const handleSelectAdd = (data) => {
    navigate(`/description/${data.id}`, 
      { 
        state: { product: data } 
      }
    );
  }

  const handleAdd = (product) => {
    dispatch(add(product));
    console.log(product)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const shortData = data.slice(0, 4);
  const instaData = data.slice(4, 8);

  return (
    <>
      {/* Header Section */}
      <header>
        <Header />
      </header>

      {/* Hero Section */}

      <section className="hero">
        <Carousel activeIndex={index} onSelect={handleSelect} className="slider">
          <Carousel.Item>
            <img
              className="d-block"
              src={imgsArr[0]}
              alt="First slide"
            />
            <Carousel.Caption>
              <p>
                <Button onClick={handleHeroButton}/>
                <span>
                  A perfect choice for your fashion standard.  
                </span> 
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={imgsArr[1]}
              alt="Second slide"
            />

            <Carousel.Caption>
              <p>
                <Button onClick={handleHeroButton}/>
                <span>
                  A perfect choice for your fashion standard.  
                </span> 
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={imgsArr[2]}
              alt="Third slide"
            />

            <Carousel.Caption>
              <p>
                <Button onClick={handleHeroButton}/>
                <span>
                  A perfect choice for your fashion standard.  
                </span> 
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Category Section */}

      <section className="categories">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div onClick={handleMenCategory}>
                <img src={imgsArr[0]} alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div onClick={handleAccessoriesCategory}>
                <img src={imgsArr[1]} alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div onClick={handleWomenCategory}>
                <img src={imgsArr[2]} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <section className="product-cards">
        <div className="container">
          <div className='d-flex p-3 justify-content-center align-items-center'>
            <h2>
              Hot Products Selling on Demand
            </h2>
          </div>
          <div className="row">
            {shortData.map((x, i) =>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i} onClick={() => handleSelectAdd(x)}>
                <ProductCard
                  Price={x.price}
                  id={x.id}
                  CardTitle={x.title}
                  src={x.image}
                  onClick={() => handleAdd(x)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <section className="instagram">
        <div className="container">
          <div className='p-5 d-flex justify-content-center align-items-center'>
            <h2>
              Gallery Of Our Featured Produts
            </h2>
          </div>
          <div className="row">
            {instaData.map((x, i) =>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                <div className='insta-images'>
                  <img src={x.image} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <Footer />
    </>
  )
}

export default Home