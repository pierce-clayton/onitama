import React, { Component } from "react";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: "",
      loginErrors: "",
      errorMessage: "",
    };
  }

  handleSubmit = (e) => {
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
        if (res.data.status === 401) {
          this.setState({
            ...this.state,
            errorMessage: "Incorrect username or password",
          });
        }
        if (res.data.status === "created") {
          this.props.handleSuccessfulAuth(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // <div class="control has-icons-left has-icons-right">
  // <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
  // <span class="icon is-small is-left">
  //   <i class="fas fa-envelope"></i>
  // </span>

  render() {
    console.log("render");
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
            <h2 className="title is-4">Player Login</h2>
            <div className="field ">
              <div className="control has-icons-right">
                <input
                  className={
                    this.state.errorMessage.length ? "input is-danger" : "input"
                  }
                  type="text"
                  placeholder="Username"
                  value={this.state.user_name}
                  name="user_name"
                  onChange={this.handleChange}
                  required
                />
                {this.state.errorMessage.length ? (
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
                    this.state.errorMessage.length ? "input is-danger" : "input"
                  }
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  required
                ></input>
                {this.state.errorMessage.length ? (
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                ) : null}
                <p className="help is-danger">{this.state.errorMessage}</p>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className={`button`} type="submit">
                  Go
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
