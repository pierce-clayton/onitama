import React, { Component } from 'react'

export default class Board extends Component {

  componentDidMount = () => {
    // this should start the subscription to the matches channel Match{game_id}
  }
  componentWillUnmount = () => {
    // this should clean up the match channel
  }
  render() {

    return (
      <div>
        <h1>Game Board goes here</h1>
      </div>
    )
  }
}
