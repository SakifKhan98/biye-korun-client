import React from "react";
import { useParams } from "react-router-dom";
import AdvancedProfile from "./AdvancedProfile/AdvancedProfile";
import BasicProfile from "./BasicProfile/BasicProfile";
import BioProfile from "./BioProfile/BioProfile";
import CareerProfile from "./CareerProfile/CareerProfile";
import StepIndicator from "./StepIndicator/StepIndicator";
import "./CreateProfile.css";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import StepperMUI from "./StepperMUI/StepperMUI";

const CreateProfile = () => {
  const { formId } = useParams();

  return (
    <>
      <ProfileNavbar></ProfileNavbar>
      <div className=" createProfileContainer">
        <div className="row">
          <div className="col-sm-1 col-md-2 col-lg-3"></div>
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div
              className="shadow inner-form-container py-5"
              style={{
                backgroundColor: "white",
                marginTop: 100,
                marginBottom: 100,
                // marginLeft: 350,
                // marginRight: 350,
                borderRadius: 10,
              }}
            >
              <StepperMUI></StepperMUI>

              {/* <StepIndicator></StepIndicator> */}
              {formId === "basicProfile" ? (
                <BasicProfile></BasicProfile>
              ) : formId === "advancedProfile" ? (
                <AdvancedProfile></AdvancedProfile>
              ) : formId === "careerProfile" ? (
                <CareerProfile></CareerProfile>
              ) : formId === "bioProfile" ? (
                <BioProfile></BioProfile>
              ) : null}
            </div>
          </div>
          <div className="col-sm-10 col-md-2 col-lg-6"></div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
