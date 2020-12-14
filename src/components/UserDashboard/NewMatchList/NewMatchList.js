import React from "react";
import NewMatchListCard from "../NewMatchListCard/NewMatchListCard";
import { Link } from "react-router-dom";

const NewMatchList = ({ newMatchList }) => {
  console.log(newMatchList);
  return (
    <div className="shadow p-3 mt-3">
      <h4 className="text-center my-3">New Match List</h4>
      <NewMatchListCard></NewMatchListCard>
      <NewMatchListCard></NewMatchListCard>
      <NewMatchListCard></NewMatchListCard>
      <NewMatchListCard></NewMatchListCard>
      <Link className="text-center" style={{ color: "#8e8be6" }} to="/">
        <p>
          <small>View All</small>
        </p>
      </Link>
    </div>
  );
};

export default NewMatchList;
