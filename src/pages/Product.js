import Header from '../components/Header'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../components/Produccard'
import Footer from '../components/Footer'
import '../App.css'

function Product() {
  const [data, setData] = useState([])
  let url = "https://fakestoreapi.com/products"

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
  }, [])

  return (
    <>
      <Header />
      <div className="container">
      <div className="row all-products">
        {data.map((x, i) =>
          <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12' key={i}>
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