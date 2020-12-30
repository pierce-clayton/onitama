class GameChannel < ApplicationCable::Channel
  @@match = []
  
  def subscribed
    stream_from 'GameChannel'
    # puts 'game_channel subscribed'
    # puts params
    # puts '*' * 30
  end

  def joined_game(user)
    @@match.length == 2 ? (@@match = []) : nil
    @user = User.find(user['id'])
    @@match << @user unless @@match.include?(@user)
    if @@match.length == 2
      start(@@match[0], @@match[1])
    else
      ActionCable.server.broadcast "Match#{@user[:id]}", { message: 'waiting for opponent' }
    end
  end

  def start(player1, player2)
    game = Game.create(red_user_id: player1[:id], blue_user_id: player2[:id], state: 'start', winning_user_id: nil)
    ActionCable.server.broadcast 'GameChannel', { game: game }
    ActionCable.server.broadcast "Match#{player1[:id]}", { message: 'Match started Red Player'}
    ActionCable.server.broadcast "Match#{player2[:id]}", { message: 'Match started Blue Player'}
  end

  def build_board(game)
    
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
