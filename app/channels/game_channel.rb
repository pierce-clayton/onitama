class GameChannel < ApplicationCable::Channel
  @@match = []
  def subscribed
    stream_from 'GameChannel'
    # puts 'game_channel subscribed'
    # puts params
    # puts '*' * 30
  end

  def joined_game(data)
    @@match.length == 2 ? (@@match = []) : nil
    @user = User.find_or_create_by(user_name: data["players"])
    @@match << @user[:user_name]
    # puts 'game_channel joined_game'
    # puts @@match
    # puts '*' * 30
    ActionCable.server.broadcast 'GameChannel', @@match
  end

  def log_txt
    puts 'log txt'
  end

  def unsubscribed
    # raise NotImplementedError
    # Any cleanup needed when channel is unsubscribed
  end
end
