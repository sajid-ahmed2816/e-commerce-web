import "../App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Viewbutton(props) {
    let {data} = props

    const handleClick = (productData) => {
      console.log('productData', productData)
    };

  return (
    <button className="view-btn" onClick={() => handleClick(data)}>
        <FontAwesomeIcon icon={faEye}/>
    </button>
  )
}

export default Viewbutton;