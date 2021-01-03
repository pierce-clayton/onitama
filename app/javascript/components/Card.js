import React from "react";

const Card = ({
  flip,
  card,
  selectCard,
  selectedCard = null,
  cardRef,
  transition,
}) => {
  //set default animation values for cards so that they are simply forced to thier current locations
  let startTop = 0;
  let startRight = 0;
  // set default animation classes that will be switched on based on teh state from Game
  let animClassX = "";
  let animClassY = "";
  let animClassR = "";
  // add shadow to the selected card
  let divClass;
  if (card && selectedCard?.name === card?.name) {
    divClass = "game-card selected";
  } else {
    divClass = "game-card";
  }
  // invert cards facing the opposing player
  let imgClass = flip ? "card-image flip-vertical" : "card-image";

  // if the current card is a moving card from a palyers had set it's location to it's previous lcoation
  if (card && transition.playerCard.card?.name === card.name) {
    startTop = transition.playerCard.startTop;
    startRight = transition.playerCard.startRight;

    // keep the opponents card that will becme the next card from flipping over until the animation
    //plays
    imgClass = card.location === 2 ? "card-image flip-vertical" : "card-image";
    // if the animation flag is true apply classes that will froce cards to thier new locations.
    if (transition.startAnim) {
      animClassX = "player-force-move-x";
      animClassY = "player-force-move-y";
      animClassR = "player-force-move-r";
      if (card.location === 2) animClassR = "top-player-force-anim";
    }
    // if the card is the 'next card' from the previous turn apply classes that will set it's location to it's previous location.
  } else if (card && transition.nextCard.card?.name === card.name) {
    startTop = transition.nextCard.startTop;
    startRight = transition.nextCard.startRight;
    // if animation flag is true, animate previous 'next card' into it's new position
    if (transition.startAnim) {
      animClassX = "next-force-move-x";
      animClassY = "next-force-move-y";
    }
  }

  return (
    <div
      className={`${divClass} ${animClassX}`}
      ref={cardRef}
      onClick={() => selectCard(card)}
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
            />
          ) : null}
        </figure>
      </div>
    </div>
  );
};

export default Card;
