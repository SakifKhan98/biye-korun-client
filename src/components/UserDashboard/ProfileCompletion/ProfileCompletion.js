import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const ProfileCompletion = ({ profileCompletion }) => {
  console.log(profileCompletion);
  return (
    <div className="shadow text-center mt-5 p-4">
      <h5 className="mb-5">Profile Completion</h5>

      <ProgressBar
        margin="20px"
        height="50px"
        width="80%"
        borderRadius="3px"
        bgcolor="#8e8be6"
        completed={50}
        border="#8e8be6"
      />
      <p style={{ fontSize: 25 }}>50%</p>
      <p>
        <small>Last Edited: 21st September, 2020</small> <br />
        <small>Profile Views: 430</small>
      </p>
      <div className="row d-flex justify-content-between mt-2 mx-2 ">
        <p>Add Family Details:</p>
        <p>+20%</p>
      </div>
      <div className="row d-flex justify-content-between  mx-2 ">
        <p>Add Partner Details:</p>
        <p>+20%</p>
      </div>
      <div className="row d-flex justify-content-between  mx-2 ">
        <p>Upload Photos:</p>
        <p>+10%</p>
      </div>
    </div>
  );
};

export default ProfileCompletion;
