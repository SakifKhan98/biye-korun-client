import React, { useEffect, useState } from 'react';
import './PersonalDetailsTable.css';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const PersonalDetailsTable = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [token, setToken] = useState(null);

  const profileData = useSelector((state) => state.getProfileById);

  useEffect(() => {
    setToken(sessionStorage.getItem('Token'));
    fetch(
      'https://biyekorun-staging.techserve4u.com/category/country/country-list',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const country_id =
          profileData?.getProfileById?.user_career[0]?.country_id;
        const countryData = data.data?.find(
          (country) => country.id === country_id
        );
        setCountry(countryData);
      });
  }, [token, countries, profileData]);

  return (
    <div className="shadow px-3 pb-3 mt-3">
      <div className="row d-flex justify-content-between mt-3 pt-3 mx-2 pb-3 table-header-row">
        <h3>Personal Details</h3>
      </div>
      {profileData.loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Name</p>
            <p>{profileData?.getProfileById?.user_profile[0]?.profile_name}</p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Birthday</p>
            <p>
              {profileData?.getProfileById?.user_profile[0]?.dateOfBirth?.slice(
                0,
                10
              )}
            </p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>I am a</p>
            <p>Man</p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Looking For a</p>
            <p>Women</p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Marital Status</p>
            <p>
              {profileData?.getProfileById?.user_profile[0]?.maritial_status}
            </p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Country</p>
            <p>{country?.name}</p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Religion</p>
            <p>
              {profileData?.getProfileById?.user_profile[0]?.religion_id.name}
            </p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row">
            <p>Community</p>
            <p>
              {profileData?.getProfileById?.user_profile[0]?.community_id.name}
            </p>
          </div>
          <div className="row d-flex justify-content-between mt-2 mx-2 table-row mb-2">
            <p>Phone</p>
            <p>{profileData?.getProfileById?.user?.phone_number}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsTable;
