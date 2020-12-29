import React from "react";

const isValid = (row, col, validMoves) => {
  let squareClass = "tile ";
  squareClass += validMoves.find((move) => move[0] === col && move[1] === row)
    ? "valid"
    : "invalid";
  return squareClass;
};

const BoardSquare = ({ piece, handleClick, row, col, validMoves }) => {
  const squareClass = isValid(row, col, validMoves);
  return (
    <div
      className={squareClass}
      data-row={row}
      data-col={col}
      onClick={handleClick}
    >
      <figure className="image board-square is-square"></figure>
      <p>{piece}</p>
    </div>
  );
};

export default BoardSquare;
