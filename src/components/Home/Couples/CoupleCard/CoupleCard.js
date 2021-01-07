import React from "react";
import { Card } from "react-bootstrap";
import wedding from "../../../../images/cutecouple.jpg";
import "./CoupleCard.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CoupleCard = () => {
  return (
    <div className="p-4">
      <Card className="p-4 couple-card">
        <Card.Img
          className="img-fluid wed-img p-4"
          variant="top"
          src={wedding}
        />
        <Card.Body>
          <Card.Title style={{ color: "#8e8be6" }} className="text-center">
            <FontAwesomeIcon
              className="mr-2"
              style={{ color: "#8e8be6", fontSize: "1rem" }}
              icon={faHeart}
            />
            Showrov & Zuairia
          </Card.Title>
          <Card.Text>
            <h6 className="text-center">Married Since</h6>
            <h6 className="text-center">19 September 2020</h6>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CoupleCard;
