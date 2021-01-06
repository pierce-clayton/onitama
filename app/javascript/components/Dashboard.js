import React, { useState, useEffect } from "react";
import EditPlayer from "./EditPlayer";
import Waiting from "./Waiting";

const Dashboard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const btnText = showEdit ? "Show Profile" : "Edit Profile";
  const handlesCompletion = () => {
    setShowEdit(false);
    props.onUserRefresh();
  };

  const broadcastReady = () => {
    props.join_game(props);
    setReadyToPlay(true);
  };

  useEffect(() => {
    if (props.game.id && readyToPlay) {
      props.history.push("/onitama");
    }
  });

  return (
    <div className="container">
      <div className="columns">
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
          {readyToPlay ? null : (
            <>
              <button className="button" onClick={() => setShowEdit(!showEdit)}>
                {btnText}
              </button>
              <button className="button" onClick={broadcastReady}>
                Ready To Play
              </button>
            </>
          )}
          {readyToPlay ? <Waiting /> : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
