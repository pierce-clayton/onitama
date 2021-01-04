import React from "react";
import NewGame from "./NewGame";
import Player from "./Player";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Logo from "images/OnitamaLogo.svg.png";

const LandingPage = ({ handleSuccessfulAuth }) => {
  return (
    <div>
      <div className="is-centered">
        <figure className="image logo p-6">
          <img src={Logo} alt="onitama logo in black" />
        </figure>
      </div>
      <div className="columns">
        <div className="column ">
          <Login handleSuccessfulAuth={handleSuccessfulAuth} />
          <section style={{ display: "flex", justifyContent: "center" }}>
            <h2>
              <strong>Or</strong>
            </h2>
          </section>
          <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
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
