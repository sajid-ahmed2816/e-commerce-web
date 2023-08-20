import "../App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Cartbutton(props) {
    let {onClick} = props

    const handleClick = (event) => {
      event.stopPropagation();
      onClick();
    };

  return (
    <button className="cart-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faShoppingCart}/>
    </button>
  )
}

export default Cartbutton;