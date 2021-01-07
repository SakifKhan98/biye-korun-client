import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const BioProfile = () => {
  const [token, setToken] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));
  }, []);

  const onSubmit = (data) => {
    console.log(
      JSON.stringify({
        bio: data.bio,
        phone_number: data.phone_number,
      })
    );
    fetch("https://biyekorun-staging.techserve4u.com/user/update-profile-bio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio: data.bio,
        phone_number: data.phone_number,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.statusCode === 201) {
          toast.success(json.message);
          history.push(`/user/dashboard`);
        } else if (json.statusCode === 403) {
          toast.error(json.message);
        } else if (json.statusCode === 404) {
          toast.error(json.message);
        } else if (json.statusCode === 500) {
          toast.error(json.message);
        } else if (json.statusCode === 400) {
          toast.error(json.error);
        }
      });
  };

  return (
    <div className="custom-form">
      <h3 className="text-center brand-text mb-5">
        Express yourself and jump in
      </h3>
      <div className="row">
        <div className="col-sm-1 col-md-3"></div>
        <div className="col-sm-10 col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  About Yourself
                </label>
                <textarea
                  rows="7"
                  cols="5"
                  required
                  ref={register({ required: true })}
                  type="text"
                  name="bio"
                  className="form-control"
                  placeholder="Express Yourself must be longer than 50 characters"
                ></textarea>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Phone Number
                </label>
                <input
                  required
                  ref={register({ required: true })}
                  type="number"
                  minLength="11"
                  maxLength="14"
                  name="phone_number"
                  className="form-control"
                  placeholder="Ex: +88012345678910 / 012345678910"
                />
              </div>
            </div>
            <div className="form-group row text-right">
              <div className="col-12">
                <input className="btn btn-grad" type="submit" value="Next" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-1 col-md-3"></div>
      </div>
    </div>
  );
};

export default BioProfile;
