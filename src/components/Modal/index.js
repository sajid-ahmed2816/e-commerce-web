import React from "react";
import { Modal } from "react-bootstrap";

function MyModal(props) {
  const { show, onHide, data } = props;
  if (!data) {
    return null;
  }
  console.log("data", data.title);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={data.image} width="200px" />
        </div>
        <p style={{ fontSize: "13px" }}>{data.description}</p>
        <p style={{ fontWeight: "700" }}>Price: ${data.price}</p>
      </Modal.Body>
    </Modal>
  );
}

export default MyModal;
