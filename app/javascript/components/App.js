import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import Game from "../containers/Game";
import Logo from "images/OnitamaLogo.svg.png";
import LogoBlue from "images/OnitamaLogo_blue.svg.svg";
import LogoRed from "images/OnitamaLogo_red.svg.svg";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: reactLocalStorage.getObject("game") || {},
      user: {},
      loggedIn: "NOT_LOGGED_IN",
      showNav: false,
      logo: Logo,
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
    console.log("game over");
    this.setState((_) => ({
      game: {},
    }));
    reactLocalStorage.clear();
  };

  //handle a palyer foritting the game
  forfit = () => {
    this.handleGameWon();
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

  // handle successful login
  handleSuccessfulAuth = (data) => {
    this.handleLogin(data);
  };

  //log the user out
  handleLogoutClick = (_) => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        this.handleLogout();
      })
      .catch((err) => console.error(err));
  };

  handleLogin = (data) => {
    this.setState({ loggedIn: "LOGGED_IN", user: data.user });
  };
  handleLogout = () => {
    reactLocalStorage.clear();
    this.setState({
      loggedIn: "NOT_LOGGED_IN",
      user: {},
      game: {},
    });
  };

  handleUserRefresh = () => {
    this.checkLoginStatus();
  };

  showNav = () => {
    this.setState({
      ...this.state,
      showNav: !this.state.showNav,
    });
  };

  handleLogClick = (e) => {
    if (this.state.loggedIn === "LOGGED_IN") {
      this.handleLogoutClick();
    }
  };

  setLogo = (cp = null) => {
    switch (cp) {
      case "red":
        return this.setState({ ...this.state, logo: LogoRed });
      case "blue":
        return this.setState({ ...this.state, logo: LogoBlue });
      default:
        return this.setState({ ...this.state, logo: Logo });
    }
  };
  render() {
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={this.state.logo} width="112" height="28" />
            </Link>

            <a
              role="button"
              className={
                this.state.showNav ? "navbar-burger is-active" : "navbar-burger"
              }
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={this.showNav}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbarBasicExample"
            className={
              this.state.showNav ? "navbar-menu is-active" : "navbar-menu"
            }
          >
            <div className="navbar-start">
              <Link
                to="/"
                className="navbar-item"
                onClick={this.handleLogClick}
              >
                <strong>
                  {this.state.loggedIn === "NOT_LOGGED_IN"
                    ? "Login/Signup"
                    : "Log Out"}
                </strong>
              </Link>

              {this.state.game.id ? (
                <Link
                  to="/dashboard"
                  className="navbar-item"
                  onClick={this.forfit}
                >
                  {" "}
                  Forfit Game{" "}
                </Link>
              ) : null}
            </div>
          </div>
        </nav>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <LandingPage
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
                setLogo={this.setLogo}
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
