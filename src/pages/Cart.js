import { useState, useRef, useEffect, Fragment } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  InputGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, remove, reset } from "../config/redux/reducer/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import PaymentService from "../api/payment/PaymentService";
import toastify from "../components/Toastify";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import "../App.css";
import useAuth from "../hooks/useAuth";
import OrderServices from "../api/order/OrderServices";

const totalSteps = 3;

const cardOptions = {
  style: {
    base: {
      border: "1px solid #dee2e6",
      borderRadius: "6px",
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
      iconColor: '#fd0f0f',
      color: '#fd0f0f',
    },
  },
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Cart() {
  const { firstName, lastName, email, userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [spinner, setSpinner] = useState(false);
  const progress = (currentStep / totalSteps) * 100;
  const [processing, setProcessing] = useState(false);
  const cartData = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const stripe = useStripe();
  // const elements = useElements();
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    contact: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
    country: "",
    city: "",
    state: "",
    zip: ""
  });

  const { pathname } = useLocation();

  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCvcRef = useRef(null);
  const stripeInstanceRef = useRef(null);
  const elementsRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initStripe = async () => {
      try {
        const stripe = await stripePromise;
        if (!isMounted) return;

        const elements = stripe.elements();

        // Create each element and mount it
        const cardNumber = elements.create('cardNumber', cardOptions);
        const cardExpiry = elements.create('cardExpiry', cardOptions);
        const cardCvc = elements.create('cardCvc', cardOptions);

        // Mount only if refs are available
        if (cardNumberRef.current) cardNumber.mount(cardNumberRef.current);
        if (cardExpiryRef.current) cardExpiry.mount(cardExpiryRef.current);
        if (cardCvcRef.current) cardCvc.mount(cardCvcRef.current);

        stripeInstanceRef.current = stripe;
        elementsRef.current = elements;
      } catch (err) {
        console.error('Stripe initialization error:', err);
      }
    };

    initStripe();

    // Cleanup
    return () => {
      isMounted = false;
      // Only call destroy if it exists and is a function
      if (elementsRef.current && typeof elementsRef.current.destroy === 'function') {
        elementsRef.current.destroy();
      }
    };
  }, []);

  const handleNavigate = () => {
    navigate("/products");
  };

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

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const getTotalPrice = () => {
    return cartData.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const deliveryCharges = cartData.length !== 0 ? 100 : 0;

  const grandTotal = getTotalPrice() === 0 ? 0 : getTotalPrice() + deliveryCharges;

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

  const handlePlaceOrder = async () => {
    setSpinner(true);
    const data = {
      user: userId,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      mobile: formData?.contact,
      telephone: formData?.phone,
      billingAddress: formData?.billingAddress,
      shippingAddress: shippingSameAsBilling ? formData?.billingAddress : formData?.shippingAddress,
      country: formData?.country,
      state: formData?.state,
      city: formData?.city,
      zip: formData?.zip,
      paymentMethod: paymentMethod,
      dc: deliveryCharges,
      total: grandTotal.toFixed(2),
      items: cartData?.map(d => ({
        product: d?._id,
        quantity: d?.quantity,
        price: d?.price
      }))
    };
    try {
      const result = await OrderServices.createOrder(data);
      if (result.status) {
        toastify.success(result.message);
        dispatch(reset());
        setSpinner(false);
        nextStep();
      }
    } catch (error) {
      toastify.error(error);
    } finally {
      setSpinner(false);
      setProcessing(false);
    }
  };

  const handleOnlinePayment = async () => {
    const stripe = stripeInstanceRef.current;
    const elements = elementsRef.current;
    if (!stripe || !elements) {
      toastify.error("Stripe is not initialized.");
      return;
    }

    setProcessing(true);

    // Directly create PaymentMethod using raw elements
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement('cardNumber'), // ya direct elements create se
    });

    if (error) {
      toastify.error(error.message);
      setProcessing(false);
      return;
    }

    const obj = {
      amount: grandTotal,
    };

    try {
      const result = await PaymentService.onlinePayment(obj);
      if (!result.status) {
        toastify.error(result.message || "Payment initiation failed");
        setProcessing(false);
        return;
      }
      const clientSecret = result.data?.clientSecret;
      if (!clientSecret) throw new Error("No client secret received.");

      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        toastify.error(confirmError.message);
      } else {
        toastify.success("Payment Successful!");
        await handlePlaceOrder();
      }
    } catch (error) {
      toastify.error(error.message || "An error occurred during payment.");
    } finally {
      setProcessing(false);
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

  return userId ? (
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
              className="row my-5"
              style={{ justifyContent: currentStep === 3 && "center" }}
            >
              {/* Information Form */}
              <div className="col-md-7">
                <div className="border rounded p-3">
                  <Row className="g-2">
                    <div className="col-12">
                      <ProgressBar now={progress} />
                    </div>
                    <Col className="mt-3">
                      {currentStep === 1 && (
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={handleSubmit}
                        >
                          <div className="row g-3">
                            <div className="col-12">
                              <Row className="g-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom01"
                                >
                                  <Form.Control
                                    disabled={formData.firstName ? true : false}
                                    required
                                    type="text"
                                    placeholder="First name"
                                    name="firstName"
                                    value={formData.firstName}
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
                                    disabled={formData.lastName ? true : false}
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    name="lastName"
                                    value={formData.lastName}
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
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
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
                                      disabled={formData.email ? true : false}
                                      type="text"
                                      placeholder="Email"
                                      aria-describedby="inputGroupPrepend"
                                      required
                                      name="email"
                                      value={formData.email}
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
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom03"
                                >
                                  <Form.Control
                                    value={formData.contact}
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
                                    value={formData.phone}
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
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom05"
                                >
                                  <Form.Control
                                    value={formData.billingAddress}
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
                                    value={formData.shippingAddress}
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
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
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
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom05"
                                >
                                  <Form.Control
                                    value={formData.country}
                                    type="text"
                                    placeholder="Country"
                                    required
                                    name="country"
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        country: e.target.value,
                                      })
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid country.
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom05"
                                >
                                  <Form.Control
                                    value={formData.city}
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
                              </Row>
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
                                <Form.Group
                                  as={Col}
                                  md="6"
                                  controlId="validationCustom06"
                                >
                                  <Form.Control
                                    value={formData.state}
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
                                  md="6"
                                  controlId="validationCustom07"
                                >
                                  <Form.Control
                                    value={formData.zip}
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
                            </div>
                            <div className="col-12">
                              <Row className="g-3">
                                <Col md="12">
                                  <button
                                    name="button"
                                    type="submit"
                                    className="primary-button"
                                  >
                                    Next
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-12">
                      <Form>
                        <Row className="g-3" style={{ display: currentStep === 2 ? "flex" : "none" }}>
                          <Col className="col-12">
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
                                    }}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Col>
                          <Col md="12">
                            <Row className={`${paymentMethod === "online" ? "row" : "d-none"} g-3`}>
                              <Col md="12">
                                <h4 style={{ margin: 0 }}>Enter Card Details</h4>
                              </Col>
                              <Col md="12">
                                <div className="row g-3 justify-content-around">
                                  <div
                                    ref={cardNumberRef}
                                    className="col-12"
                                    style={{
                                      border: '1px solid #dee2e6',
                                      borderRadius: '6px',
                                      background: 'white',
                                      width: "calc(100% - 18px)",
                                    }}
                                  />
                                  <div
                                    ref={cardExpiryRef}
                                    className="col-6"
                                    style={{
                                      border: '1px solid #dee2e6',
                                      borderRadius: '6px',
                                      background: 'white',
                                      width: "calc(50% - 18px)",
                                    }}
                                  />
                                  <div
                                    ref={cardCvcRef}
                                    className="col-6"
                                    style={{
                                      border: '1px solid #dee2e6',
                                      borderRadius: '6px',
                                      background: 'white',
                                      width: "calc(50% - 18px)",
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          {paymentMethod === "cod" ? (
                            <Fragment>
                              <Col className="col-6">
                                <button
                                  className="secondary-button"
                                  onClick={prevStep}
                                >
                                  Previous
                                </button>
                              </Col>
                              <Col md="6">
                                <button
                                  className="primary-button"
                                  onClick={handlePlaceOrder}
                                  disabled={!paymentMethod}
                                  type={"button"}
                                >
                                  {spinner ? <Spinner animation="border" /> : "Place Order"}
                                </button>
                              </Col>
                            </Fragment>
                          ) : paymentMethod === "online" ? (
                            <Fragment>
                              <Col md="6">
                                <button
                                  className="secondary-button"
                                  onClick={prevStep}
                                >
                                  Previous
                                </button>
                              </Col>
                              <Col md="6">
                                <button
                                  type="button"
                                  className="primary-button"
                                  disabled={processing}
                                  onClick={(e) => handleOnlinePayment(e)}
                                >
                                  {processing ? <Spinner animation="border" /> : "Pay Online"}
                                </button>
                              </Col>
                            </Fragment>
                          ) : null}
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {currentStep === 3 && (
                        <Fragment>
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
                            className="primary-button"
                          >
                            Continue Shopping
                          </button>
                        </Fragment>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>

              {/* Cart Item Information */}
              <div
                className="col-md-5"
                style={{ display: currentStep === 3 ? "none" : "block", height: "", flex: 1 }}
              >
                <div
                  style={{
                    border: "1px solid #dee2e6",
                    borderRadius: "6px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
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
                              onClick={() => handleRemove(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <img
                              alt={item?.name}
                              src={item.image}
                              width={"60px"}
                              height={"60px"}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                marginBottom: "4px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "220px"
                              }}
                            >
                              {item.name}
                            </p>
                            <div className="d-flex gap-4">
                              <button
                                className="decreaseBtn"
                                onClick={() => handleDecrease(item._id)}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                className="IncreaseBtn"
                                onClick={() => handleIncrease(item._id)}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment >
  ) : (
    <Navigate to={"/login"} state={{ path: pathname }} />
  );
}

export default Cart;
