import React, { Component } from "react";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: "",
      loginErrors: "",
    };
  }

  handleSubmit = (e) => {
    console.log("HANdLE");
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log("render");
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
            <h2 className="title is-4">Player Login</h2>
            <div className="field ">
              <div className="control">
                <input
                  // className={`input ${className}`}
                  className="is-centered"
                  type="text"
                  placeholder="Username"
                  value={this.state.user_name}
                  name="user_name"
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
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  required
                ></input>
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

//   return (
//     <div>
//       <form onSubmit={this.handleSubmit}>
//         <input type="text" name='user_name' placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />
//         <input type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
//         <button type='submit'>Login</button>
//       </form>

//     </div>
//   )
// }
// }
