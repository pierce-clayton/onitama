class MatchChannel < ApplicationCable::Channel
  def subscribed
    puts params
    user = User.find(params[:user_id])
    stream_for user
    # stream_from "some_channel"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
