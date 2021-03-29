import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPlayer from "./EditPlayer";
import Waiting from "./Waiting";

const Dashboard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [stats, setStats] = useState({});

  const btnText = showEdit ? "Show Profile" : "Edit Profile";
  const handlesCompletion = () => {
    setShowEdit(false);
    props.onUserRefresh();
  };

  const broadcastReady = () => {
    props.join_game(props);
    setReadyToPlay(true);
  };

  // get users stats from the back end
  const getStats = () => {
    if (stats.red_games !== undefined) return;
    const { user } = props;
    axios
      .get(`http://localhost:3000/users/${user.id}/stats`)
      .then((response) => {
        debugger;
        console.log(response);
        setStats(response.data);
      })
      .catch((error) => {
        error;
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.game.id && readyToPlay) {
      props.history.push("/onitama");
    }
    if (props.user?.id && !stats.blue_games) getStats();
  });

  return (
    <div className="container">
      <div className="columns">
        <div className="row">
          <div className="col-sm" style={{ width: 500 }}>
            <p className="welcome title is-4">
              Welcome, {props.user.user_name}
            </p>
            <div className="box">
              <div className="list">
                <ul>
                  <div className="list-item">
                    <li>
                      {" "}
                      You are ranked {stats.rank} out of {stats.users}
                    </li>
                  </div>
                  <div className="list-item">
                    <li>
                      {" "}
                      You have played {stats.blue_games + stats.red_games} games
                    </li>
                  </div>
                  <div className="list-item">
                    <li>
                      {" "}
                      You have won {stats.blue_wins + stats.red_wins} games
                    </li>
                  </div>
                  <div className="list-item">
                    <li className="blue">
                      {" "}
                      Victories playing as blue: {stats.blue_wins}
                    </li>
                  </div>
                  <div className="list-item">
                    <li className="red">
                      {" "}
                      Victories playing as red: {stats.red_wins}
                    </li>
                  </div>
                </ul>
              </div>
            </div>
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
