import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import LandingPage from "./LandingPage";
import Game from "../containers/Game";
import Home from "./Home"
import Dashboard from "./Dashboard"
import axios from "axios"
// import consumer from "../channels/consumer"
// import { ActionCableConsumer } from 'react-actioncable-provider'
export default class App extends Component {
  state = {
    players: [],
    game_id: null,
    game_state: "",
    winning_user_id: null,
    user: {},
    loggedIn: 'NOT_LOGGED_IN',
  };
  match_channel = {}
  channel = this.props.cableApp.cable.subscriptions.create(
    { channel: "GameChannel" },
    {
      connected: () => this.handleConnected(),
      received: (data) => this.handleReceived(data),
      joined_game: () => {
        this.channel.perform("joined_game", { user: this.state.user });
      },
      start: (players) => {
        this.channel.perform("start", [...players]);
      },
    }
  );
  componentDidMount = () => {
    this.checkLoginStatus()
  }
  handleConnected = () => {
    // return channel.perform('get_match_channel', { user_id: })
    // console.log('handle_connected')
  };
  handleReceived = (data) => {
    if (data.message) {
      console.log(data.message);
    }
    if (data.game) {
      this.setState((_) => ({
        game_id: data.game.id,
        game_state: data.game.state,
        winning_user_id: data.game.winning_user_id,
      }));
    }
    if (data.players) {
      this.setState((_) => ({
        players: [...data.players],
      }));
    }
  };
  whatColor = () => {
    return this.state.players[0] === this.state.user_name ? "Red" : "Blue";
  };
  handleGameStarted = () => {};
  buildMatchChannel = (name) => {
    this.match_channel = this.props.cableApp.cable.subscriptions.create({channel: `Match${name}`}, {
      connected: () => {
        console.log('connected to match channel ' + name )
      },
      received: (data) => {
        console.log(data)
      },
      create: () => {},
      update: () => {},
      destroy: () => {}
    })
  }

  checkLoginStatus = () => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
    .then(res => {
      if (res.data.logged_in && this.state.loggedIn === 'NOT_LOGGED_IN'){
        this.setState({
          loggedIn: 'LOGGED_IN',
          user: res.data.user
        })
      } else if (!res.data.logged_in && this.state.loggedIn){
        this.setState({
          loggedIn: 'NOT_LOGGED_IN',
          user: {}
        })
      }
    })
    .catch(err => console.log(err))
  }

  handleLogin = (data) => {
    this.setState({ loggedIn: 'LOGGED_IN', user: data.user });
    this.match_channel = this.props.cableApp.cable.subscriptions.create({channel: 'MatchChannel', user_id: data.user.id},
    {
      connected: () => {},
      received: (data) => {
        if(data.message){
          console.log(data.message)
        }
      }
    })
    this.channel.perform('joined_game', data.user)
  };
  handleLogout = () => {
    this.setState({
      loggedIn: 'NOT_LOGGED_IN',
      user: {}
    })
  }
  render() {
    return (
      <div>
        {this.state.loggedIn && (
          <NavLink exact to="/onitama">
            Begin Game
          </NavLink>
        )}
        <Switch>
          {/* <Route exact path="/login"> */}
          <Route exact path="/" render={props => (
            // <LogIn handleLogin={this.handleLogin}/>,
            // <LandingPage
            //   handleLogin={this.handleLogin}
            //   user_name={this.state.user_name}
            //   playerColor={this.whatColor()}
            // />
            <Home 
            {...props} 
            handleLogin={this.handleLogin}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleLogout={this.handleLogout}
            loggedIn={this.state.loggedIn}
            />
          )}/>
          <Route exact path="/dashboard" render={props => (
            <Dashboard 
            {...props} 
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            loggedIn={this.state.loggedIn}
            user={this.state.user}
            />
          )} />
          <Route exact path="/onitama">
            <Game
              cable={this.props.cableApp.cable}
              gameStarted={this.handleGameStarted}
              game={this.state}
            />
          </Route>
        </Switch>
        <div className="foot">
          <p>
            <strong>Onitama</strong> by <a href="www.google.com">Cool people</a>
          </p>
        </div>
      </div>
    );
  }
}

{/* <LogIn handleLogin={this.handleLogin}/>   */}
            {/* <LandingPage
              handleLogin={this.handleLogin}
              user_name={this.state.user_name}
              playerColor={this.whatColor()}
            /> */}