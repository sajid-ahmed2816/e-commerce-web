import React, { Fragment, useState } from "react";
import { Row, Col, Form, Container, FormGroup } from "react-bootstrap";
import { Images } from "../assets";
import AuthServices from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <Row style={{ transform: "translate(0, 80px)" }} className="loginRow">
          <Col md={"7"}>
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
          <Col md={"5"}>
            <div className="h-100 d-flex align-items-center justify-content-center my-auto">
              <Form
                style={{
                  padding: "40px",
                  boxShadow: "1px 1px 15px 1px #e1e1e1",
                  width: "100%",
                  borderRadius: "10px",
                }}
                onSubmit={(e) => handleLogin(e.preventDefault())}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    style={{ marginTop: "10px" }}
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Form.Group>
                <FormGroup
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#747474",
                    marginBlock: "30px",
                  }}
                ></FormGroup>
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
                <div
                  style={{
                    marginTop: "30px",
                  }}
                >
                  <Link
                    to={"/signin"}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    Don't have an account? Click here to Sign up
                  </Link>
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
