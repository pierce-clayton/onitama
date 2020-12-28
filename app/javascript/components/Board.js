import React, { Component } from 'react'

export default class Board extends Component {

  componentDidMount = () => {
    // this should start the subscription to the messages channel Message{game_id}
  }
  render() {

    return (
      <div>
        <h1>Game Board goes here</h1>
      </div>
    )
  }
}
