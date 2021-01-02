import React, { Component } from 'react'
import Registration from "./auth/Registration"
import Login from "./auth/Login"
import axios from 'axios'
export default class Home extends Component {
  
  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data)
    this.props.history.push('/dashboard')
  }

  handleLogoutClick = (_) => {
    axios.delete('http://localhost:3000/logout', { withCredentials: true })
    .then(res => {
      this.props.handleLogout()
    })
    .catch(err => console.error(err))
  }
  render() {
    return (
      <div>
        <h3>Status: {this.props.loggedIn}</h3>
        <button type='button' onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        />
        <Login
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        />
      </div>
    )
  }
}
