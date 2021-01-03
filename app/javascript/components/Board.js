import React from "react";
import BoardRow from "./BoardRow";

const Board = ({ board, handleClick, validMoves, userColor }) => {
  return (
    <div className="columns is-mobile">
      <div className="column board is-12 is-offset-4">
        {board.map((rowPieces, i) => (
          <BoardRow
            key={i}
            pieces={rowPieces}
            row={i}
            handleClick={handleClick}
            validMoves={validMoves}
            userColor={userColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
