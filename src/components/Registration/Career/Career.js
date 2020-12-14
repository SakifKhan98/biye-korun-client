import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import NavBar from "../../Home/NavBar/NavBar";
import NavReg from "../NavReg/NavReg";
import { Link } from "react-router-dom";

// import { fetchCountries } from '../../../redux/actions/fetchCountriesActions';
// import { connect } from 'react-redux';

const Career = ({ fetchCountries, addUserDetail }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [token, setToken] = useState(null);
  const [countries, setCountries] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [occupationType, setOccupationType] = useState([]);
  const [selectOccupation, setSelectOccupation] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  const [messages, setErrorMessages] = useState([]);

  const history = useHistory();

  // useEffect(() => {
  //     fetchCountries();
  // }, []);

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

    // https://biyekorun-staging.techserve4u.com/category/occupation/occupation-list

    fetch(
      "https://biyekorun-staging.techserve4u.com/category/occupation/occupation-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setOccupations(json.data);
      });

    fetch(
      `https://biyekorun-staging.techserve4u.com/category/occupation-type/occupation-types-by-occupation/${selectOccupation}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setOccupationType(data.data));

    fetch(
      "https://biyekorun-staging.techserve4u.com/category/currency/currency-list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setCurrencies(json.data);
      });
  }, [token, selectOccupation]);

  const onSubmit = (data) => {
    console.log(
      JSON.stringify({
        country_id: parseInt(data.country_id),
        occupation_id: parseInt(data.occupation_id),
        occupation_type_id: parseInt(data.occupation_type_id),
        currency_id: parseInt(data.currency_id),
        highest_degree: data.highest_degree,
        working_company: data.working_company,
        yearly_income: data.yearly_income,
        professional_area: data.professional_area,
        bio: data.bio,
      })
    );

    fetch(`https://biyekorun-staging.techserve4u.com/user/user-career`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        country_id: parseInt(data.country_id),
        occupation_id: parseInt(data.occupation_id),
        occupation_type_id: parseInt(data.occupation_type_id),
        currency_id: parseInt(data.currency_id),
        highest_degree: data.highest_degree,
        working_company: data.working_company,
        yearly_income: data.yearly_income,
        professional_area: data.professional_area,
        bio: data.bio,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.statusCode === 201) {
          alert(json.message);
        } else if (json.statusCode === 409) {
          alert(json.message);
        } else if (json.statusCode === 400) {
          setErrorMessages(json.message);
        }

        console.log(json);
        if (json.statusCode === 201) {
          console.log(typeof json.statusCode);
          window.location.replace("/lifestyle");
          alert(json.message);
          return;
        } else if (json.statusCode === 409) {
          window.location.replace("/lifestyle");
          alert(json.message);
          return;
        }

        alert(json.message);
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
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 form-container">
          <NavReg></NavReg>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    Occupation
                  </label>
                  <select
                    required
                    ref={register({ required: true })}
                    name="occupation_id"
                    className="form-control"
                    onChange={(e) => setSelectOccupation(e.target.value)}
                  >
                    <option value="">-- please select the occupation --</option>
                    {occupations?.length >= 1 ? (
                      occupations.map((occupation) => (
                        <option key={occupation.id} value={occupation.id}>
                          {occupation.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Please reload the page again</option>
                    )}
                  </select>
                </div>
              </div>

              {/* <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Occupation Type
                  </label>
                  <select
                    required
                    ref={register({ required: true })}
                    name="occupation_type_id"
                    className="form-control"
                  >
                    <option value="">-- select occupation first --</option>
                    {occupationType?.length >= 1 ? (
                      occupationType.map((occuType) => (
                        <option key={occuType?.id} value={occuType?.id}>
                          {occuType?.name}
                        </option>
                      ))
                    ) : (
                      <option value="">
                        Please select the "valid" occupation first
                      </option>
                    )}
                  </select>
                </div>
              </div> */}

              <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Occupation Type
                  </label>
                  <select
                    required
                    ref={register({ required: true })}
                    name="occupation_type_id"
                    className="form-control"
                  >
                    <option value="">-- select occupation first --</option>
                    {occupationType?.length >= 1 ? (
                      occupationType.map((occuType) => (
                        <option key={occuType?.id} value={occuType?.id}>
                          {occuType?.name}
                        </option>
                      ))
                    ) : (
                      <option value="">
                        Please select the "valid" occupation first
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Currency
                  </label>
                  <select
                    required
                    ref={register({ required: true })}
                    name="currency_id"
                    className="form-control"
                  >
                    <option value="">-- please select the currency --</option>
                    {currencies?.length >= 1 ? (
                      currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Please reload the page again</option>
                    )}
                  </select>
                </div>
              </div>

              {/* <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">

                    Currency
                  </label>
                  <select
                    required
                    ref={register({ required: true })}
                    name="currency_id"
                    className="form-control"
                  >
                    <option value="">-- please select the currency --</option>
                    {currencies?.length >= 1 ? (
                      currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Please reload the page again</option>
                    )}
                  </select>
                </div>
              </div> */}

              <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Highest Degrees
                  </label>
                  <input
                    required
                    ref={register({ required: true })}
                    type="text"
                    name="highest_degree"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Employed In
                  </label>
                  <input
                    required
                    ref={register({ required: true })}
                    type="text"
                    name="working_company"
                    className="form-control"
                  />
                </div>
              </div>

              {/* <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Professional Area
                  </label>
                  <input
                    required
                    ref={register({ required: true })}
                    type="text"
                    name="professional_area"
                    className="form-control"
                    placeholder="Ex: Software Developer"
                  />


                </div>
              </div> */}

              <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Professional Area
                  </label>
                  <input
                    required
                    ref={register({ required: true })}
                    type="text"
                    name="professional_area"
                    className="form-control"
                    placeholder="Ex: Software Developer"
                  />
                </div>
              </div>

              <div className="form-group">
                <div>
                  <label className="brand-text" htmlFor="">
                    Annual Income
                  </label>
                  <input
                    required
                    ref={register({ required: true })}
                    type="number"
                    name="yearly_income"
                    className="form-control"
                  />
                </div>
              </div>
              <br />
              <br />
              <hr />
              <br />
              <br />
              <div>
                <h5 className="brand-text" style={{ marginLeft: 15 }}>
                  Here is your Chance to make your profile standout
                </h5>
                <br />
              </div>
              <div className="text-left" style={{ marginLeft: 325 }}>
                <p>Need Help Writing?</p>
              </div>
              <div className="form-group">
                <div>
                  <input
                    required
                    ref={register({ required: true })}
                    type="text"
                    name="bio"
                    className="form-control"
                    placeholder="Express Yourself must be longer than 50 characters"
                    style={{
                      width: 500,
                      paddingBottom: 200,
                      paddingTop: 10,
                      marginBottom: 30,
                      boxShadow: 40,
                      borderRadius: 5,
                    }}
                  />
                </div>
              </div>
              <div className="form-group row text-right">
                <div className="my-3">
                  <Link to="/personal" className="main-btn">
                    Go to pervious
                  </Link>
                </div>
                <div>
                  <input className="main-btn" type="submit" value="Continue" />
                </div>
                <div className="my-3">
                  <Link to="/lifestyle" className="main-btn">
                    Go to next
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Career;
