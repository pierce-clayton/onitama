import React from "react";

const isValid = (row, col, validMoves) => {
  let squareClass = "tile is-child ";
  squareClass += validMoves.find((move) => move[0] === col && move[1] === row)
    ? "valid"
    : "";
  return squareClass;
};

const BoardSquare = ({ piece, selectPiece, row, col, validMoves }) => {
  const squareClass = isValid(row, col, validMoves);
  return (
    <div
      className={squareClass}
      data-row={row}
      data-col={col}
      onClick={selectPiece}
    >
      <figure className="image is-square"></figure>
      <p>{piece}</p>
    </div>
  );
};

export default BoardSquare;
