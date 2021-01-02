class MatchChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game_id])
    stream_for @game if @game
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def sendSelectedCard(card)
    broadcast_to @game, card
  end

  def sendValidMoves(moves)
    broadcast_to @game, moves
  end

  def sendMove(move)
    broadcast_to @game, move
  end
end
