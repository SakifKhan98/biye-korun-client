import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import "./CopyRight.css";

const CopyRight = () => {
  return (
    <div
      style={{ marginTop: 30, marginBottom: 30 }}
      className="copy row brand-text d-flex justify-content-between"
    >
      <div>
        Copyright &copy; 2020. All Rights Reserved By{" "}
        <Link to="/home">BiyeKorun</Link>
      </div>
      <div>
        <FontAwesomeIcon
          style={{ color: "#8e8be6", marginRight: 12 }}
          icon={faFacebook}
        />
        <FontAwesomeIcon
          style={{ color: "#8e8be6", marginRight: 12 }}
          icon={faTwitterSquare}
        />
        <FontAwesomeIcon
          style={{ color: "#8e8be6", marginRight: 12 }}
          icon={faInstagramSquare}
        />
      </div>
    </div>
  );
};

export default CopyRight;
