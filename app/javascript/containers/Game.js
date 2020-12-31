import React, { Component } from "react";
import PlayerCards from "./PlayerCards";
import Board from "../components/Board";
import Card from "../components/Card";
import { CARDS } from "../constants/index";

// for Backend: need piece_id, new pos, card_id

class Game extends Component {
  state = {
    currentPlayer: "blue",
    selectedCard: {},
    selectedPiece: {},
    validMoves: [],
    board: [
      ["Rs1", "Rs2", "Rm", "Rs3", "Rs4"],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      ["Bs1", "Bs2", "Bm", "Bs3", "Bs4"],
    ],
    cards: [],
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
  selectCard = (e, selectedCard) => {
    // only allow a player to select their own cards
    if (
      (this.isRedCard(selectedCard) && this.state.currentPlayer === "blue") ||
      (this.isBlueCard(selectedCard) && this.state.currentPlayer === "red")
    ) {
      this.sendSelectedCard(selectedCard);
    }
  };

  //send selectedcard info to the backend
  sendSelectedCard = (selectedCard) => {
    console.log("I'll send selectedCard and reset valid moves to the backend");
    this.updateSelectedCardState(selectedCard);
  };

  //update selectedCard state with response from action cable
  updateSelectedCardState = (selectedCard) => {
    this.setState({
      selectedCard,
      validMoves: [],
    });
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

  //handle click on the board
  handleClick = ({ currentTarget }) => {
    if (!this.state.selectedCard) return null;

    //restrict starting locations to current piece lcoations
    //############## Update this method once backend is connected#################
    if (
      currentTarget.dataset.id[0] === this.state.currentPlayer[0].toUpperCase()
    ) {
      // this.setState({ selectPiece: {currentTarget.textContent} });
      this.selectPiece(currentTarget);
    } else {
      this.movePiece(currentTarget);
    }
  };

  //update state with selected piece and show possible moves
  selectPiece = (currentTarget) => {
    let yFactor, xFactor, opponent;
    if (this.state.currentPlayer === "blue") {
      yFactor = -1;
      xFactor = 1;
      //update this once we have backend data so opponents are properly identified
      opponent = "R";
    } else {
      yFactor = 1;
      xFactor = -1;
      //update this once we have backend data so opponents are properly identified
      opponent = "B";
    }
    const row = +currentTarget.dataset.row;
    const col = +currentTarget.dataset.col;
    const moves = this.getMoves();
    let validMoves = [];
    moves.forEach((move) => {
      let x = col + move[0] * xFactor;
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
    const id = currentTarget.dataset.id;
    this.sendValidMoves(validMoves, id, col, row);
  };

  //send vaild moves associated with a selectedPiece to the backend
  sendValidMoves = (validMoves, id, col, row) => {
    console.log(
      "I'll send the current piece and associated valid moves to the backend!"
    );
    this.updateValidMoves(validMoves, id, col, row);
  };

  updateValidMoves = (validMoves, id, col, row) => {
    this.setState({
      validMoves,
      selectedPiece: { id, col, row },
    });
  };

  //move piece to selected valid location
  movePiece = ({ dataset }) => {
    const { row, col } = dataset;

    this.state.validMoves.forEach((move) => {
      if (move[0] === +col && move[1] === +row) {
        return this.setState((prevState) => {
          // check if move will take opponents master
          const won = this.isGameOver(prevState, move);
          // move selected piece to new square and empty out current square
          prevState.board[row][col] = prevState.selectedPiece.id;
          prevState.board[prevState.selectedPiece.row][
            prevState.selectedPiece.col
          ] = 0;
          // set new current player and set up cards for next turn
          let newPlayer;
          let currentCardLoc = prevState.selectedCard.location;
          if (prevState.currentPlayer === "blue") {
            newPlayer = "red";
            prevState.cards.forEach((card) => {
              if (card.location === 2) {
                card.location = currentCardLoc;
              } else if (card === prevState.selectedCard) {
                card.location = 5;
              }
            });
          } else {
            newPlayer = "blue";
            prevState.cards.forEach((card) => {
              if (card.location === 5) {
                card.location = currentCardLoc;
              } else if (card === prevState.selectedCard) {
                card.location = 2;
              }
            });
          }
          if (won) window.alert(`${prevState.currentPlayer} Wins!`);
          // *******************************************
          // for backend:
          // Piece and end location
          //

          //reset state
          //
          return this.sendMove(prevState, newPlayer);
        });
      }
    });
  };

  //update board after a move is made on the backend
  sendMove(prevState, newPlayer) {
    console.log(
      "I'm sending the new board and card state and new current player to teh backend "
    );
    return {
      board: [...prevState.board],
      currentPlayer: newPlayer,
      selectedCard: {},
      selectedPiece: {},
      validMoves: [],
      cards: [...prevState.cards],
    };
  }

  //check to see if the current move will end the game
  isGameOver = ({ board, currentPlayer, selectedPiece }, [col, row]) => {
    // was the opponenets master peice taken
    if (
      (currentPlayer === "blue" && board[row][col] === "Rm") ||
      (currentPlayer === "red" && board[row][col] === "Bm")
    ) {
      console.log("Capture");
      return true;
    } else if (
      (selectedPiece.id === "Bm" && row === 0 && col === 2) ||
      (selectedPiece.id === "Rm" && row === 4 && col === 2)
    ) {
      console.log("gate");
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    // Shuffle cards
    const shuffled = CARDS.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let cards = shuffled.slice(0, 5).map((card, i) => {
      card.location = i;
      return card;
    });
    this.sendNewDeck(cards);
  }

  //send New Deck of cards to the back end
  sendNewDeck = (cards) => {
    console.log("I'm updating the back end with the new deck of cards");
    this.updateCardsState(cards);
  };

  // add the new deck of cards into state
  updateCardsState = (cards) => {
    this.setState({
      cards,
    });
  };

  render() {
    return (
      <div className="columns is-mobile is-vcentered game">
        <div className="column is-1 is-offset-1">
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
            selectedCard={this.state.selectedCard}
          />
          <Board
            board={this.state.board}
            handleClick={this.handleClick}
            validMoves={this.state.validMoves}
          />
          <PlayerCards
            card1={this.findCardByLoc(0)}
            card2={this.findCardByLoc(1)}
            selectCard={this.selectCard}
            selectedCard={this.state.selectedCard}
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
