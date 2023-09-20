import "../App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Viewbutton({data}) {
    const navigate = useNavigate();

    const handleClick = (productData) => {
      // event.isPropagationStopped(() => true)
      navigate(`/description/${productData.id}`, {state: productData})
      // console.log(productData)
    };

  return (
    <button className="view-btn" onClick={() => handleClick(data)}>
        <FontAwesomeIcon icon={faEye}/>
    </button>
  )
}

export default Viewbutton;