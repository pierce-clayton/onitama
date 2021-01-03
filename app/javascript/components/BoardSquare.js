import React from "react";

const isValid = (row, col, validMoves) => {
  let squareClass = "tile is-flex is-horizontal-center ";
  squareClass += validMoves.find((move) => move[0] === col && move[1] === row)
    ? "valid"
    : "invalid";
  return squareClass;
};

const BoardSquare = ({
  piece,
  handleClick,
  row,
  col,
  validMoves,
  userColor,
}) => {
  const squareClass = isValid(row, col, validMoves);
  const pieceClass =
    userColor === "Red" ? "unflip-vertical is-centered" : "is-centered";
  let piece_image;
  switch (piece) {
    case "Rs1":
    case "Rs2":
    case "Rs3":
    case "Rs3":
    case "Rs4":
      piece_image = "gold_pawn";
      break;
    case "Bs1":
    case "Bs2":
    case "Bs3":
    case "Bs3":
    case "Bs4":
      piece_image = "black_pawn";
      break;
    case "Rm":
      piece_image = "gold_queen";
      break;
    case "Bm":
      piece_image = "black_queen";
      break;
    default:
      piece_image = null;
  }

  const isTemple = (row === 0 && col === 2) || (row === 4 && col === 2);
  const templeClass = isTemple && row === 4 ? "flip-vertical" : "";

  return (
    <div
      className={squareClass}
      data-row={row}
      data-col={col}
      data-id={piece}
      onClick={handleClick}
    >
      <figure className="image board-square is-square">
        {isTemple ? (
          <img src={require("images/gate.png")} className={templeClass} />
        ) : null}
        {piece_image ? (
          <img
            src={require(`images/${piece_image}.png`)}
            className={pieceClass}
            alt={piece_image}
          />
        ) : null}
      </figure>
    </div>
  );
};

export default BoardSquare;
