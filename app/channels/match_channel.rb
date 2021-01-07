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
    broadcast_to @game, card: card["newCard"]
  end

  def sendValidMoves(moves)
    broadcast_to @game, moves["newMoves"]
  end

  def sendMove(board)
    @game.moves.create!(board_state: board)
    broadcast_to @game, board
  end

  def sendShuffle(cards)
    broadcast_to @game, shuffle: cards
  end

  def getLastMove
    puts "*" * 30
    broadcast_to @game, @game.moves.last.board_state
  end

  def wonGame(user)
    winner = User.find_by(id: user.id)
    @game.winning_user = winner
    broadcast_to @game, winner: winner
  end
end
