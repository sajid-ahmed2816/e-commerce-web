import { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Viewbutton from "./Viewbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MyModal from "./Modal";

function ProductCard(props) {
  let { CardTitle, src, Price, onClick, data, handleNavigate } = props;

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  };

  return (
    <Fragment>
      <MyModal show={modal} onHide={() => setModal(false)} data={data} />
      <Card onClick={handleNavigate}>
        <Card.Body>
          <Card.Img
            variant="top"
            src={src}
            style={{
              height: "180px",
              objectFit: "contain",
              padding: "10px",
            }}
          />
          <div className="btn-container">
            <Viewbutton
              onClick={(e) => {
                e.stopPropagation();
                handleModal();
              }}
            />
          </div>
        </Card.Body>
        <Card.Body>
          <Card.Title
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "230px",
              overflow: "hidden",
              padding: "0px 10px",
            }}
          >
            {CardTitle}
          </Card.Title>
          <Card.Text style={{ padding: "10px" }}>${Price}</Card.Text>
          <div className="buy-btn-container">
            <button className="buy-btn" onClick={onClick}>
              <FontAwesomeIcon icon={faCartShopping} />
              Buy Now
            </button>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ProductCard;
