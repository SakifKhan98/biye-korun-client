import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import googleIcon from '../../../images/google.png';
import fb from '../../../images/fb.png';
import apple from '../../../images/apple.png';
import { GoogleLogin } from 'react-google-login';
import jwt_decode from 'jwt-decode';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientId =
  '39435938639-2kvqil8o2l3sj1esmdldqrm9mrsnublm.apps.googleusercontent.com';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  borderRadius: '100px',
};

Modal.setAppElement('#root');

const Login = ({ modalIsOpen, closeModal }) => {
  const [accessToken, setAccessToken] = useContext(UserContext);
  const history = useHistory();

  const onSuccess = async (res) => {
    const familyName = res.profileObj.familyName;
    const givenName = res.profileObj.givenName.concat(' ');
    const name = givenName.concat(familyName);
    const email = res.profileObj.email;

    const keys = Object.keys(res.profileObj);
    const platformId = keys[0];
    const platform = platformId.slice(0, 6);

    console.log(name, email, platform);

    const userDetails = {
      platfrom: platform,
      name: name,
      email: email,
    };

    await fetch('https://biyekorun-staging.techserve4u.com/auth/social-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data) {
        //   alert('New User Added Successfully');
        // }
        //console.log(data);
        //console.log('Token', data.access_token);
        fetch(
          'https://biyekorun-staging.techserve4u.com/auth/autorization/token',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            sessionStorage.setItem('Token', data.token);
            setAccessToken(data.token);

            var decoded = jwt_decode(data.token);
            console.log(decoded.user);
            const { registration_completion_status } = decoded.user;
            console.log(registration_completion_status);

            if (registration_completion_status === false) {
              fetch(
                'https://biyekorun-staging.techserve4u.com/user/profile-completion-status',
                {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${data.token}`,
                  },
                }
              )
                .then((res) => res.json())
                .then((json) => {
                  console.log(json.profileCompletionStatus);

                  if (json.statusCode === 404) {
                    window.location.replace(`/createProfile/basicProfile`);
                  } else if (
                    json.profileCompletionStatus
                      .register_form_two_completion_status === false
                  ) {
                    window.location.replace(`/createProfile/advancedProfile`);
                  } else if (
                    json.profileCompletionStatus
                      .register_form_three_completion_status === false
                  ) {
                    window.location.replace(`/createProfile/careerProfile`);
                  } else if (
                    json.profileCompletionStatus
                      .register_form_four_completion_status === false
                  ) {
                    window.location.replace(`/createProfile/bioProfile`);
                  }

                  /* 
                    createProfile/basicProfile
                    createProfile/careerProfile
                    createProfile/advancedProfile
                    createProfile/bioProfile
                    */
                });
            } else {
              return window.location.replace('/user/dashboard');
            }
          });
      });

    closeModal();
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // toast.error("Login failed", res);
    toast.error(`Failed to login. 😢`);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="row d-flex  mr-2 justify-content-end">
          <button className="btn btn-primary closing-btn " onClick={closeModal}>
            X
          </button>
        </div>
        <h2 className="text-center brand-text mb-3">BiyeKorun</h2>
        <p className="text-center brand-text mb-3">
          Log in to Your Biye Korun Account
        </p>

        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <button
              className="social-link"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <div className="row social-row mb-3 shadow d-flex justify-content-center align-items-center">
                <div className="flex-left mr-3 ">
                  <img
                    className="social-icon"
                    src={googleIcon}
                    alt="google"
                  ></img>
                </div>
                <div>Continue with Google</div>
              </div>
            </button>
          )}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          accessType="offline"
          scope="false"
        />

        {/* <button onClick={signIn} className="social-link">
          <div className="row social-row mb-3 shadow d-flex justify-content-center align-items-center">
            <div className="flex-left mr-3 ">
              <img className="social-icon" src={google} alt="google"></img>
            </div>
            <div>Continue with Google</div>
          </div>
        </button> */}
        <Link className="social-link" to="/">
          <div className="row social-row mb-3 shadow d-flex justify-content-center align-items-center">
            <div className="flex-left mr-3">
              <img className="social-icon" src={apple} alt="apple"></img>
            </div>
            <div className="">Continue with Apple</div>
          </div>
        </Link>
        <Link className="social-link" to="/">
          <div className="row social-row mb-3 shadow d-flex justify-content-center align-items-center">
            <div className="flex-left mr-3">
              <img className="social-icon" src={fb} alt="fb"></img>
            </div>
            <div className="">Continue with Facebook</div>
          </div>
        </Link>
      </Modal>
    </div>
  );
};

export default Login;
