import Card from 'react-bootstrap/Card';
import Cartbutton from './Cartbutton';

function ProductCard(props) {
  let { CardTitle, src, Price, onClick } = props
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
            width: '190px',
            overflow: 'hidden'
          }
        }>{CardTitle}</Card.Title>
        <Card.Text>
          ${Price}
        </Card.Text>
        <div className='btn-container'>
          <Cartbutton onClick={onClick}/>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;