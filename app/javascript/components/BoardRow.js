import React from "react";
import BoardSquare from "./BoardSquare";

const BoardRow = ({ pieces, selectPiece, row, validMoves }) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile">
        {pieces.map((piece, i) => (
          <BoardSquare
            key={i}
            piece={piece}
            selectPiece={selectPiece}
            row={row}
            col={i}
            validMoves={validMoves}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardRow;
