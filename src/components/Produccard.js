import Card from 'react-bootstrap/Card';
import Viewbutton from './Viewbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function ProductCard(props) {
  let { CardTitle, src, Price, onClick, data } = props

  return (
    <Card style={{ width: '16rem' }} >
      <Card.Img
        variant="top"
        src={src}
        style={
          {
            height: '200px',
            objectFit: 'contain',
            padding: '10px'
          }
        }
      />
      <Card.Body>
        <Card.Title style={
          {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '230px',
            overflow: 'hidden',
            padding: '0px 10px'
          }
        }>{CardTitle}</Card.Title>
        <Card.Text style={{padding: '10px'}}>
          ${Price}
        </Card.Text>
        <div className='btn-container'>
          <Viewbutton data={data}/>
        </div>
        <div className='buy-btn-container'>
          <button 
            className='buy-btn'
            onClick={onClick}
          >
            <FontAwesomeIcon icon={faCartShopping}/>Buy Now
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;