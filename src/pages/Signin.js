import React, { Fragment, useState } from "react";
import { Row, Col, Form, Container, FormGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../api/auth";
import Toastify from "../components/Toastify";

function Signin() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastify = Toastify;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let result = await AuthServices.signin(form);
      if (result === null) return;
      if (result.status === 200) {
        toastify.ToastifyVariants.success(result.data.message);
        navigate("/login");
      }
      console.log("result=>", result);
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Container style={{ height: "100vh" }}>
        <Row className="h-100 d-flex align-items-center justify-content-center">
          <Col md={"8"}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              style={{
                padding: "40px",
                boxShadow: "1px 1px 15px 1px #e1e1e1",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Control
                      style={{ marginTop: "10px" }}
                      type="text"
                      placeholder="First Name"
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Control
                      style={{ marginTop: "10px" }}
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      style={{ marginTop: "10px" }}
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
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      style={{ marginTop: "10px" }}
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="formBasicContact">
                    <Form.Control
                      style={{ marginTop: "10px" }}
                      type="number"
                      placeholder="Contact"
                      onChange={(e) =>
                        setForm({ ...form, contact: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <FormGroup
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "#747474",
                      marginBlock: "20px",
                    }}
                  ></FormGroup>
                </Col>
                <Col md={12}>
                  <div style={{ width: "100%" }}>
                    <button
                      className="login-btn"
                      style={{
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
              <div
                style={{
                  marginTop: "30px",
                }}
              >
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                  }}
                >
                  {" "}
                  Already have an account? Click here to Login
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Signin;
