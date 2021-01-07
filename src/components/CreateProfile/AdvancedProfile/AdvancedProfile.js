import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdvancedProfile = () => {
  const [token, setToken] = useState(null);
  const [residencyList, setResidencyList] = useState([]);
  const [residencyId, setResidencyId] = useState(null);
  const [maritalStatusList, setMaritalStatusList] = useState([]);
  const [maritalStatusId, setMaritalStatusId] = useState(null);
  const [dietList, setDietList] = useState([]);
  const [dietId, setDietId] = useState([]);
  const [heightList, setHeightList] = useState([]);
  const [heightId, setHeightId] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const [communityId, setCommunityId] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const profileData = useSelector((state) => state.profile);
  // profileData?.profile?.user?.id

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));

    fetch(
      "https://biyekorun-staging.techserve4u.com/category/residency/residency-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setResidencyList(json.data);
      });
    fetch(
      "https://biyekorun-staging.techserve4u.com/category/maritial/maritial-status-type-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMaritalStatusList(json.data);
      });
    fetch("https://biyekorun-staging.techserve4u.com/category/diet/diet-list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setDietList(json.data);
      });
    fetch(
      "https://biyekorun-staging.techserve4u.com/category/height/height-type-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setHeightList(json.data);
      });
    fetch(
      `https://biyekorun-staging.techserve4u.com/user/user-info-by-id/${profileData?.profile?.user?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        fetch(
          `https://biyekorun-staging.techserve4u.com/category/community/community-by-religion/${json.data?.user_profile[0]?.religion_id?.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            setCommunityList(json.data);
          });
      });
  }, [token, profileData?.profile?.user?.id]);

  const onSubmit = (data) => {
    if (data.living_with_family === "true") {
      data.living_with_family = true;
    } else {
      data.living_with_family = false;
    }

    console.log(
      JSON.stringify({
        city_live_in: data.city_live_in,
        living_with_family: data.living_with_family,
        residency_status_id: parseInt(data.residency_status_id),
        maritial_status_id: parseInt(data.maritial_status_id),
        diet_id: parseInt(data.diet_id),
        height_id: parseInt(data.height_id),
        community_id: parseInt(data.community_id),
      })
    );
    fetch(
      "https://biyekorun-staging.techserve4u.com/user/update-basic-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city_live_in: data.city_live_in,
          living_with_family: data.living_with_family,
          residency_status_id: parseInt(data.residency_status_id),
          maritial_status_id: parseInt(data.maritial_status_id),
          diet_id: parseInt(data.diet_id),
          height_id: parseInt(data.height_id),
          community_id: parseInt(data.community_id),
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.statusCode === 201) {
          toast.success(json.message);
          history.push(`/createProfile/careerProfile`);
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

  //history.push(`/createProfile/careerProfile`);
  return (
    <div className="custom-form">
      <h3 className="text-center brand-text mb-5">
        Lets update your profile now
      </h3>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  City you live in
                </label>
                <input
                  type="text"
                  ref={register({ required: true })}
                  className="form-control"
                  name="city_live_in"
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text mr-2" htmlFor="">
                  Do You live with family?
                </label>
                {/* <input
                  ref={register({ required: true })}
                  type=""
                  name="dateOfBirth"
                  className="form-control"
                /> */}
                <input
                  ref={register({ required: true })}
                  type="radio"
                  id="yes"
                  name="living_with_family"
                  value={true}
                />
                <label className="ml-2 mr-2" for="yes">
                  Yes
                </label>
                <input
                  ref={register({ required: true })}
                  type="radio"
                  id="no"
                  name="living_with_family"
                  value={false}
                />
                <label className="ml-2" for="no">
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Your residency status
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="residency_status_id"
                  className="form-control"
                  value={residencyId}
                  onChange={(e) => setResidencyId(e.target.value)}
                >
                  <option value="">-- please select the residency --</option>
                  {residencyList?.length >= 1 ? (
                    residencyList.map((residency) => (
                      <option key={residency.id} value={residency.id}>
                        {residency.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Your maritial status
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="maritial_status_id"
                  className="form-control"
                  value={maritalStatusId}
                  onChange={(e) => setMaritalStatusId(e.target.value)}
                >
                  <option value="">
                    -- please select the marital status --
                  </option>
                  {maritalStatusList?.length >= 1 ? (
                    maritalStatusList.map((maritalStatus) => (
                      <option key={maritalStatus.id} value={maritalStatus.id}>
                        {maritalStatus.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Your diet
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="diet_id"
                  className="form-control"
                  value={dietId}
                  onChange={(e) => setDietId(e.target.value)}
                >
                  <option value="">-- please select the diet --</option>
                  {dietList?.length >= 1 ? (
                    dietList.map((diet) => (
                      <option key={diet.id} value={diet.id}>
                        {diet.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Your Height
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="height_id"
                  className="form-control"
                  value={heightId}
                  onChange={(e) => setHeightId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {heightList?.length >= 1 ? (
                    heightList.map((height) => (
                      <option key={height.id} value={height.id}>
                        {height.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Your sub-community
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="community_id"
                  className="form-control"
                  value={communityId}
                  onChange={(e) => setCommunityId(e.target.value)}
                >
                  <option value="">-- please select the community --</option>
                  {communityList?.length >= 1 ? (
                    communityList.map((community) => (
                      <option key={community.id} value={community.id}>
                        {community.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>

            <div className="form-group row text-right">
              <div className="col-12">
                <input className="btn btn-grad" type="submit" value="Next" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default AdvancedProfile;
