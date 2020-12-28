import React, { Component } from 'react'
import Board from '../components/Board'
import Waiting from '../components/Waiting'

export default class Game extends Component {

  render() {
    // THIS IS A CONTAINER
    return (
      <div>
          {this.props.game.game_id ? <Board cable={this.props.cable} game={this.props.game} /> : <Waiting/>}
          
      </div>
    )
  }
}
