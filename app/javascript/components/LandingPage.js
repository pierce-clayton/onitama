import React from "react";
import NewGame from "./NewGame";
import Player from "./Player";
import Logo from "images/OnitamaLogo.svg.png";

const LandingPage = (props) => {
  return (
    <div>
      <div className="is-centered">
        <figure className="image logo p-6">
          <img src={Logo} alt="onitama logo in black" />
        </figure>
      </div>
      <div className="columns">
        <div className="column ">
          <Player
            playerColor={props.playerColor}
            user_name={props.user_name}
            handleLogin={props.handleLogin}
          />
        </div>
        <div className="column">
          <NewGame />
        </div>
        {/* <div className="column is-one-quarter"> */}
        {/* <Player
            player={2}
            user={props.user2}
            setUser={props.setUser2}
            handleLogin={props.handleLogin}
          /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
