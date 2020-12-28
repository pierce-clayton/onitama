import React from "react";
const NewGame = () => {
  return (
    <div>
      <div className="has-text-centered">
        <h2 className="title is-2 ">Game Rules:</h2>
        <p className="subtitle is-6 ">
          1. On your turn, examine and choose one of the two Move cards in front
          of you. Then, move one of your pawns(student or sensei) as shown on
          that card. (The square grid will show you the way.)
        </p>
        <p className="subtitle is-6">
          You can never make a move that would cause a pawn to move off the
          board or move onto the same square as one of your own pawns.
        </p>
        <p className="subtitle is-6">
          If your pawn moves onto a square that is occupied by one of your
          opponent's pawns, the opponent's pawn is "captured" and removed from
          the game.
          <strong>
            You must actually land on the piece to capture it-- moving over or
            through a square occopied by an opponent's piece does not capture
            it.
          </strong>
        </p>
        <p className="subtitle is-6 p-2">
          2. Take the Move card you just used, and place it to the left side of
          the playmat, rotating it 180 degrees to face your opponent. Then take
          the card that is on the right side of your playmat and add it to your
          hand. You may use that card starting next turn, as one of the two Move
          cards you can choose from .
        </p>
      </div>
      {/* <div className="buttons is-centered">
        <button className="button is-primary"> NEW GAME</button>
      </div> */}
    </div>
  );
};

export default NewGame;
