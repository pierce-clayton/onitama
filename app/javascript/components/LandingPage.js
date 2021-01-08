import React from "react";
import NewGame from "./NewGame";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Logo from "images/OnitamaLogo.svg.png";

const LandingPage = (props) => {
  const { handleSuccessfulAuth } = props;
  return (
    <div>
      <div className="is-centered">
        <figure className="image logo p-6">
          <img src={Logo} alt="onitama logo in black" />
        </figure>
      </div>
      <div className="columns">
        <div className="column ">
          <Login
            {...props}
            loggedIn={props.loggedIn}
            handleSuccessfulAuth={handleSuccessfulAuth}
          />
          <section
            className="or"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 className="title is-4">Or</h2>
          </section>
          <Registration
            {...props}
            handleSuccessfulAuth={handleSuccessfulAuth}
          />
        </div>
        <div className="column">
          <NewGame />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
