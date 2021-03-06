import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavReg from "../NavReg/NavReg";
import NavBar from "../../../components/Home/NavBar/NavBar";
import { Link } from "react-router-dom";
import "./Personal.css";

import { toast } from "react-toastify";

const Personal = () => {
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
  const { register, handleSubmit, errors } = useForm();

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
      "https://biyekorun-staging.techserve4u.com/category/language/language-list",
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
  }, [token, countryId, stateId]);

  const onSubmit = async (data) => {
    const ISODate = new Date(data.dateOfBirth).toISOString();
    //console.log(ISODate);
    await fetch(
      `https://biyekorun-staging.techserve4u.com/category/community/community-by-religion/${data.religion_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((returnData) => {
        console.log(
          JSON.stringify({
            profile_name: data.profile_name,
            religion_id: parseInt(data.religion_id),
            community_id: parseInt(returnData.data[0].id),
            diet_id: parseInt(data.diet_id),
            country_id: parseInt(data.country_id),
            city_id: parseInt(data.city_id),
            state_id: parseInt(data.state_id),
            dateOfBirth: ISODate,
            language_id: parseInt(data.language_id),
            maritial_status: data.marital_status,
            height: data.height,
            gender: data.gender,
          })
        );

        fetch(`https://biyekorun-staging.techserve4u.com/user/user-profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            profile_name: data.profile_name,
            religion_id: parseInt(data.religion_id),
            community_id: parseInt(returnData.data[0].id),
            diet_id: parseInt(data.diet_id),
            country_id: parseInt(data.country_id),
            city_id: parseInt(data.city_id),
            state_id: parseInt(data.state_id),
            dateOfBirth: ISODate,
            language_id: parseInt(data.language_id),
            maritial_status: data.marital_status,
            height: data.height,
            gender: data.gender,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            if (json.statusCode === 201) {
              toast.success(json.message);
              window.location.replace("/career");
            } else if (json.statusCode === 409) {
              toast.error(json.message);
            } else if (json.statusCode === 400) {
              setErrorMessages(json.message);
            }
          });

        //             console.log(json);
        //             if (json.statusCode === 201) {
        //               console.log(typeof json.statusCode);
        //               window.location.replace('/career');
        //               alert(json.message);
        //               return;
        //             } else if (json.statusCode === 409) {
        //               window.location.replace('/career');
        //               alert(json.message);
        //               return;
        //             }

        //             alert(json.message);
      });
  };

  return (
    <div className="container">
      <div>
        <NavBar></NavBar>
      </div>
      {messages.length >= 1 &&
        messages.map((message) => (
          <p className="text-danger">{JSON.stringify(message.constraints)}</p>
        ))}
      <div className="row mt-3">
        <div className="col-md-2"></div>
        <div className="col-md-8 form-container">
          <NavReg></NavReg>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Full Name
                </label>
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="profile_name"
                  className="form-control"
                />
                {errors.firstName && (
                  <span className="text-danger">Profile Name is required</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Date of Birth
                </label>
                <input
                  ref={register({ required: true })}
                  type="date"
                  name="dateOfBirth"
                  max="2002-12-31"
                  min="1965-12-31"
                  className="form-control"
                />
                {errors.dateOfBirth && (
                  <span className="text-danger">Date of Birth is required</span>
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
                <label className="brand-text" htmlFor="">
                  State
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="state_id"
                  className="form-control"
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                >
                  <option value="">
                    -- please select country before select the state--
                  </option>
                  {states?.length >= 1 ? (
                    states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
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
                  City
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="city_id"
                  className="form-control"
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                >
                  <option value="">
                    -- please select state before select the city--
                  </option>
                  {cities?.length >= 1 ? (
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))
                  ) : (
                    <option value="null">City Not found in this state</option>
                  )}
                </select>
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
                Marital Status
              </label>
              <select
                ref={register({ required: true })}
                name="marital_status"
                className="form-control"
              >
                {errors.maritalStatus && (
                  <span className="text-danger">
                    Marital Status is required
                  </span>
                )}
                <option value="">-- please select the marital status --</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <div className="form-group">
              <label className="brand-text" htmlFor="">
                Mother tongue
              </label>
              <select
                ref={register({ required: true })}
                name="language_id"
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

            <div className="form-group">
              <label className="brand-text" htmlFor="">
                Diet List
              </label>
              <select
                ref={register({ required: true })}
                name="diet_id"
                className="form-control"
              >
                {errors.religion && (
                  <span className="text-danger">Diet id is required</span>
                )}
                <option value="">-- please select the diet list --</option>
                {diets?.length >= 1 &&
                  diets.map((diet) => (
                    <option key={diet.id} value={diet.id}>
                      {diet.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Height
                </label>
                <input
                  ref={register({ required: true })}
                  type="number"
                  placeholder="Please enter your height in cm format"
                  min="100"
                  max="250"
                  name="height"
                  className="form-control"
                />
                {errors.address && (
                  <span className="text-danger">Height is required</span>
                )}
              </div>
            </div>

            <div className="form-group row"></div>
            <div className="form-group row text-right">
              <div>
                <input className="main-btn" type="submit" value="Continue" />
              </div>
              {/* <div className="my-3 reg-nav-link">
                <Link to="/career" className="main-btn">
                  Go to next
                </Link>
              </div> */}
            </div>
          </form>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default Personal;
