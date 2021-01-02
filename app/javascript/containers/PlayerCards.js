import React from "react";
import Card from "../components/Card";

const PlayerCards = ({
  flip,
  card1,
  card2,
  selectCard,
  selectedCard,
  cardRefL,
  cardRefR,
  transition,
}) => {
  return (
    <div className="columns is-mobile">
      <div className="column is-4 is-offset-6">
        <Card
          transition={transition}
          cardRef={cardRefL}
          flip={flip}
          card={card1}
          selectCard={selectCard}
          selectedCard={selectedCard}
        />
      </div>
      <div className="column is-4">
        <Card
          transition={transition}
          cardRef={cardRefR}
          flip={flip}
          card={card2}
          selectCard={selectCard}
          selectedCard={selectedCard}
        />
      </div>
    </div>
  );
};

export default PlayerCards;
