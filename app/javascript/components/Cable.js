import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ games, handleReceivedMove }) => {
  return (
    <Fragment>
      {games.map(game => {
        return (
          <ActionCable
            key={game.id}  
            channel={{ channel: 'MovesChannel', game: game.id }}
            onReceived={handleReceivedMove}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;