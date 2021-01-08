import React, { Component } from "react";
import axios from "axios";
export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
      errorMessage: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.password_confirmation) {
      this.setState({
        ...this.state,
        errorMessage: { password: "Passwords don't match" },
      });
    } else {
      axios
        .post(
          "http://localhost:3000/registrations",
          {
            user: {
              user_name: this.state.user_name,
              password: this.state.password,
              password_confirmation: this.state.password_confirmation,
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.status === "created") {
            this.props.handleSuccessfulAuth(res.data);
            this.props.history.push("/dashboard");
          }
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            errorMessage: { username: "Usename is already taken" },
          });
          console.log(err);
        });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlesLoginBtn = () => {
    props.handleLogin(username, password);
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <h2 className="title is-4">New Account</h2>
            <div className="field ">
              <div className="control has-icons-right">
                <input
                  className={
                    this.state.errorMessage.username
                      ? "is-centered input is-danger"
                      : "is-centered input"
                  }
                  type="text"
                  placeholder="Username"
                  name="user_name"
                  value={this.state.user_name}
                  onChange={this.handleChange}
                  required
                />
                {this.state.errorMessage.username ? (
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                ) : null}
                {this.state.errorMessage.username ? (
                  <strong>
                    {" "}
                    <p className="help is-danger">
                      {this.state.errorMessage.username}
                    </p>
                  </strong>
                ) : null}
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-right">
                <input
                  className={
                    this.state.errorMessage.password
                      ? "input is-danger"
                      : "input"
                  }
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                ></input>
                {this.state.errorMessage.password ? (
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
                    this.state.errorMessage.password
                      ? "input is-danger"
                      : "input"
                  }
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  required
                ></input>
                {this.state.errorMessage.password ? (
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                ) : null}
                {this.state.errorMessage.password ? (
                  <strong>
                    <p className="help is-danger">
                      {this.state.errorMessage.password}
                    </p>
                  </strong>
                ) : null}
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-right">
                <button type="submit" className={`button`}>
                  sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
