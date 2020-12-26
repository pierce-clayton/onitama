import React, { Component } from "react";
import LoginForm from "../components/LoginForm"

class LogIn extends Component {
  state = {
    user_field: ''
  }

  onChange = (event) => {
    this.setState({user_field: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    event.persist()
    this.props.handleLogin(event.target.form.user_field.value)
  }
  render() {
    return <div>
      <LoginForm 
      user_field={this.state.user_field}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      />
    </div>;
  }
}

export default LogIn;
