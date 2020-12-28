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
    @@match << @user[:id]
    if @@match.length == 2
      start(@@match[0], @@match[1])
    else
      ActionCable.server.broadcast 'GameChannel', { message: 'waiting for opponent' }
    end
  end

  def start(player1, player2)
    @game = Game.create(red_user_id: player1, blue_user_id: player2, state: 'start', winning_user_id: nil)
    ActionCable.server.broadcast 'GameChannel', { game: @game }
    ActionCable.server.broadcast "Match:#{@game.id}", { game: @game }
  end

  def build_board

  end

  def log_txt
    puts 'log txt'
  end

  def unsubscribed
    stop_all_streams
    # raise NotImplementedError
    # Any cleanup needed when channel is unsubscribed
  end
end
