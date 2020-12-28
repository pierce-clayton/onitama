import React, { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let className = "";
  // let className = "is-info";

  // if (props.type === 2) {
  //   className = "is-danger";
  // }

  // will need to talk to backend
  const handlesLoginBtn = () => {
    props.handleLogin(username);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="title is-4">Player Login</h2>
        <div className="field ">
          <div className="control">
            <input
              // className={`input ${className}`}
              className="is-centered"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              // className={`input ${className}`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className={`button ${className}`} onClick={handlesLoginBtn}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
