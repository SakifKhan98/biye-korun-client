import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const BasicProfile = () => {
  const [languages, setLanguages] = useState([]);
  const [religions, setReligions] = useState([]);
  const [diets, setDiets] = useState([]);
  const [token, setToken] = useState(null);
  const [messages, setErrorMessages] = useState([]);
  const [countryId, setCountryId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [profileTypes, setProfileTypes] = useState([]);
  const [profileTypeId, setProfileTypeId] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));

    fetch(
      "https://biyekorun-staging.techserve4u.com/category/country/country-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCountries(data.data));
    fetch(
      "https://biyekorun-staging.techserve4u.com/category/language/language-community-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setLanguages(data.data));

    fetch(
      "https://biyekorun-staging.techserve4u.com/category/religion/religion-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setReligions(data.data));

    fetch("https://biyekorun-staging.techserve4u.com/category/diet/diet-list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDiets(data.data));

    fetch(
      `https://biyekorun-staging.techserve4u.com/category/state/state-by-country/${parseInt(
        countryId
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((state) => {
        setStates(state.data);
      });

    fetch(
      `https://biyekorun-staging.techserve4u.com/category/city/city-by-state/${stateId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((city) => {
        setCities(city.data);
      });

    fetch(
      "https://biyekorun-staging.techserve4u.com/category/profile/profile-type-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setProfileTypes(data.data));
  }, [token, countryId, stateId]);

  const onSubmit = async (data) => {
    const ISODate = new Date(data.dateOfBirth).toISOString();
    console.log(data);
    // await fetch(
    //   `https://biyekorun-staging.techserve4u.com/category/community/community-by-religion/${data.religion_id}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((returnData) => {
    console.log(
      JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        religion_id: parseInt(data.religion_id),
        language_community_id: parseInt(data.language_community_id),
        country_id: parseInt(data.country_id),
        dateOfBirth: ISODate,
        profile_type_id: parseInt(data.profile_type_id),
        gender: data.gender,
      })
    );

    fetch(
      `https://biyekorun-staging.techserve4u.com/user/create-basic-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          religion_id: parseInt(data.religion_id),
          language_community_id: parseInt(data.language_community_id),
          country_id: parseInt(data.country_id),
          dateOfBirth: ISODate,
          profile_type_id: parseInt(data.profile_type_id),
          gender: data.gender,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.statusCode === 201) {
          toast.success(json.message);
          history.push(`/createProfile/advancedProfile`);
        } else if (json.statusCode === 409) {
          toast.error(json.message);
        } else if (json.statusCode === 400) {
          setErrorMessages(json.message);
        } else if (json.statusCode === 422) {
          toast.error(json.message);
        }
      });

    // console.log(json);
    // if (json.statusCode === 201) {
    //   console.log(typeof json.statusCode);
    //   window.location.replace('/career');
    //   alert(json.message);
    //   return;
    // } else if (json.statusCode === 409) {
    //   window.location.replace('/career');
    //   alert(json.message);
    //   return;
    // }

    // alert(json.message);
    // });
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   history.push(`/createProfile/advancedProfile`);
  // };

  return (
    <div className="custom-form">
      <h3 className="text-center brand-text mb-5">
        Lets create your profile now
      </h3>
      <div className="row">
        <div className="col-sm-1 col-md-3"></div>
        <div className="col-sm-10 col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {messages.length >= 1 &&
              messages.map((message) => (
                <p className="text-danger">
                  {JSON.stringify(message.constraints)}
                </p>
              ))}
            <div className="form-group row">
              <div className="col-md-6 brand-text">
                <label htmlFor="">First Name</label>
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="first_name"
                  className="form-control"
                />
                {errors.firstName && (
                  <span className="text-danger">First Name is required</span>
                )}
              </div>
              <div className="col-md-6 brand-text">
                <label htmlFor="">Last Name</label>
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="last_name"
                  className="form-control"
                />
                {errors.lastName && (
                  <span className="text-danger">Last Name is required</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text mr-2" htmlFor="">
                  Gender
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
                  id="male"
                  name="gender"
                  value="male"
                />
                <label className="ml-2 mr-2" for="male">
                  Male
                </label>
                <input
                  ref={register({ required: true })}
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                />
                <label className="ml-2" for="female">
                  Female
                </label>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Create Profile for
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="profile_type_id"
                  className="form-control"
                  value={profileTypeId}
                  onChange={(e) => setProfileTypeId(e.target.value)}
                >
                  <option value="">-- Select Profile for --</option>
                  {profileTypes?.length >= 1 ? (
                    profileTypes.map((profileType) => (
                      <option key={profileType.id} value={profileType.id}>
                        {profileType.name}
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
                  Country/Region
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="country_id"
                  className="form-control"
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {countries?.length >= 1 ? (
                    countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
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
                <label htmlFor="">Date of Birth</label>
                <input
                  ref={register({ required: true })}
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                />
                {errors.dateOfBirth && (
                  <span className="text-danger">Date of Birth is required</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="brand-text" htmlFor="">
                Religion
              </label>
              <select
                ref={register({ required: true })}
                name="religion_id"
                className="form-control"
              >
                {errors.religion && (
                  <span className="text-danger">Religion is required</span>
                )}
                <option value="">-- please select the religion --</option>
                {religions?.length >= 1 ? (
                  religions.map((religion) => (
                    <option key={religion.id} value={religion.id}>
                      {religion.name}
                    </option>
                  ))
                ) : (
                  <option value="">Please reload the page again</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label className="brand-text" htmlFor="">
                Language Community
              </label>
              <select
                ref={register({ required: true })}
                name="language_community_id"
                className="form-control"
              >
                {errors.religion && (
                  <span className="text-danger">Mother tongue is required</span>
                )}
                <option value="">-- please select the language --</option>
                {languages?.length >= 1 &&
                  languages.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* <div className="form-group">
          <div>
            <label className="brand-text" htmlFor="">
              Where do you live?
            </label>
            <select
              required
              ref={register({ required: true })}
              name="country_id"
              className="form-control"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
            >
              <option value="">-- please select the country --</option>
              {countries?.length >= 1 ? (
                countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))
              ) : (
                <option value="">Please reload the page again</option>
              )}
            </select>
          </div>
        </div> */}

            <div className="form-group row justify-content-center ">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <input
                  className="btn btn-grad ml-auto"
                  type="submit"
                  value="Next"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-1 col-md-3"></div>
      </div>
    </div>
  );
};

export default BasicProfile;
