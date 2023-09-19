import React, {Fragment} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/Produccard';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { add } from '../config/redux/reducer/cartSlice';

function Search() {
  
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const handleAdd = (product) => {
    dispatch(add(product));
    console.log(product)
  }
  return (
    <Fragment>
      <Header />
      <Container>
        <div className='row'>
          <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 my-5'>
            <div className='card-container'>
              <ProductCard
                Price={data.price}
                id={data.id}
                src={data.image}
                CardTitle={data.title}
                onClick={() => handleAdd(data)}
              />
            </div>
          </div>
        </div>
      </Container>
      <Footer/>
    </Fragment>
  )
}

export default Search