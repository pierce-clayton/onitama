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
  let startTop;
  let startRight;
  let animClassX;
  let animClassY;
  let animClassR;

  const divClass = selectedCard === card ? "game-card selected" : "game-card";

  if (transition.playerCard.card === card) {
    startTop = transition.playerCard.startTop;
    startRight = transition.playerCard.startRight;
    if (transition.startAnim) {
      animClassX = "player-force-move-x";
      animClassY = "player-force-move-y";
      animClassR = "player-force-move-r";
    }
  } else if (transition.nextCard.card === card) {
    startTop = transition.nextCard.startTop;
    startRight = transition.nextCard.startRight;
    if (transition.startAnim) {
      animClassX = "next-force-move-x";
      animClassY = "next-force-move-y";
      animClassR = "next-force-move-r";
    }
  } else {
    startTop = 0;
    startRight = 0;
  }

  const imgClass = flip ? " card-image flip-vertical" : "card-image";
  return (
    <div
      // className={`${animClass}`}
      style={{
        transition: "none",
      }}
    >
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
          <figure className={`image game-card is-4by3 ${animClassR}`}>
            {card ? (
              <img
                src={require(`images/${card.name}.jpg`)}
                alt={card.name}
                className={imgClass}
              />
            ) : null}
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Card;
