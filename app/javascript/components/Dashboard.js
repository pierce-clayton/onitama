import React, { useState } from "react";
import EditPlayer from "./EditPlayer";
import Waiting from "./Waiting";

const Dashboard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  // const [readyToPlay, setReadyToPlay] = useState(false);

  const btnText = showEdit ? "Show Profile" : "Edit Profile";
  const handlesCompletion = () => {
    setShowEdit(false);
    props.onUserRefresh();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm" style={{ width: 500 }}>
          <p className="title is-4">Welcome, {props.user.user_name}</p>

          {showEdit ? (
            <EditPlayer
              onComplete={handlesCompletion}
              user={props.user}
              history={props.history}
            />
          ) : null}
        </div>
        <button className="button" onClick={() => setShowEdit(!showEdit)}>
          {btnText}
        </button>
        rail
        <button className="button">
          {/* onClick={() => setReadyToPlay(true)} */}
          Ready To Play
        </button>
        {/* {readyToPlay ? <Waiting /> : null} */}
      </div>
    </div>
  );
};

export default Dashboard;
