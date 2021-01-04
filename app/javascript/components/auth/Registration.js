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
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
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
        }
      })
      .catch((err) => console.log(err));
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <h2 className="title is-4">Create an Account</h2>
            <div className="field ">
              <div className="control">
                <input
                  // className={`input ${className}`}
                  className="is-centered"
                  type="text"
                  placeholder="Username"
                  name="user_name"
                  value={this.state.user_name}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  // className={`input ${className}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
            </div>
            <div className="field">
              <div className="control">
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

// render() {
//   return (
//     <div>
//       <form onSubmit={this.handleSubmit}>
//         <input type="text" name='user_name' placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />
//         <input type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
//         <input type="password" name='password_confirmation' placeholder="Confirm Password" value={this.state.password_confirmation} onChange={this.handleChange} required />
//         <button type='submit'>Register</button>
//       </form>

//     </div>
//   )
// }
