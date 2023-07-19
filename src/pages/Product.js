import Header from '../components/Header'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../components/Produccard'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Product() {
  const [data, setData] = useState([]);
  const [menWear, setMenWear] = useState([]);
  const [womenWear, setWomenWear] = useState([]);
  const [jewelery, setJewelery] = useState([]);
  const [electronic, setElectronics] = useState([]);
  let url = "https://fakestoreapi.com/products";
  const navigate = useNavigate();

  const handleSelectAdd = (data) => {
    navigate(`/description/${data.id}`, 
      { 
        state: { product: data } 
      }
    );
  }

  function getProducts() {
    axios.get(url)
      .then((res) => {
        setData([...data, ...res.data]);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getProducts()
  }, []);

  useEffect(() => {
    let menProducts = data.filter(item => item.category === "men's clothing");
    setMenWear([...menProducts]);

    let womenProducts = data.filter(item => item.category === "women's clothing");
    setWomenWear([...womenProducts]);

    let accessories = data.filter(item => item.category === "jewelery");
    setJewelery([...accessories]);

    let electronics = data.filter(item => item.category === "electronics");
    setElectronics([...electronics]);
  }, [data])

  return (
    <>
      <Header />
      <div className="container">
        <div className="row all-products">

          <h2 className='p-4 text-center display-5'>Men's Clothing</h2>
          {menWear.map((x, i) =>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12' key={i} onClick={() => handleSelectAdd(x)}>
              <ProductCard
                id={x.id}
                src={x.image}
                Price={x.price}
                CardTitle={x.title}
              />
            </div>
          )}

          <h2 className='p-4 text-center display-5'>Women's Clothing</h2>
          {womenWear.map((x, i) => 
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12' key={i} onClick={() => handleSelectAdd(x)}>
              <ProductCard 
                id={x.id}
                src={x.image}
                Price={x.price}
                CardTitle={x.title}
              />
            </div>
          )}

          <h2 className='p-4 text-center display-5'>Jeweleries</h2>
          {jewelery.map((x, i) => 
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12' key={i} onClick={() => handleSelectAdd(x)}>
              <ProductCard 
                id={x.id}
                src={x.image}
                Price={x.price}
                CardTitle={x.title}
              />
            </div>
          )}

          <h2 className='p-4 text-center display-5'>Electronics</h2>
          {electronic.map((x, i) => 
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12' key={i} onClick={() => handleSelectAdd(x)}>
              <ProductCard 
                id={x.id}
                src={x.image}
                Price={x.price}
                CardTitle={x.title}
              />
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Product