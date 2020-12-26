import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LogIn from "../containers/Login";
import Game from "../containers/Game";
export default class App extends Component {
  state = {
    players: [],
    searching: true
  }

  handleLogin = (user) => {
    if (this.state.players === []){
      this.setState(({players}) => ({
        players: [...players, user],
        searching: true
        }
      )
    )
    }else{
      this.setState(({players}) => ({
        players: [...players, user],
        searching: false
        }
      )
    )
    }
  }
  render() {
    return (
      <div>
        <h2>Start Page</h2>
        <Switch>
          <Route exact path="/login" >
            <LogIn handleLogin={this.handleLogin}/>  
          </Route> 
          <Route exact path="/onitama">
            <Game/>
          </Route>
        </Switch>
      </div>
    )
  }
}
