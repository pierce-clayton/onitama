import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import LandingPage from "./LandingPage";
import Game from "../containers/Game";

// import consumer from "../channels/consumer"
// import { ActionCableConsumer } from 'react-actioncable-provider'
export default class App extends Component {
  state = {
    players: [],
    user_name: "",
    game_id: null,
    game_state: "",
    winning_user_id: null,
    loggedIn: false,
  };
  match_channel = {}
  channel = this.props.cableApp.cable.subscriptions.create(
    { channel: "GameChannel" },
    {
      connected: () => this.handleConnected(),
      received: (data) => this.handleReceived(data),
      joined_game: () => {
        this.channel.perform("joined_game", { players: this.state.players });
      },
      start: (players) => {
        this.channel.perform("start", [...players]);
      },
    }
  );

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
  handleLogin = (user) => {
    this.setState({ loggedIn: true, user_name: user });
    this.buildMatchChannel(user)
    this.channel.perform("joined_game", { players: user });
  };
  render() {
    return (
      <div>
        {!!this.state.game_id && <h1>Playing as {this.whatColor()}</h1>}
        {this.state.loggedIn && <h2>Start Page</h2>}
        {/* {!this.state.loggedIn && (
          <NavLink exact to="/login">
            Login
          </NavLink>
        )} */}
        {this.state.loggedIn && (
          <NavLink exact to="/onitama">
            Begin Game
          </NavLink>
        )}
        <Switch>
          {/* <Route exact path="/login"> */}
          <Route exact path="/">
            {/* <LogIn handleLogin={this.handleLogin}/>   */}
            <LandingPage
              handleLogin={this.handleLogin}
              user_name={this.state.user_name}
              playerColor={this.whatColor()}
            />
          </Route>
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
