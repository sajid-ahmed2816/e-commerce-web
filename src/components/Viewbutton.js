import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Viewbutton({ onClick }) {
  return (
    <Fragment>
      <button className="view-btn" onClick={onClick}>
        <FontAwesomeIcon icon={faEye} />
      </button>
    </Fragment>
  );
}

export default Viewbutton;
