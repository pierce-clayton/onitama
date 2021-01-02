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
    broadcast_to @game, card: card['newCard']
  end

  def sendValidMoves(moves)
    broadcast_to @game, moves['newMoves']
  end

  def sendMove(board)
    puts '*' * 30
    @game.moves.create!(board: board['sendMove']['prevState']['board'])
    puts @game.moves.last
    broadcast_to @game, board
  end
end
