import React, { Fragment, useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import { Images } from "../assets";
import AuthServices from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await AuthServices.login(form);
      if (data === null) return;
      console.log("data=>", data);
      if (data.status === true) {
        navigate("/");
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };

  return (
    <Fragment>
      <Container>
        <Row style={{ transform: "translate(0, 120px)" }} className="loginRow">
          <Col md={"6"}>
            <div className="h-100 d-flex align-items-center justify-content-start my-auto">
              <img
                src={Images.logo}
                alt="Fashion Brand"
                width={"80%"}
                height={"100%"}
                className="mainLogo"
              />
            </div>
          </Col>
          <Col md={"6"}>
            <div className="h-100 d-flex align-items-center justify-content-center my-auto">
              <Form
                style={{
                  padding: "50px",
                  boxShadow: "1px 1px 15px 1px #e1e1e1",
                  width: "100%",
                }}
                onSubmit={(e) => handleLogin(e.preventDefault())}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#747474",
                    marginBlock: "20px",
                  }}
                ></div>
                <div>
                  <p>Forgot Password?</p>
                </div>
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
                    Login
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Login;
