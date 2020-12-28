import React from "react";
const PlayerInfo = (props) => {
  let className = "is-info";

  if (props.type === 2) {
    className = "is-danger";
  }

  if (props.type === 2) {
  }
  return (
    <div>
      <p className="title is-4">Welcome, {props.user_name}</p>
      <p className="title is-5">Player {props.type} Info:</p>
      <div className="field">
        <div className="control">
          <input
            className={`input ${className} `}
            type="text"
            placeholder="Username"
          />
          <input
            className={`input ${className} `}
            type="text"
            placeholder="Password"
          />
          <div className="buttons ">
            <button className={`button ${className}`}>Update</button>
            {/* should re-render same player info page with new username displayed */}
            <button className={`button ${className}`}>Ready To Play</button>
            {/* enables new game button */}
          </div>

          <div className="mt-6 is-centered ">
            <a href="#">Delete Account</a>
            {/* should redirect user to login-screen */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
