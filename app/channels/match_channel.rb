class MatchChannel < ApplicationCable::Channel
  def subscribed
    user = User.find_by(id: params[:user_id])
    stream_from "Match#{user[:user_name]}"
    # stream_from "some_channel"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end

  def create
    
  end

  def update
    
  end

  def destroy
    
  end

end
