import React, { Component } from "react";
import Waiting from "../components/Waiting";

import PlayerCards from "./PlayerCards";
import Board from "../components/Board";
import Card from "../components/Card";

// for Backend: need piece_id, new pos, card_id

class Game extends Component {
  state = {
    currentPlayer: "blue",
    selectedCard: {},
    validMoves: [],
    board: [
      ["Rs1", "Rs2", "Rm", "Rs3", "Rs4"],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      ["Bs1", "Bs2", "Bm", "Bs3", "Bs4"],
    ],
    cards: [
      {
        name: "tiger",
        location: 0,
        moves: "(0,-1) (0,2)",
      },
      {
        name: "cobra",
        location: 1,
        moves: "(-1,0) (1,1) (1,-1)",
      },
      {
        name: "dragon",
        location: 2,
        moves: "(-2,1) (2,1) (-1,-1) (1,-1)",
      },
      {
        name: "frog",
        location: 3,
        moves: "(1-1) (-1,1) (-2,0)",
      },
      {
        name: "mantis",
        location: 4,
        moves: "(0,-1) (1,-1) (-1,1)",
      },
    ],
  };

  // define blue side as default down and left most card of blue team being location 0 increasing counter clockwise
  // with the exception that the cards on the top being reversed:
  //          3    4
  //   5  [ redBoard ]
  //      [ bluBoard ]  2
  //          0    1
  //
  findCardByLoc = (loc) => {
    return this.state.cards.find((card) => card.location === loc);
  };

  isRedCard = (selectedCard) => {
    return selectedCard.location === 0 || selectedCard.location === 1;
  };

  isBlueCard = (selectedCard) => {
    return selectedCard.location === 3 || selectedCard.location === 4;
  };

  // Update state with selected card
  selectCard = (selectedCard) => {
    // only allow a player to select their own cards
    if (
      (this.isRedCard(selectedCard) && this.state.currentPlayer === "blue") ||
      (this.isBlueCard(selectedCard) && this.state.currentPlayer === "red")
    ) {
      this.setState({
        selectedCard,
        validMoves: [],
      });
    }
  };

  //translate card moves into [row][col] deltas
  getMoves = () => {
    let tmp;
    //extract deltas from ordered pairs
    const stringMoves = this.state.selectedCard.moves.match(/(-?\d,-?\d)/g);
    return stringMoves.map((strmov) => {
      //split ordered pairs to make an array of arrays of vaible moves
      tmp = strmov.split(",");
      return [+tmp[0], +tmp[1]];
    });
  };

  //   isRedPiece = (selectedpiece) => {
  //     return selectedCard.location === 0 || selectedCard.location === 1;
  //   };

  //   isBluePiece = (selectedpiece) => {
  //     return selectedCard.location === 3 || selectedCard.location === 4;
  //   };

  //update state with selected piece and show possible moves
  selectPiece = ({ currentTarget }) => {
    //prevent moving before a card is selected
    if (!this.state.selectedCard) return null;

    //restrict starting locations to current piece lcoations
    //############## Update this method once backend is connected#################
    if (
      currentTarget.textContent[0] !== this.state.currentPlayer[0].toUpperCase()
    ) {
      return this.setState({ validMoves: [] });
    }

    let yFactor, opponent;
    if (this.state.currentPlayer === "blue") {
      yFactor = -1;
      //update this once we have backend data so opponents are properly identified
      opponent = "R";
    } else {
      yFactor = 1;
      //update this once we have backend data so opponents are properly identified
      opponent = "B";
    }
    const row = +currentTarget.dataset.row;
    const col = +currentTarget.dataset.col;
    const moves = this.getMoves();
    let validMoves = [];
    moves.forEach((move) => {
      let x = col + move[0];
      let y = row + move[1] * yFactor;
      //check if move is valid
      if (x > 4 || x < 0 || y > 4 || y < 0) return;
      if (
        this.state.board[y][x] === 0 ||
        this.state.board[y][x][0] === opponent
      ) {
        validMoves.push([x, y]);
      }
    });
    this.setState({ validMoves });
  };

  render() {
    return (
      <div className="columns is-mobile is-vcentered game">
        <div className="column is-2">
          <Card
            flip={true}
            card={this.findCardByLoc(5)}
            selectCard={this.selectCard}
          />
        </div>
        <div className="column is-4">
          <PlayerCards
            flip={true}
            card1={this.findCardByLoc(3)}
            card2={this.findCardByLoc(4)}
            selectCard={this.selectCard}
          />
          <Board
            board={this.state.board}
            selectPiece={this.selectPiece}
            validMoves={this.state.validMoves}
          />
          <PlayerCards
            card1={this.findCardByLoc(0)}
            card2={this.findCardByLoc(1)}
            selectCard={this.selectCard}
          />
        </div>
        <div className="column is-2 is-offset-2">
          <Card card={this.findCardByLoc(2)} selectCard={this.selectCard} />
        </div>
      </div>
    );
  }
}

export default Game;

// export default class Game extends Component {

//   render() {
//     // THIS IS A CONTAINER
//     return (
//       <div>
//           {this.props.game.game_id ? <Board cable={this.props.cable} game={this.props.game} /> : <Waiting/>}

//       </div>
//     )
//   }
// }
