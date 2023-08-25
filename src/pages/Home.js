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
  const [shortData, setShortData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [instaData, setInstaData] = useState([]);
  
  let imgsArr = [
    "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-842811.jpg&fm=jpg",
    "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-974911.jpg&fm=jpg",
    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
    "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg?cs=srgb&dl=pexels-photomix-company-213162.jpg&fm=jpg"
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
        console.log(data);

        let item1 = res.data.find(x => x.id === 2);
        let item2 = res.data.find(x => x.id === 7);
        let item3 = res.data.find(x => x.id === 14);
        let item4 = res.data.find(x => x.id === 20);

        setRandomData([...randomData, item1, item2, item3, item4]);
        
        let shDtItem1 = res.data.find(x => x.id === 3);
        let shDtItem2 = res.data.find(x => x.id === 4);
        let shDtItem3 = res.data.find(x => x.id === 15);
        let shDtItem4 = res.data.find(x => x.id === 16);

        setShortData([...shortData, shDtItem1, shDtItem2, shDtItem3, shDtItem4]);

        let instaItem1 = res.data.find(x => x.id === 1);
        let instaItem2 = res.data.find(x => x.id === 8);
        let instaItem3 = res.data.find(x => x.id === 12);
        let instaItem4 = res.data.find(x => x.id === 17);

        setInstaData([...instaData, instaItem1, instaItem2, instaItem3, instaItem4]);
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

  const handleElectronicCategory = () => {
    navigate('/category/electronics')
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
    getProducts();
  }, [])

  console.log(data)

  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Hero Section */}

      <section className="hero">
        <Carousel activeIndex={index} onSelect={handleSelect} className="slider">
          <Carousel.Item>
            <div className='overlay'>
              <img
                className="d-block"
                src={imgsArr[0]}
                alt="First slide"
              />
            </div>
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
            <div className='overlay'>
              <img
                className="d-block"
                src={imgsArr[1]}
                alt="Second slide"
              />
            </div>

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
            <div className='overlay'>
              <img
                className="d-block"
                src={imgsArr[2]}
                alt="Third slide"
              />
            </div>

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
            <div className='overlay'>
              <img
                className="d-block"
                src={imgsArr[3]}
                alt="Fourth slide"
              />
            </div>

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
            <div className="col-md-12">
              <div className="head text-center my-5">
                <h1 className='display-4'>
                  Shop by category
                </h1>
              </div>
            </div>
            <div className="col-md-3 my-5">
              <div onClick={handleMenCategory}>
                <img src={imgsArr[0]} alt="" />
              </div>
            </div>
            <div className="col-md-3 my-5">
              <div onClick={handleWomenCategory}>
                <img src={imgsArr[1]} alt="" />
              </div>
            </div>
            <div className="col-md-3 my-5">
              <div onClick={handleAccessoriesCategory}>
                <img src={imgsArr[2]} alt="" />
              </div>
            </div>
            <div className="col-md-3 my-5">
              <div onClick={handleElectronicCategory}>
                <img src={imgsArr[3]} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <section className="product-cards">
        <div className="container">
          <div className='d-flex p-3 justify-content-center align-items-center'>
            <h1 className='display-4'>
              Hot Products Selling on Demand
            </h1>
          </div>
          <div className="row mb-5">
            {shortData.map((x, i) =>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 my-5" key={i} onClick={() => handleSelectAdd(x)}>
                <div className='card-container'>
                  <ProductCard
                    Price={x.price}
                    id={x.id}
                    CardTitle={x.title}
                    src={x.image}
                    onClick={() => handleAdd(x)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Card Section */}

      <section className="product-cards">
        <div className="container">
          <div className='d-flex p-3 justify-content-center align-items-center'>
            <h1 className='display-4'>
              Featured Products You Like
            </h1>
          </div>
          <div className="row mb-5">
            {randomData.map((x, i) =>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 my-5" key={i} onClick={() => handleSelectAdd(x)}>
                <div className="card-container">
                  <ProductCard
                    Price={x.price}
                    id={x.id}
                    CardTitle={x.title}
                    src={x.image}
                    onClick={() => handleAdd(x)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Instagram Section */}

      <section className="instagram">
        <div className="container">
          <div className='p-5 d-flex justify-content-center align-items-center'>
            <h1 className='display-4'>
              Gallery Of Our Featured Produts
            </h1>
          </div>
          <div className="row my-5">
            {imgsArr.map((x, i) =>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={i}>
                <div className='insta-images'>
                  <img src={x} alt="" width="100%" height="300px"/>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </>
  )
}

export default Home;