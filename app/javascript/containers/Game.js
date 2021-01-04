import React, { Component } from "react";
import PlayerCards from "./PlayerCards";
import Board from "../components/Board";
import Card from "../components/Card";
import { CARDS } from "../constants/index";

// for Backend: need piece_id, new pos, card_id

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      transition: {
        startAnim: true,
        playerCard: {
          card: {},
          startTop: 0,
          startRight: 0,
        },
        nextCard: {
          card: {},
          startTop: 0,
          startRight: 0,
        },
      },
    };
    this.match_channel = props.cable.subscriptions.create(
      { channel: `MatchChannel`, game_id: props.game.id },
      {
        connected: () => {
          console.log("connected to match channel ");
        },
        received: (data) => {
          if (data.message) {
            console.log(data.message);
          }
          if (data.card) {
            this.updateSelectedCardState(data.card);
          }
          if (data.validMoves) {
            this.updateValidMoves(data.validMoves);
          }
          if (data.sendMove) {
            this.sendMove(data.sendMove);
          }
        },
        sendSelectedCard: (card) => {
          this.match_channel.perform("sendSelectedCard", card);
        },
        sendValidMoves: (validMoves) => {
          this.match_channel.perform("sendValidMoves", validMoves);
        },
        sendMove: (board) => {
          this.match_channel.perform("sendMove", board);
        },
      }
    );
  }

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
    //only allow current player to select anything
    if (this.props.userColor.toLowerCase() !== this.state.currentPlayer)
      return null;
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
    this.match_channel.sendSelectedCard({ newCard: selectedCard });
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
    if (!this.state.selectedCard.name) return null;

    //restrict starting locations to current piece lcoations
    //############## Update this method once backend is connected#################
    if (
      currentTarget.dataset.id[0] === this.state.currentPlayer[0].toUpperCase()
    ) {
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
    this.match_channel.sendValidMoves({
      newMoves: {
        validMoves: { validMoves: validMoves, id: id, col: col, row: row },
      },
    });
    // this.updateValidMoves(validMoves, id, col, row);
  };

  updateValidMoves = ({ validMoves, id, col, row }) => {
    this.setState({
      validMoves,
      selectedPiece: { id, col, row },
    });
  };

  //move piece to selected valid location
  movePiece = (currentTarget) => {
    const { row, col } = currentTarget.dataset;

    this.state.validMoves.forEach((move) => {
      //only allow move if it is a valid move
      if (move[0] === +col && move[1] === +row) {
        //return this.setState((prevState) => {
        let prevState = JSON.parse(JSON.stringify(this.state));
        let destinationCardTop;
        let destinationCardRight;
        let nextStartTop;
        let nextStartRight;
        // check if move will wnd the game
        if (this.isGameOver(prevState, move)) {
          window.alert(`${prevState.currentPlayer} Wins!`);
        }
        // move selected piece to new square and empty out current square
        prevState.board[row][col] = prevState.selectedPiece.id;
        prevState.board[prevState.selectedPiece.row][
          prevState.selectedPiece.col
        ] = 0;
        // set new current player and set up cards for next turn
        let newPlayer;
        //get the location of the selected card during this turn

        let currentCardLoc = +prevState.selectedCard.location;
        // keep a reference to this location for use with animations
        let cardRef = currentCardLoc;
        if (prevState.currentPlayer === "blue") {
          newPlayer = "red";
          prevState.transition.nextCard.card = this.findCardByLoc(2);
          prevState.cards.forEach((card) => {
            if (+card.location === 2) {
              card.location = currentCardLoc;
            } else if (card.name === prevState.selectedCard.name) {
              card.location = 5;
            }
          });

          //find the next location of the selected card
          destinationCardTop =
            this.cardRef5.getBoundingClientRect().top +
            document.documentElement.scrollTop;
          destinationCardRight = this.cardRef5.getBoundingClientRect().right;
          //find the location of the current 'next card'
          nextStartTop =
            this.cardRef2.getBoundingClientRect().top +
            document.documentElement.scrollTop;

          nextStartRight = this.cardRef2.getBoundingClientRect().right;
        } else {
          //set next player
          newPlayer = "blue";
          //update card locations around board for the next turn
          prevState.transition.nextCard.card = this.findCardByLoc(5);
          prevState.cards.forEach((card) => {
            if (+card.location === 5) {
              card.location = currentCardLoc;
            } else if (card.name === prevState.selectedCard.name) {
              card.location = 2;
            }
          });
          // find the next location of the selected card
          destinationCardTop =
            this.cardRef2.getBoundingClientRect().top +
            document.documentElement.scrollTop;
          destinationCardRight = this.cardRef2.getBoundingClientRect().right;
          //find the next location of the current 'next card'
          nextStartTop =
            this.cardRef5.getBoundingClientRect().top +
            document.documentElement.scrollTop;

          nextStartRight = this.cardRef5.getBoundingClientRect().right;
        }

        // get the ref to the selected card during this turn
        let ref;
        switch (cardRef) {
          case 0:
            ref = this.cardRef0;
            break;
          case 1:
            ref = this.cardRef1;
            break;
          case 3:
            ref = this.cardRef3;
            break;
          case 4:
            ref = this.cardRef4;
            break;
        }

        // return this.sendMove(prevState, newPlayer);
        // Calculate the starting position of the currently selected card
        const startingCardTop =
          ref.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          destinationCardTop;

        const startingCardRight =
          ref.getBoundingClientRect().right - destinationCardRight;
        //set the transition state so the currenlty selected card knows it's location and
        //set the animation flag to false so the moving cards stay put until they are forced
        // to thier new position in compnent did update
        prevState.transition.startAnim = false;
        prevState.transition.playerCard.startTop = startingCardTop;
        prevState.transition.playerCard.startRight = startingCardRight;
        prevState.transition.playerCard.card = prevState.selectedCard;

        prevState.transition.nextCard.startTop =
          nextStartTop -
          ref.getBoundingClientRect().top -
          document.documentElement.scrollTop;

        prevState.transition.nextCard.startRight =
          nextStartRight - ref.getBoundingClientRect().right;

        //adjust adnamtions for inverted board on redplayer side
        if (this.props.userColor === "Red") {
          prevState.transition.playerCard.startTop *= -1;
          prevState.transition.playerCard.startRight *= -1;
          prevState.transition.nextCard.startTop *= -1;
          prevState.transition.nextCard.startRight *= -1;
        }

        //send updated board to the backend
        this.match_channel.sendMove({ sendMove: { prevState, newPlayer } });
      }
    });
  };

  //update board after a move is made on the backend
  sendMove({ prevState, newPlayer }) {
    this.setState({
      board: [...prevState.board],
      currentPlayer: newPlayer,
      selectedCard: {},
      selectedPiece: {},
      validMoves: [],
      cards: [...prevState.cards],
      transition: prevState.transition,
    });
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

  componentDidUpdate() {
    //if the animation flag is false we reset it so cards will be animated to tbie rnew positions
    if (!this.state.transition.startAnim) {
      // update after a short delay so cards have a new position which will trigger the animation
      setTimeout(() => {
        this.setState({
          transition: {
            ...this.state.transition,
            startAnim: true,
          },
        });
      }, 500);
    }
  }

  //flip board for Red player
  isRed = () => {
    let gameClass = "columns is-mobile is-vcentered game";
    if (this.props.userColor === "Red") {
      gameClass += " flip-vertical";
    }
    return gameClass;
  };

  render() {
    return (
      <div className={this.isRed()}>
        <div className="column is-1 is-offset-1">
          <Card
            transition={this.state.transition}
            cardRef={(el) => (this.cardRef5 = el)}
            flip={true}
            card={this.findCardByLoc(5)}
            selectCard={this.selectCard}
          />
        </div>
        <div className="column is-4">
          <PlayerCards
            transition={this.state.transition}
            cardRefL={(el) => (this.cardRef3 = el)}
            cardRefR={(el) => (this.cardRef4 = el)}
            flip={true}
            card1={this.findCardByLoc(3)}
            card2={this.findCardByLoc(4)}
            selectCard={this.selectCard}
            selectedCard={this.state.selectedCard}
          />
          <Board
            userColor={this.props.userColor}
            transition={this.state.transition}
            board={this.state.board}
            handleClick={this.handleClick}
            validMoves={this.state.validMoves}
          />
          <PlayerCards
            transition={this.state.transition}
            cardRefL={(el) => (this.cardRef0 = el)}
            cardRefR={(el) => (this.cardRef1 = el)}
            card1={this.findCardByLoc(0)}
            card2={this.findCardByLoc(1)}
            selectCard={this.selectCard}
            selectedCard={this.state.selectedCard}
          />
        </div>
        <div className="column is-2 is-offset-2">
          <Card
            transition={this.state.transition}
            cardRef={(el) => (this.cardRef2 = el)}
            card={this.findCardByLoc(2)}
            selectCard={this.selectCard}
          />
        </div>
      </div>
    );
  }
}

export default Game;
