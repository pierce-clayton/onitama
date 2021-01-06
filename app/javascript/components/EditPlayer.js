import { checkPropTypes } from "prop-types";
import React, { useState } from "react";
import axios from "axios";

const EditPlayer = ({ user, onComplete, history }) => {
  const [userName, setUserName] = useState(user.user_name);
  const [password, setPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handlesUpdate = async () => {
    if (newPasswordConfirmation !== newPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.put(
        `/users/${user.id}`,
        {
          user_name: userName,
          newPassword: newPassword,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        onComplete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlesDelete = async () => {
    try {
      const response = await axios.delete(`/users/${user.id}`);
      if (response.status === 200) {
        history.push("/");
      }
      axios.get("/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {errorMessage}
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
            placeholder="Confirm New Password"
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
            <button type="submit" className="button" onClick={handlesUpdate}>
              Update
            </button>
          </div>

          <div className="mt-6 is-centered ">
            <button className="button is-danger" onClick={handlesDelete}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlayer;
