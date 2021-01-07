import React, { Component } from "react";
import NewGame from "./NewGame";

export default class Waiting extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Waiting for other player...</h1>
        <h2> Why not brush up on the rules while you wait?</h2>
        <div className="column">
          <NewGame />
        </div>
      </div>
    );
  }
}
