import React from "react";
import { Link, useParams } from "react-router-dom";
import "./StepIndicator.scss";

const StepIndicator = () => {
  const { formId } = useParams();

  return (
    <div className="container row">
      <div className="col-sm-1 col-md-2 col-lg-3"></div>
      <div className="col-sm-10 col-md-8 col-lg-6">
        <div className="stepIndicator">
          <div className="stepIndicator-container d-flex justify-content-between align-items-center">
            <div
              className="circle"
              style={{
                backgroundColor: `${
                  formId === "basicProfile"
                    ? //   ||
                      //   formId === "advancedProfile" ||
                      //   formId === "careerProfile" ||
                      //   formId === "bioProfile"
                      "#8e8be6"
                    : "rgb(209, 209, 209)"
                }`,
              }}
            >
              <Link to="/createProfile/basicProfile">
                <p>1</p>
              </Link>
            </div>

            <div
              className="circle"
              style={{
                backgroundColor: `${
                  formId === "advancedProfile"
                    ? //   ||
                      //   formId === "careerProfile" ||
                      //   formId === "bioProfile"
                      "#8e8be6"
                    : "rgb(209, 209, 209)"
                }`,
              }}
            >
              <Link to="/createProfile/advancedProfile">
                <p>2</p>
              </Link>
            </div>
            <div
              className="circle"
              style={{
                backgroundColor: `${
                  formId === "careerProfile"
                    ? //   || formId === "bioProfile"
                      "#8e8be6"
                    : "rgb(209, 209, 209)"
                }`,
              }}
            >
              <Link to="/createProfile/careerProfile">
                <p>3</p>
              </Link>
            </div>
            <div
              className="circle"
              style={{
                backgroundColor: `${
                  formId === "bioProfile" ? "#8e8be6" : "rgb(209, 209, 209)"
                }`,
              }}
            >
              <Link to="/createProfile/bioProfile">
                <p>4</p>
              </Link>
            </div>
          </div>
          <div className="line"></div>
        </div>
      </div>
      <div className="col-sm-1 col-md-2 col-lg-3"></div>
    </div>
  );
};

export default StepIndicator;
