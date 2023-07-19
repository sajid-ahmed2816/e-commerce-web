import "../App.css"

function Cartbutton(props) {
    let {onClick} = props

    const handleClick = (event) => {
      event.stopPropagation();
      onClick();
    };

  return (
    <button className="cart-btn" onClick={handleClick}>
        Add to Cart
    </button>
  )
}

export default Cartbutton