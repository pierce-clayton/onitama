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

const EditPlayer = ({ user }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [userName, setUserName] = useState(user);
  const [password, setPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div>
      <div className="field">
        <div className="control">
          <input
            className="input is-danger"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input is-success"
            type="password"
            name="new_password"
            value={newPassword}
            placeholder="New Password"
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="password"
            name="new_password_conf"
            value={newPasswordConfirmation}
            placeholder="Confrim New Password"
            onChange={({ target }) => setNewPasswordConfirmation(target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <div className="buttons ">
            <button className="button">Update</button>
          </div>

          <div className="mt-6 is-centered ">
            <button className="button is-danger">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlayer;
