import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import InnerNavBar from "../../shared/InnerNavBar/InnerNavBar";
import IdSearchBar from "../../User/IdSearchBar/IdSearchBar";
import ProfileCard from "../../User/ProfileCard/ProfileCard";
import UserNavBar from "../../User/UserNavBar/UserNavBar";
import ActivitySummary from "../ActivitySummary/ActivitySummary";
import ImproveProfile from "../ImproveProfile/ImproveProfile";
import MatchList from "../MatchList/MatchList";
import NewMatchList from "../NewMatchList/NewMatchList";
import NotificationList from "../NotificationList/NotificationList";
import ProfileCompletion from "../ProfileCompletion/ProfileCompletion";
import "./Dashboard.css";

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [activitySummary, setActivitySummary] = useState([]);
  const [newMatchList, setNewMatchList] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState([]);
  const [profileImprove, setProfileImprove] = useState([]);
  const [searchById, setSearchById] = useState([]);

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));
    fetch("https://biyekorun-staging.techserve4u.com/user/activity-summery", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // .then((data) => setActivitySummary(data.data));
      .then((data) => console.log(data));

    fetch("https://biyekorun-staging.techserve4u.com/user/new-match-list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNewMatchList(data.data));

    fetch(
      "https://biyekorun-staging.techserve4u.com/user/profile-completion-status",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setProfileCompletion(data.data));

    fetch(
      "https://biyekorun-staging.techserve4u.com​/user​/profile-improve-suggestion",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setProfileImprove(data.data));

    fetch(
      "https://biyekorun-staging.techserve4u.com/user/search-profile-by-uid",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setSearchById(data.data));
  }, [token]);

  return (
    <div style={{ paddingLeft: 80, paddingRight: 80 }}>
      <InnerNavBar></InnerNavBar>
      <div className="row mt-5">
        <div className="col">
          <ProfileCard style={{ width: "16rem" }}></ProfileCard>
          <ProfileCompletion
            profileCompletion={profileCompletion}
          ></ProfileCompletion>
        </div>
        <div className="col-md-6">
          <UserNavBar style={{ fontSize: 20 }}></UserNavBar>
          <ActivitySummary activitySummary={activitySummary}></ActivitySummary>
          <MatchList></MatchList>
        </div>
        <div className="col">
          <IdSearchBar searchById={searchById}></IdSearchBar>
          <NotificationList></NotificationList>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <NewMatchList newMatchList={newMatchList}></NewMatchList>
        </div>
        <div className="col-md-8">
          <ImproveProfile profileImprove={profileImprove}></ImproveProfile>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
