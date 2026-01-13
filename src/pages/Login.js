import React, { Fragment, useState } from "react";
import { Row, Col, Form, Container, FormGroup } from "react-bootstrap";
import { Images } from "../assets";
import AuthServices from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../config/firebase";
import useAuth from "../hooks/useAuth";
import Toastify from "../components/Toastify";
import OTPDialog from "../components/Modal/OTPDialog";

function Login() {
  const [form, setForm] = useState({});
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  const [email, setEmail] = useState(false);
  const handleOTPDialog = () => {
    setIsOTPDialogOpen((prevOpen) => !prevOpen);
  };
  const navigate = useNavigate();
  const { userLogin } = useAuth();

  const handleLogin = async () => {
    try {
      const { data, message } = await AuthServices.login(form);
      console.log("🚀 ~ handleLogin ~ data:", data)
      if (data === null) return;
      if (data) {
        Toastify.ToastifyVariants.success(message);
        if (!data?.user?.isVerified) {
          setEmail(data?.user?.email);
          handleOTPDialog();
        } else {
          userLogin({ ...data, ...data?.user });
          navigate("/");
        }
      }
    } catch (error) {
      Toastify.ToastifyVariants.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const response = await AuthServices.google({ token: token });
      if (response.data.status) {
        const obj = {
          token: response.data.data.token,
          name: response.data.data.user.name,
          picture: response.data.data.user.picture,
          email: response.data.data.user.email
        }
        userLogin(obj);
        Toastify.ToastifyVariants.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      Toastify.ToastifyVariants.error(error);
    }
  };

  return (
    <Fragment>
      <OTPDialog
        show={isOTPDialogOpen}
        onHide={handleOTPDialog}
        email={email}
      />
      <div
        style={{
          background: `url(${Images.bgSignup})`,
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center bottom"
        }}
      >
        <Container style={{ height: "100%" }}>
          <Row className="h-100 align-items-center justify-content-center">
            <Col md={"5"}>
              <div
                className="d-flex flex-column align-items-stretch justify-content-center my-auto gap-4"
                style={{
                  padding: 24,
                  background: "rgb(255 226 226 / 30%)", // semi-transparent
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
                    handleLogin();
                  }}
                >
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
                      Login
                    </button>
                  </div>
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
                      Don't have an account? Click here to
                    </div>
                    <Link
                      to={"/signup"}
                      style={{
                        color: "#000000",
                      }}
                    >
                      {" "}
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

export default Login;
