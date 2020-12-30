import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name: '',
      password: '',
      loginErrors: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/sessions', {
      user: {
        user_name: this.state.user_name,
        password: this.state.password
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
          <button type='submit'>Login</button>
        </form>

      </div>
    )
  }
}
