import React, { Fragment, useState } from "react";
import { Row, Col, Form, Container, FormGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../api/auth";
import Toastify from "../components/Toastify";
import { auth, provider, signInWithPopup } from "../config/firebase";
import { Images } from "../assets";

function Signup() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastify = Toastify;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let result = await AuthServices.signup(form);
      if (result === null) return;
      if (result.status) {
        toastify.ToastifyVariants.success(result.data.message);
        navigate("/login");
      }
    } catch (error) {
      toastify.ToastifyVariants.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("🚀 ~ handleGoogleLogin ~ result:", result)
      const token = await result.user.getIdToken();
      const response = await AuthServices.login({ token: token });
      if (response.data.status === true) {
        const name = `${response.data.data.user.firstName} ${response.data.data.user.lastName}`
        const obj = {
          token: response.data.data.token,
          name: name,
          picture: response.data.data.user.picture,
          email: response.data.data.user.email
        }
        userLogin(obj);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(45deg, rgb(0 0 0) 10%, rgb(241, 241, 241) 110%)",
        height: "100%"
      }}
    >
      <Container style={{ height: "100%" }}>
        <Row className="h-100 d-flex align-items-center justify-content-center">
          <Col md={"6"}>
            <div
              className="d-flex flex-column align-items-stretch justify-content-center my-auto gap-4"
              style={{
                padding: 24,
                background: "rgba(255, 255, 255, 0.15)", // semi-transparent
                backdropFilter: "blur(8px)", // glass effect
                WebkitBackdropFilter: "blur(8px)", // Safari support
                border: "1px solid rgba(255, 255, 255, 0.3)", // subtle border
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)", // soft shadow
                borderRadius: "10px",
              }}
            >
              <Form
                style={{
                  width: "100%",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="formBasicFName">
                      <Form.Label className="text-white">First Name</Form.Label>
                      <Form.Control
                        style={{ marginTop: "10px", padding: "7px 12px" }}
                        type="text"
                        placeholder="John"
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="formBasicLName">
                      <Form.Label className="text-white">Last Name</Form.Label>
                      <Form.Control
                        style={{ marginTop: "10px", padding: "7px 12px" }}
                        type="text"
                        placeholder="Doe"
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="text-white">Email Address</Form.Label>
                      <Form.Control
                        style={{ marginTop: "10px", padding: "7px 12px" }}
                        type="email"
                        placeholder="email@domain.com"
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label className="text-white">Password</Form.Label>
                      <Form.Control
                        style={{ marginTop: "10px", padding: "7px 12px" }}
                        type="password"
                        placeholder="********"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <div style={{ width: "100%" }}>
                      <button
                        className="login-btn"
                        style={{
                          borderRadius: 8,
                          backgroundColor: "black",
                          color: "white",
                          width: "100%",
                          height: "40px",
                          outline: "none",
                          border: "1px solid black",
                          transition: "all .3s ease-in-out",
                        }}
                        type="submit"
                      >
                        {loading ? <Spinner variant="light" /> : "Sign up"}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16
                }}
              >
                <div style={{ height: 1, width: "100%", background: "#FFFFFF" }} />
                <p style={{ margin: 0, color: "white" }}>OR</p>
                <div style={{ height: 1, width: "100%", background: "#FFFFFF" }} />
              </div>
              <div>
                <div style={{ width: "100%" }}>
                  <button
                    onClick={handleGoogleLogin}
                    className="login-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 8,
                      backgroundColor: "black",
                      color: "white",
                      width: "100%",
                      height: "40px",
                      outline: "none",
                      border: "1px solid black",
                      transition: "all .3s ease-in-out",
                    }}
                  >
                    <img src={Images.google} style={{ width: 20, height: 20, objectFit: "contain" }} />
                    Continue with Google
                  </button>
                </div>
                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    justifyContent: "center",
                    gap: 4
                  }}
                >
                  <div className="text-white">
                    Already have an account? Click here to
                  </div>
                  <Link
                    to={"/login"}
                    style={{
                      color: "#000000",
                    }}
                  >
                    {" "}
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
