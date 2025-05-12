import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { remove, reset } from "../config/redux/reducer/cartSlice";
import { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import PaymentService from "../api/payment/PaymentService";
import Toastify from "../components/Toastify";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

import "../App.css";

const totalSteps = 3;

const cardOptions = {
  style: {
    base: {
      padding: 8,
      iconColor: '#c4f0ff',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 400,
      fontFamily: 'Poppins, Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#CFD7E0',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
};

function Cart() {
  const [currentStep, setCurrentStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [formData, setFormData] = useState({});
  const [spinner, setSpinner] = useState(false);
  const progress = (currentStep / totalSteps) * 100;
  const [processing, setProcessing] = useState(false);
  const cartData = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [itemQuantities, setItemQuantities] = useState(() =>
    cartData.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  useEffect(() => {
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
      handleRemove(id);
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

  const deliveryCharges = cartData.length !== 0 ? 100 : 0;

  const grandTotal =
    getTotalPrice() === 0 ? 0 : getTotalPrice() + deliveryCharges;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setFormData({ ...formData });
      if (Object.entries(formData).length > 0) {
        nextStep();
      }
    }
  };

  // const handleOnlinePayment = async () => {
  //   if (!stripe || !elements) return;

  //   setProcessing(true);

  //   const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: cardElement,
  //   });

  //   if (error) {
  //     // Show error message if any
  //     console.log(error);
  //     alert(error.message);
  //     setProcessing(false);
  //     return;
  //   }

  //   const obj = {
  //     amount: grandTotal?.toFixed(2),
  //   }
  //   try {
  //     const result = await PaymentService.onlinePayment(obj);
  //     if (result.data.status) {
  //       Toastify.ToastifyVariants.success(result.data.message);
  //     }
  //     const {clientSecret} = result.data;

  //     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: stripePaymentMethod.id,
  //     });

  //     if (confirmError) {
  //       Toastify.ToastifyVariants.error(confirmError.message);
  //     } else {
  //       // Payment succeeded
  //       Toastify.ToastifyVariants.success("Payment Successful!");
  //     }
  //   } catch (error) {
  //     Toastify.ToastifyVariants.error(error);
  //   }
  // };

  const handleOnlinePayment = async () => {
    if (!stripe || !elements) return;

    setProcessing(true);

    const cardElement = elements.getElement("card");

    // Create payment method using Stripe's CardElement
    const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      // Show error message if any
      console.log(error);
      Toastify.ToastifyVariants.error(error.message);
      setProcessing(false);
      return;
    }

    const obj = {
      amount: grandTotal ? (grandTotal * 100).toFixed(0) : 0, // Convert amount to cents
    };

    try {
      // Call the backend to create a payment intent
      const result = await PaymentService.onlinePayment(obj);

      if (result.data.status) {
        Toastify.ToastifyVariants.success(result.data.message);
      }

      const { clientSecret } = result.data;  // Get the client secret for confirming the payment

      // Confirm the payment on the client side with the clientSecret
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: stripePaymentMethod.id,
      });

      if (confirmError) {
        Toastify.ToastifyVariants.error(confirmError.message);
      } else {
        // Payment succeeded, show success message
        Toastify.ToastifyVariants.success("Payment Successful!");
      }
    } catch (error) {
      // Handle any other errors
      Toastify.ToastifyVariants.error(error.message || "An error occurred");
    } finally {
      setProcessing(false); // Reset processing state
    }
  };


  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 1) {
        if (Object.keys(formData).length > 1) {
          setFormData(!formData);
        }
      }
    }
  };

  const handlePlaceOrder = () => {
    const {
      firstName,
      lastName,
      email,
      contact,
      billingAddress,
      shippingAddress,
      city,
      state,
      zip,
    } = formData;

    const serviceID = "service_pv26v5t";
    const templateID = "template_eihlqi5";
    const userID = "1_3oPznx1j1VBzGpJ";

    const emailData = {
      to_email: "sajid.ahmed2816@gmail.com",
      from_name: `${firstName} ${lastName}`,
      user_name: `${firstName} ${lastName}`,
      user_email: email,
      message: `Customer Details:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Contact: ${contact}
      Billing Address: ${billingAddress}
      Shipping Address: ${shippingAddress}
      City: ${city}
      State: ${state}
      Zip: ${zip}
      Order Details:
      ProductName: ${cartData.map((item) => item.title)}
      Quantity: ${cartData.length}
      Price: ${cartData.map((item) => item.price)}
      SKU: ${cartData.map((item) => item.id)}`,
    };

    setSpinner(true);

    emailjs
      .send(serviceID, templateID, emailData, userID)
      .then((response) => {
        console.log("Email sent successfully", response);
        dispatch(reset());
        setSpinner(false);
        nextStep();
      })
      .catch((error) => {
        console.error("Email error", error);
        setSpinner(false);
      });

    // nextStep();
  };

  return (
    <Fragment>
      {/* Cart items table */}
      {cartData.length === 0 && currentStep !== 3 ? (
        <div className="emptyMessage-container">
          <h2 className="emptyCart-message display-6">Your cart is empty</h2>
          <button onClick={handleNavigate} className="emptyCart-btn">
            See all categories
          </button>
        </div>
      ) : (
        <section className="cart-table">
          <div className="container">
            <div
              className="row m-5"
              style={{ justifyContent: currentStep === 3 && "center" }}
            >
              {/* Information Form */}
              <div className="col-md-6">
                <div className="border rounded p-4">
                  <Container>
                    <Row>
                      <ProgressBar className="my-2" now={progress} />
                    </Row>
                    <Row>
                      <Col>
                        {currentStep === 1 && (
                          <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                          >
                            <Row className="my-3">
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                              >
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="First name"
                                  name="firstName"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      firstName: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  First name required
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom02"
                              >
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Last name"
                                  name="lastName"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      lastName: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Last name required
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustomUsername"
                              >
                                <InputGroup hasValidation>
                                  <InputGroup.Text id="inputGroupPrepend">
                                    @
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name="email"
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        email: e.target.value,
                                      })
                                    }
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
                                <Form.Control
                                  type="number"
                                  placeholder="Contact No."
                                  required
                                  name="contact"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      contact: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a contact number.
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom04"
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Phone No."
                                  name="phone"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom05"
                              >
                                <Form.Control
                                  as={"textarea"}
                                  rows={3}
                                  placeholder="Billing Address"
                                  required
                                  name="billingAddress"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      billingAddress: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide billing address
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom05"
                              >
                                <Form.Control
                                  as={"textarea"}
                                  rows={3}
                                  placeholder="Shipping Address"
                                  required
                                  disabled={shippingSameAsBilling}
                                  name="shippingAddress"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      shippingAddress: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide billing address
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom05"
                              >
                                <Form.Check
                                  type="checkbox"
                                  label="Shipping address same as billing address"
                                  checked={shippingSameAsBilling}
                                  name="sameAs"
                                  onChange={(e) =>
                                    setShippingSameAsBilling(e.target.checked)
                                  }
                                />
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom05"
                              >
                                <Form.Control
                                  type="text"
                                  placeholder="City"
                                  required
                                  name="city"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      city: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid city.
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="3"
                                controlId="validationCustom06"
                              >
                                <Form.Control
                                  type="text"
                                  placeholder="State"
                                  required
                                  name="state"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      state: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid state.
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="3"
                                controlId="validationCustom07"
                              >
                                <Form.Control
                                  type="text"
                                  placeholder="Zip"
                                  required
                                  name="zip"
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      zip: e.target.value,
                                    })
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid zip.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            <Row>
                              <Col md="12">
                                <button
                                  name="button"
                                  className="buy-btn"
                                  type="submit"
                                >
                                  Next
                                </button>
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {currentStep === 2 && (
                          <Form>
                            <Row className="g-3">
                              <Col md="12">
                                <Form.Group>
                                  <Form.Label>Select Payment Method</Form.Label>
                                </Form.Group>
                              </Col>
                              <Col md="12">
                                <Form.Group style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                  <Form.Check
                                    type="radio"
                                    value="cod"
                                    label="Cash On Delivery"
                                    checked={paymentMethod === "cod"}
                                    name="paymentMethod"
                                    onChange={(e) =>
                                      setPaymentMethod(e.target.value)
                                    }
                                  />
                                  <Form.Check
                                    type="radio"
                                    value="online"
                                    label="Online Payment"
                                    checked={paymentMethod === "online"}
                                    name="paymentMethod"
                                    onChange={(e) => {
                                      setPaymentMethod(e.target.value)
                                      if (e.target.value === "online") {
                                        handleOnlinePayment()
                                      }
                                    }}
                                  />
                                </Form.Group>
                              </Col>
                              {paymentMethod === "online" && (
                                <Col md="12">
                                  <Row className="g-3">
                                    <Col md="12">
                                      <h4 style={{ margin: 0 }}>Enter Card Details</h4>
                                    </Col>
                                    <Col md="12">
                                      <CardNumberElement options={cardOptions} />
                                    </Col>
                                    <Col md="8">
                                      <CardExpiryElement options={cardOptions} />
                                    </Col>
                                    <Col md="4">
                                      <CardCvcElement options={cardOptions} />
                                    </Col>
                                  </Row>
                                </Col>
                              )}
                              {paymentMethod === "cod" ? (
                                <Col md="12">
                                  <button className="buy-btn" onClick={prevStep}>
                                    Previous
                                  </button>
                                </Col>
                              ) : (
                                <Fragment>
                                  <Col md="6">
                                    <button className="buy-btn" onClick={prevStep}>
                                      Previous
                                    </button>
                                  </Col>
                                  <Col md="6">
                                    <button className="buy-btn" onClick={prevStep}>
                                      Pay Online
                                    </button>
                                  </Col>
                                </Fragment>
                              )}
                            </Row>
                          </Form>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {currentStep === 3 && (
                          <div>
                            <div className="d-flex align-items-center gap-1 my-3">
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                style={{ color: "#00941e", fontSize: "18px" }}
                              />
                              <p style={{ fontSize: "18px", margin: 0 }}>
                                Your order has been placed successfully.
                              </p>
                            </div>
                            <p>
                              You will receive confirmation email and your order
                              number in your email address.
                            </p>
                            <button
                              onClick={() => navigate("/products")}
                              className="buy-btn"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>

              {/* Cart Item Information */}
              <div
                className="col-md-6"
                style={{ display: currentStep === 3 ? "none" : "block" }}
              >
                <div
                  style={{
                    borderRadius: "6px",
                    position: "sticky",
                    border: "1px solid #dee2e6",
                    top: "130px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16
                    }}
                  >
                    {cartData.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "16px",
                          borderBottom: cartData.length > 1 && index !== cartData.length - 1 ? "1px solid #e9e9e9" : "none",
                        }}
                      >
                        <div className="d-flex cartItemContainerBox" style={{ gap: "10px" }}>
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
                            <p className="item-title">{item.title}</p>
                            <div className="d-flex gap-4">
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
                  <div className="border-top d-flex flex-column gap-3 p-3">
                    <div className="d-flex flex-row justify-content-between">
                      <p style={{ margin: 0 }}>SUBTOTAL:</p>
                      <p style={{ margin: 0 }}>${getTotalPrice()}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p style={{ margin: 0 }}>DELIVERY CHARGES:</p>
                      <p style={{ margin: 0 }}>${deliveryCharges.toFixed(2)}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p style={{ margin: 0 }}>GRAND TOTAL</p>
                      <p style={{ margin: 0 }}>${grandTotal.toFixed(2)}</p>
                    </div>
                    <button
                      className={paymentMethod === true ? "order-btn" : ""}
                      style={{
                        display: currentStep > 1 ? "block" : "none",
                        width: "100%",
                        padding: "10px 15px",
                        borderRadius: "4px",
                        outline: "none",
                        border:
                          paymentMethod === true
                            ? "1px solid #000000"
                            : "1px solid #dee2e6",
                        backgroundColor: paymentMethod && "#000000",
                        color: paymentMethod && "#ffffff",
                        transition: "all .3s ease-in-out",
                      }}
                      onClick={handlePlaceOrder}
                      disabled={!paymentMethod}
                    >
                      {spinner ? <Spinner animation="border" /> : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
}

export default Cart;
