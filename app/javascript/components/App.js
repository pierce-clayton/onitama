import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import LogIn from "../containers/Login";
import Game from "../containers/Game";

// import consumer from "../channels/consumer"
// import { ActionCableConsumer } from 'react-actioncable-provider'
export default class App extends Component {
  state = {
    players: [],
    game_id: null,
    game_state: '',
    winning_user_id: null,
    loggedIn: false
  }
  
  channel = this.props.cableApp.cable.subscriptions.create({channel:'GameChannel'},{
    connected: () => this.handleConnected(),
    received: (data) => this.handleReceived(data),
    joined_game: () => {
      this.channel.perform('joined_game', { players: this.state.players })
    },
    start: (players) => {
      this.channel.perform('start', [...players])
    }
  })

  handleConnected = () => {
    // console.log('handle_connected')
  }
  handleReceived = (data) => {
    if (data.message){
      console.log(data.message)
    }else if(data.game){
      this.setState((_) => ({
        players: [data.game.blue_user_id, data.game.red_user_id],
        game_id: data.game.id,
        game_state: data.game.state,
        winning_user_id: data.game.winning_user_id

      }))
    }    
  }
  handleGameStarted = () => {
    
  }

  handleLogin = (user) => {
    this.setState({loggedIn: true})
    // console.log(this.channel)
    this.channel.perform('joined_game', { players: user})
  }
  render() {
    return (
      <div>
        {this.state.loggedIn && <h2>Start Page</h2>}
        {!this.state.loggedIn && <NavLink exact to="/login">Login</NavLink>}
        {this.state.loggedIn && <NavLink exact to="/onitama">Begin Game</NavLink>}
        <Switch>
          <Route exact path="/login" >
            <LogIn handleLogin={this.handleLogin}/>  
          </Route> 
          <Route exact path="/onitama">
            <Game
            cable={this.props.cableApp.cable}
            gameStarted={this.handleGameStarted}
            game={this.state}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}
