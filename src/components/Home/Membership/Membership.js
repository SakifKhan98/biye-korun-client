import React from "react";
import "./Membership.css";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Membership = () => {
  return (
    <div className="container">
      <h1 className="text-center brand-text ">
        Membership <font color="#cf6ac6">Plans</font>
      </h1>
      <p className="text-center" style={{ color: "#cf6ac6" }}>
        Benefit from Biye Korun at its
      </p>
      <p className="text-center" style={{ color: "#cf6ac6" }}>
        maximus you!
      </p>
      <table>
        <tr>
          <th style={{ backgroundColor: "#cf6ac6" }}></th>
          <th
            style={{ backgroundColor: "#cf6ac6", color: "white" }}
            className="text-center"
          >
            Pro
          </th>
          <th
            style={{ backgroundColor: "#9733ee", color: "white" }}
            className="text-center"
          >
            Free
          </th>
        </tr>
        <tr>
          <td className="brand-text">Browse Profiles</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
        </tr>
        <tr>
          <td className="brand-text">Shortlist and Send Request</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
        </tr>
        <tr>
          <td className="brand-text">Message and Chat with unlimited users</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "red", fontSize: "1rem" }}
              icon={faTimes}
            />
          </td>
        </tr>
        <tr>
          <td className="brand-text">View Contacts of members you like</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "red", fontSize: "1rem" }}
              icon={faTimes}
            />
          </td>
        </tr>
        <tr>
          <td className="brand-text">Priority Customer Support</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "red", fontSize: "1rem" }}
              icon={faTimes}
            />
          </td>
        </tr>
        <tr>
          <td className="brand-text">Make yor contact visible to others</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "red", fontSize: "1rem" }}
              icon={faTimes}
            />
          </td>
        </tr>
        <tr>
          <td className="brand-text">Profile Boost</td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "green", fontSize: "1rem" }}
              icon={faCheckCircle}
            />
          </td>
          <td className="text-center">
            <FontAwesomeIcon
              className=""
              style={{ color: "red", fontSize: "1rem" }}
              icon={faTimes}
            />
          </td>
        </tr>
      </table>
      <button
        className="btn premium-btn shadow-lg pricing"
        style={{ fontSize: "2rem" }}
      >
        SEE PRICING LIST
      </button>
    </div>
  );
};

export default Membership;
