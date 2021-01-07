import React from "react";
import {
  faCommentAlt,
  faGlobeEurope,
  faMobileAlt,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Icons.css";

const Icons = () => {
  return (
    <div className="container  icon-container">
      <div className="row">
        <div className="col-md-3 text-center">
          <FontAwesomeIcon
            className="icon"
            style={{
              color: "#cf6ac6",
              fontSize: "6rem",
            }}
            icon={faEnvelope}
          />
          <h1 className="brand-text text-center">350 k</h1>
          <p className="brand-text text-center">Messages per day</p>
        </div>
        <div className="col-md-3 text-center">
          <FontAwesomeIcon
            className="icon-font"
            style={{
              color: "#cf6ac6",
              fontSize: "6rem",
            }}
            icon={faGlobeEurope}
          />
          <h1 className="brand-text text-center">50 M</h1>
          <p className="brand-text text-center">Registered Users Online</p>
        </div>
        <div className="col-md-3 text-center">
          <FontAwesomeIcon
            className="icon-font"
            style={{
              color: "#cf6ac6",
              fontSize: "6rem",
            }}
            icon={faMobileAlt}
          />
          <h1 className="brand-text text-center">60 K</h1>
          <p className="brand-text text-center">Monthly Active User</p>
        </div>
        <div className="col-md-3 text-center">
          <FontAwesomeIcon
            className="icon-font"
            style={{
              color: "#cf6ac6",
              fontSize: "6rem",
            }}
            icon={faParachuteBox}
          />
          <h1 className="brand-text text-center">250 K</h1>
          <p className="brand-text text-center">New Daily Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default Icons;
