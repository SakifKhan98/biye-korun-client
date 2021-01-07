import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Subscribe.css";
import { Button, Form, FormControl } from "react-bootstrap";

const Subscribe = () => {
  return (
    <div className="subscribe container text-center">
      <FontAwesomeIcon
        className="sub-icon"
        style={{
          borderRadius: "50%",
          borderColor: "#9733ee",
          color: "#9733ee",
          fontSize: "4rem",
        }}
        icon={faEnvelope}
      />
      <p className="brand-text">Sign Up to get daily update</p>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Form.Control
            type="text"
            className="shadow"
            placeholder="Your email address"
            readOnly
            style={{ backgroundColor: "white" }}
          />
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Subscribe;
