import React, { Component } from 'react'

export default class Game extends Component {

  render() {
    // console.log(this.props)
    return (
      <div>
          {this.props.game.game_id ? <h1>Board Goes Here</h1> : <h1>Waiting screen goes here</h1>}
          
      </div>
    )
  }
}
