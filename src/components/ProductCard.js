import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import MyModal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import { decrement, increment } from "../config/redux/reducer/cartSlice";

function ProductCard(props) {
  let { CardTitle, src, Price, onClick, data } = props;

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.Cart);

  const handleDecrease = (id) => {
    dispatch(decrement(id));    // new action
  };

  const handleIncrease = (id) => {
    // Find the item to pass the full object to add()
    const item = cartData.find((item) => item._id === id);
    if (item) {
      dispatch(increment(item));
    }
  };

  const handleModal = () => {
    setModal(true);
  };


  return (
    <Fragment>
      <MyModal show={modal} onHide={() => setModal(false)} data={data} />
      <Card>
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
        </Card.Body>
        <Card.Body>
          <div className="d-flex flex-column gap-2">
            <Card.Title
              title={CardTitle}
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                overflow: "hidden",
                margin: 0,
              }}
            >
              {CardTitle}
            </Card.Title>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordBreak: "break-word",
                }}
              >
                {data?.description}
              </p>
              <button
                onClick={handleModal}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  fontSize: "12px",
                  alignSelf: "flex-start",
                }}
              >
                See more
              </button>
            </div>
            <Card.Text style={{ margin: 0 }}>${Price}</Card.Text>
            {cartData?.some((p) => p._id === data?._id) ? (
              <div
                style={{
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #000000",
                  borderRadius: "6px",
                  background: "#ffffff",
                  color: "#000000",
                }}
              >
                <button
                  style={{
                    outline: "none",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    background: "transparent"
                  }}
                  onClick={() => handleDecrease(data?._id)}
                >
                  -
                </button>
                <p className="m-0">{cartData?.find((p) => p._id === data?._id)?.quantity}</p>
                <button
                  style={{
                    outline: "none",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    background: "transparent"
                  }}
                  onClick={() => handleIncrease(data?._id)}
                >
                  +
                </button>
              </div>
            ) : (
              <PrimaryButton
                onClick={onClick}
                icon={<FontAwesomeIcon icon={faCartShopping} />}
                title={"Add To Cart"}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ProductCard;