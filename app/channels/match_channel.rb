class MatchChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find_by(id: params[:game_id])
    stream_from "Match#{game.id}"
    # stream_from "some_channel"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
