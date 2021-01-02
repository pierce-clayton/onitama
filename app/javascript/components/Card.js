import React from "react";

const Card = ({
  flip,
  card,
  selectCard,
  selectedCard = null,
  cardRef,
  transition,
}) => {
  // prevent error for empty card slot
  //if (!card) return null;
  let startTop = 0;
  let startRight = 0;
  let startOrientation = 0;
  let animClassX = "";
  let animClassY = "";
  let animClassR = "";

  const divClass = selectedCard === card ? "game-card selected" : "game-card";

  let imgClass = flip ? " card-image flip-vertical" : "card-image";
  if (transition.playerCard.card === card) {
    startTop = transition.playerCard.startTop;
    startRight = transition.playerCard.startRight;
    startOrientation = transition.playerCard.startOrientation;
    imgClass = "card-image";
    if (transition.startAnim) {
      animClassX = "player-force-move-x";
      animClassY = "player-force-move-y";
      animClassR = "player-force-move-r";
    }
  } else if (transition.nextCard.card === card) {
    startTop = transition.nextCard.startTop;
    startRight = transition.nextCard.startRight;
    // startOrientation = transition.nextCard.startOrientation;
    if (transition.startAnim) {
      animClassX = "next-force-move-x";
      animClassY = "next-force-move-y";
    }
  }
  startOrientation = 0;
  return (
    <div
      className={`${divClass} ${animClassX}`}
      ref={cardRef}
      onClick={(e) => selectCard(e, card)}
      style={{
        transform: `translate(${startRight}px)`,
      }}
    >
      <div
        className={`${divClass} ${animClassY}`}
        style={{
          transform: `translateY(${startTop}px)`,
        }}
      >
        <figure className={`image game-card is-4by3`}>
          {card ? (
            <img
              src={require(`images/${card.name}.jpg`)}
              alt={card.name}
              className={`${imgClass} ${animClassR}`}
              style={{
                transform: `rotate(${startOrientation}turn)`,
              }}
            />
          ) : null}
        </figure>
      </div>
    </div>
  );
};

export default Card;
