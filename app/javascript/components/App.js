import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LogIn from "../containers/Login";
import Game from "../containers/Game";
// import consumer from "../channels/consumer"
// import { ActionCableConsumer } from 'react-actioncable-provider'

export default class App extends Component {
  state = {
    players: [],
    searching: false
  }
  
  channel = this.props.cableApp.cable.subscriptions.create({channel:'GameChannel'},{
    connected: () => this.handleConnected(),
    received: (data) => this.handleReceived(data),
    joined_game: () => {
      this.channel.perform('joined_game', { players: this.state.players })
    }
  })

  handleConnected = () => {
    // console.log('handle_connected')
  }
  handleReceived = (data) => {
    // console.log('handle_received' + data)
    this.setState(({searching}) => {
      return ({
      players: [...data],
      searching: !searching
      }
    )})
  }
  componentDidMount = (event) => {
    
  }

  handleLogin = (user) => {
    // console.log(this.channel)
    this.channel.perform('joined_game', { players: user})
  }
  render() {
    return (
      <div>
        {/* <ActionCableConsumer
        channel={{channel: 'GameChannel'}}
        onConnected={() =>console.log('onconnected')}
        onReceived={this.handleReceived}
        > */}
        <h2>Start Page</h2>
        <Switch>
          <Route exact path="/login" >
            <LogIn handleLogin={this.handleLogin}/>  
          </Route> 
          <Route exact path="/onitama">
            <Game/>
          </Route>
        </Switch>
        {/* </ActionCableConsumer> */}
      </div>
    )
  }
}
