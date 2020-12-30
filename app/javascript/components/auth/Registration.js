import React, { Component } from 'react'
import axios from 'axios'
export default class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name: '',
      password: '',
      password_confirmation: '',
      registrationErrors: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/registrations', {
      user: {
        user_name: this.state.user_name,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    },
    { withCredentials: true }
    )
    .then(res => {
      if (res.data.status === 'created'){
        this.props.handleSuccessfulAuth(res.data)
      }
    })
    .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name='user_name' placeholder="User Name" value={this.state.user_name} onChange={this.handleChange} required />
          <input type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <input type="password" name='password_confirmation' placeholder="Confirm Password" value={this.state.password_confirmation} onChange={this.handleChange} required />
          <button type='submit'>Register</button>
        </form>

      </div>
    )
  }
}
