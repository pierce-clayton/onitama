import React from "react";
import cobra from "images/cobra.png";

const Card = ({ flip, card, selectCard }) => {
  // prevent error for empty card slot
  if (!card) return null;

  const imgClass = flip ? "flip-vertical" : "";
  return (
    <div className="game-card" onClick={() => selectCard(card)}>
      <figure className="image is-4by3">
        <img src={card.name} alt={card.name} className={imgClass} />
      </figure>
    </div>
  );
};

export default Card;
