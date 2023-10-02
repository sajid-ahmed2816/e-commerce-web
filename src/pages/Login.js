import React, { Fragment } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import { Images } from "../assets";

function Login() {
  return (
    <Fragment>
      <Container>
        <Row style={{ transform: "translate(0, 65px)" }} className="loginRow">
          <Col md={"6"}>
            <div className="h-100 d-flex align-items-center justify-content-center my-auto">
              <img
                src={Images.logo}
                alt="Fashion Brand"
                width={"100%"}
                height={"100%"}
                className="mainLogo"
              />
            </div>
          </Col>
          <Col md={"6"}>
            <div className="h-100 d-flex align-items-center justify-content-center my-auto">
              <Form
                style={{
                  padding: "20px",
                  boxShadow: "1px 1px 15px 1px #e1e1e1",
                }}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#747474",
                    marginBlock: "20px",
                  }}
                ></div>
                <div style={{ width: "100%" }}>
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      width: "100%",
                      height: "40px",
                      outline: "none",
                      border: "1px solid black",
                    }}
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
