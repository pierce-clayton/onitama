import React from "react";

const Card = ({ flip, card, selectCard, selectedCard = null }) => {
  // prevent error for empty card slot
  if (!card) return null;

  const divClass = selectedCard === card ? "game-card selected" : "game-card";

  const imgClass = flip ? "flip-vertical" : "";
  return (
    <div className={divClass} onClick={() => selectCard(card)}>
      <figure className="image game-card is-4by3">
        <img
          src={require(`images/${card.name}.png`)}
          alt={card.name}
          className={imgClass}
        />
      </figure>
    </div>
  );
};

export default Card;
