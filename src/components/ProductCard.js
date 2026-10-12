import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import PrimaryButton from "./PrimaryButton";

function ProductCard(props) {
  let { CardTitle, src, Price, data, onClick } = props;

  const finalPrice =
    data?.discountType === "percentage"
      ? data.price * (1 - data.discount / 100)
      : data.price - data.discount;

  return (
    <Fragment>
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
            </div>

            <div className="d-flex align-items-center gap-3">
              {data?.discount > 0 ? (
                <Card.Text style={{ margin: 0 }}>
                  ${finalPrice}
                </Card.Text>
              ) : (
                ""
              )}

              <Card.Text
                style={{
                  margin: 0,
                  textDecoration:
                    data?.discount > 0
                      ? "line-through"
                      : "none",
                  color:
                    data?.discount > 0
                      ? "#adadad"
                      : "#000000",
                }}
              >
                {(Price != "N/A") ? `Starting from $${Price}` : Price}
              </Card.Text>
            </div>

            <PrimaryButton
              onClick={onClick}
              title={"View Product"}
            />

          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ProductCard;