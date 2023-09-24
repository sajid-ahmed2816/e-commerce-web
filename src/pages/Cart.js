import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  ProgressBar,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../config/redux/reducer/cartSlice";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Cart() {
  const cartData = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartData);

  const [itemQuantities, setItemQuantities] = useState(() =>
    cartData.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  console.log(itemQuantities);
  useEffect(() => {
    // Set default quantity to 1 for products already in the cart
    const defaultQuantities = cartData.reduce(
      (acc, item) => ({ ...acc, [item.id]: 1 }),
      {}
    );
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      ...defaultQuantities,
    }));
  }, [cartData]);

  const handleNavigate = () => {
    navigate("/products");
  };

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleDecrease = (id) => {
    if (itemQuantities[id] > 1) {
      const updatedQuantities = { ...itemQuantities };
      updatedQuantities[id] -= 1;
      setItemQuantities(updatedQuantities);
    } else if (itemQuantities[id] === 1) {
      // If quantity is 1, set it to 0 (prevent negative quantity)
      const updatedQuantities = { ...itemQuantities };
      updatedQuantities[id] = 0;
      setItemQuantities(updatedQuantities);
    }
  };

  const handleIncrease = (id) => {
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[id] = (updatedQuantities[id] || 0) + 1;
    setItemQuantities(updatedQuantities);
  };

  const getTotalPrice = () => {
    return cartData.reduce((total, item) => {
      return total + item.price * (itemQuantities[item.id] || 0);
    }, 0);
  };

  const deliveryCharges = getTotalPrice() !== 0 ? 100.0 : 0;

  const grandTotal =
    getTotalPrice() === 0 ? 0 : getTotalPrice() + deliveryCharges;

  const [currentStep, setCurrentStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const totalSteps = 3;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Header />

      {/* Cart items table */}
      {cartData.length === 0 ? (
        <div className="emptyMessage-container">
          <h2 className="emptyCart-message display-6">Your cart is empty</h2>
          <button onClick={handleNavigate} className="emptyCart-btn">
            See all categories
          </button>
        </div>
      ) : (
        <section className="cart-table">
          <div className="container">
            <div className="row">
              {/* Information Form */}
              <div className="col-md-7">
                <div className="p-4">
                  <Container>
                    <Row>
                      <ProgressBar
                        now={progress}
                        label={`${currentStep}/${totalSteps}`}
                      />
                    </Row>
                    <Row>
                      <Col>
                        {currentStep === 1 && (
                          <div>
                            <Form
                              noValidate
                              validated={validated}
                              onSubmit={handleSubmit}
                            >
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom01"
                                >
                                  <Form.Label>First name</Form.Label>
                                  <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    defaultValue="Mark"
                                  />
                                  <Form.Control.Feedback>
                                    Looks good!
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom02"
                                >
                                  <Form.Label>Last name</Form.Label>
                                  <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    defaultValue="Otto"
                                  />
                                  <Form.Control.Feedback>
                                    Looks good!
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustomUsername"
                                >
                                  <Form.Label>Email</Form.Label>
                                  <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">
                                      @
                                    </InputGroup.Text>
                                    <Form.Control
                                      type="text"
                                      placeholder="Email"
                                      aria-describedby="inputGroupPrepend"
                                      required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Please enter you email.
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom03"
                                >
                                  <Form.Label>City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="City"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  md="3"
                                  controlId="validationCustom04"
                                >
                                  <Form.Label>State</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="State"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  md="3"
                                  controlId="validationCustom05"
                                >
                                  <Form.Label>Zip</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Zip"
                                    required
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Row>
                              <Form.Group className="mb-3">
                                <Form.Check
                                  required
                                  label="Agree to terms and conditions"
                                  feedback="You must agree before submitting."
                                  feedbackType="invalid"
                                />
                              </Form.Group>
                              <Button type="submit">Submit form</Button>
                            </Form>
                          </div>
                        )}
                        {currentStep === 2 && <div>Step 2 Content</div>}
                        {currentStep === 3 && <div>Step 3 Content</div>}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        {currentStep > 1 && (
                          <Button variant="primary" onClick={prevStep}>
                            Previous
                          </Button>
                        )}
                        {currentStep < 3 && (
                          <Button variant="primary" onClick={nextStep}>
                            Next
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>

              {/* Cart Item Information */}
              <div className="col-md-5 p-5">
                {cartData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      boxShadow: "1px 1px 15px 1px #efefef",
                      marginBlock: "10px",
                      padding: "15px",
                    }}
                  >
                    <div className="d-flex justify-content-between cartItemContainerBox">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          className="del-item-btn"
                          onClick={() => handleRemove(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          width={"60px"}
                          height={"60px"}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div>
                        <p>{item.title}</p>
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="decreaseBtn"
                            onClick={() => handleDecrease(item.id)}
                          >
                            -
                          </button>
                          <span>{itemQuantities[item.id]}</span>
                          <button
                            className="IncreaseBtn"
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Cart;
