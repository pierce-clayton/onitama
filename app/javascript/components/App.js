import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Game from "../containers/Game";
import NotFound from "../components/NotFound";
import Home from "./Home";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import Dashboard from "./Dashboard";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: reactLocalStorage.getObject("game") || {},
      user: {},
      loggedIn: "NOT_LOGGED_IN",
    };
  }

  channel = this.props.cableApp.cable.subscriptions.create(
    { channel: "GameChannel" },
    {
      received: (data) => this.handleReceived(data),
      joined_game: (data) => {
        this.channel.perform("joined_game", data.user);
      },
    }
  );
  componentDidMount = () => {
    this.checkLoginStatus();
  };

  handleReceived = (data) => {
    if (data.message) {
      console.log(data.message);
    }
    if (data.game) {
      this.handleGameStarted(data.game);
    }
  };
  whatColor = () => {
    return this.state.game.red_user_id === this.state.user.id ? "Red" : "Blue";
  };
  handleGameStarted = (game) => {
    this.setState({ game: game });
    reactLocalStorage.setObject("game", game);
    // this.channel.unsubscribe()
  };

  handleGameWon = (game) => {
    this.setState((_) => ({
      game: {},
    }));
    reactLocalStorage.clear();
  };

  checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((res) => {
        if (res.data.logged_in) {
          this.setState({
            loggedIn: "LOGGED_IN",
            user: res.data.user,
          });
        } else if (!res.data.logged_in && this.state.loggedIn) {
          this.setState({
            loggedIn: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleLogin = (data) => {
    this.setState({ loggedIn: "LOGGED_IN", user: data.user });
    // this.channel.joined_game(data);
  };
  handleLogout = () => {
    reactLocalStorage.clear();
    this.setState({
      loggedIn: "NOT_LOGGED_IN",
      user: {},
    });
  };

  handleUserRefresh = () => {
    this.checkLoginStatus();
  };
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                handleLogin={this.handleLogin}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                handleLogout={this.handleLogout}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <Dashboard
                {...props}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                loggedIn={this.state.loggedIn}
                user={this.state.user}
                onUserRefresh={this.handleUserRefresh}
                game={this.state.game}
                join_game={this.channel.joined_game}
              />
            )}
          />
          {/* route to 404 */}
          <Route>
            <NotFound />
          </Route>
          <Route
            exact
            path="/onitama"
            render={(props) => (
              <Game
                {...props}
                cable={this.props.cableApp.cable}
                gameStarted={this.handleGameStarted}
                game={this.state.game}
                user={this.state.user}
                userColor={this.whatColor()}
              />
            )}
          />
        </Switch>
        <div className="foot">
          <p>
            <strong>Onitama</strong> by
            <a href="https://github.com/wlytle"> Will Lytle</a>,
            <a href="https://github.com/technicholy"> Clay Pierce </a>,
            <a href="https://github.com/mandareis"> Amanda Reis</a>
          </p>
        </div>
      </div>
    );
  }
}
