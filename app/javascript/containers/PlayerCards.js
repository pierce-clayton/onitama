import React from "react";
import Card from "../components/Card";

const PlayerCards = ({ flip, card1, card2, selectCard, selectedCard }) => {
  return (
    <div className="columns is-mobile">
      <div className="column is-4 is-offset-6">
        <Card
          flip={flip}
          card={card1}
          selectCard={selectCard}
          selectedCard={selectedCard}
        />
      </div>
      <div className="column is-4">
        <Card
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
