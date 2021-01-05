import React, { useState } from "react";

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post(
      "http://localhost:3000/sessions",
      {
        user: {
          user_name: this.state.user_name,
          password: this.state.password,
        },
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status === "created") {
        this.props.handleSuccessfulAuth(res.data);
      }
    })
    .catch((err) => console.log(err));
};

const EditPlayer = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="input"
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <div className="buttons ">
            <button className="button">Update</button>
            {/* should re-render same player info page with new username displayed */}

            {/* enables new game button */}
          </div>

          <div className="mt-6 is-centered ">
            <button className="button is-danger">Delete Account</button>
            {/* should redirect user to login-screen */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlayer;
