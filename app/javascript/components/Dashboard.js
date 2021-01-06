import React, { useState } from "react";
import EditPlayer from "./EditPlayer";

const Dashboard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const btnText = showEdit ? "Show Profile" : "Edit Profile";
  return (
    <div>
      <p className="title is-4">Welcome, {props.user.user_name}</p>
      {showEdit ? <EditPlayer user={props.user.user_name} /> : null}
      <button className="button" onClick={() => setShowEdit(!showEdit)}>
        {btnText}
      </button>
      <button className="button">Ready To Play</button>
    </div>
  );
};

export default Dashboard;
