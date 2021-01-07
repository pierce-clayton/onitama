import { checkPropTypes } from "prop-types";
import React, { useState } from "react";
import axios from "axios";

const EditPlayer = ({ user, onComplete, history }) => {
  const [userName, setUserName] = useState(user.user_name);
  const [password, setPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    password: "",
    mismatch: "",
  });

  const handlesUpdate = async () => {
    if (newPasswordConfirmation !== newPassword) {
      setErrorMessage({ ...errorMessage, mismatch: "Passwords do not match" });
      return;
    } else {
      setErrorMessage({ ...errorMessage, mismatch: "" });
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

      setErrorMessage({
        ...errorMessage,
        password: "Incorrect username or password",
      });
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
      <div className="field">
        <div className="control has-icons-right">
          <input
            className={
              errorMessage.password.length ? "input is-danger" : "input"
            }
            type="text"
            placeholder={userName}
            value={userName}
            name="password"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          {errorMessage.password.length ? (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          ) : null}
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-right">
          <input
            className={
              errorMessage.mismatch.length ? "input is-danger" : "input"
            }
            type="password"
            placeholder="New Password"
            value={newPassword}
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {errorMessage.mismatch.length ? (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          ) : null}
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-right">
          <input
            className={
              errorMessage.mismatch.length ? "input is-danger" : "input"
            }
            type="password"
            name="new_password_conf"
            value={newPasswordConfirmation}
            placeholder="Confirm New Password"
            onChange={({ target }) => setNewPasswordConfirmation(target.value)}
          />
          {errorMessage.mismatch.length ? (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          ) : null}
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-right">
          <input
            className={
              errorMessage.password.length ? "input is-danger" : "input"
            }
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          {errorMessage.password.length ? (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          ) : null}
          {errorMessage.password.length ? (
            <strong>
              {" "}
              <p className="help is-danger">{errorMessage.password}</p>
            </strong>
          ) : null}
          {errorMessage.mismatch.length ? (
            <strong>
              <p className="help is-danger">{errorMessage.mismatch}</p>
            </strong>
          ) : null}
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
