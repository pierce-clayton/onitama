import React from "react";
import PlayerInfo from "./PlayerInfo";
import Login from "./Login";
const Player = (props) => {
  return (
    <div>
      {props.user_name ? (
        <PlayerInfo user_name={props.user_name} />
      ) : (
        <Login handleLogin={props.handleLogin} />
      )}

      {/* decides the color */}
      {/* {this.whatColor()} */}
    </div>
  );
};

export default Player;
