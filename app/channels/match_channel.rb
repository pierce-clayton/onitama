class MatchChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:user_id])
    puts user.user_name
    puts params
    stream_for user if user
    # stream_from "some_channel"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
