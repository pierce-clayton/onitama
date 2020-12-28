import React from "react";
import Card from "../components/Card";

const PlayerCards = ({ flip, card1, card2, selectCard }) => {
  return (
    <div className="columns">
      <div className="column is-6 is-offset-6">
        <Card flip={flip} card={card1} selectCard={selectCard} />
      </div>
      <div className="column is-6">
        <Card flip={flip} card={card2} selectCard={selectCard} />
      </div>
    </div>
  );
};

export default PlayerCards;
