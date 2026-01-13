import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Fragment, useEffect, useState } from "react";
import Toastify from "../../Toastify";
import AuthServices from "../../../api/auth";
import { Modal } from "react-bootstrap";
import OTPInput from "react-otp-input";

function OTPDialog(props) {
  const { show, onHide, email } = props;
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
  const [expired, setExpired] = useState(false);

  const { userLogin } = useAuth();

  const navigate = useNavigate();

  const toastify = Toastify;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async () => {
    try {
      const obj = { email, otp };
      const result = await AuthServices.verifyOtp(obj);
      console.log("🚀 ~ handleSubmit ~ result:", result)
      if (result.status) {
        toastify.ToastifyVariants.success(result.message);
        onHide();
        userLogin(result?.data);
        navigate("/");
      }
    } catch (error) {
      toastify.ToastifyVariants.success(error);
    };
  };

  const ResendOTP = async () => {
    try {
      const obj = { email };
      const result = await AuthServices.resendOtp(obj);
      if (result.status) {
        toastify.ToastifyVariants.success(result.message);
      }
    } catch (error) {
      toastify.ToastifyVariants.success(error);
    };
  };

  useEffect(() => {
    if (!show) return;
    setTimeLeft(600);
    setExpired(false);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);

  return (
    <Fragment>
      <style>
        {`
        .modal-dialog {
          justify-content: center;
        }
        .modal-content-container {
          width: auto;  
        }
        `}
      </style>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
        contentClassName="modal-content-container"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Verify OTP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-column gap-3"
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{
                width: "100%"
              }}
              inputStyle={{
                width: "40px",
                height: "40px"
              }}
            />
            {!expired ? (
              <div
                style={{
                  alignSelf: "flex-start",
                  color: "#555",
                }}
              >
                OTP expires in: {formatTime(timeLeft)}
              </div>
            ) : (
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  textAlign: "start"
                }}
                onClick={ResendOTP}
              >
                Resend OTP
              </button>
            )}
            <button
              style={{
                alignSelf: "flex-end",
              }}
              className="btn btn-dark"
              onClick={handleSubmit}
              disabled={expired}
            >
              Verify
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default OTPDialog;