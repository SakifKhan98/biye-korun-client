import React from "react";
import Steps from "../Steps/Steps";
import "./StepSection.css";

const StepSection = () => {
  return (
    <div className="row steps">
      <div className="col-md-1"></div>
      <div className="col-md-5 ">
        <h1
          className="text-center "
          style={{
            textAlign: "center",
            fontWeight: 700,
            color: "#d47edf",
            paddingLeft: 30,
            fontSize: 45,
          }}
        >
          Only 3 steps
        </h1>
        <h4
          className="text-center "
          style={{
            textAlign: "center",
            fontWeight: 700,
            color: "#d47edf",
            paddingLeft: 30,
            fontSize: 25,
          }}
        >
          to find your soulmates
        </h4>
      </div>
      <div className="col-md-6 image">
        <Steps></Steps>
      </div>
    </div>
  );
};

export default StepSection;
