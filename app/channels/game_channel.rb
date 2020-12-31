class GameChannel < ApplicationCable::Channel
  @@match = []
  
  def subscribed
    stream_from 'GameChannel'
    # puts 'game_channel subscribed'
    # puts params
    # puts '*' * 30
  end

  def joined_game(user)


    # need to handle when players have an active game
    @@match.length == 2 ? (@@match = []) : nil
    @user = User.find(user['id'])
    last_game = @user.games.last
    if last_game.winning_user_id.nil?
      ActionCable.server.broadcast 'GameChannel', last_game
      MatchChannel.broadcast_to last_game.red_user, message: 're-joining game'
      MatchChannel.broadcast_to last_game.blue_user, message: 're-joining game'
      puts '*' * 30
    else
      @@match << @user unless @@match.include?(@user)
      if @@match.length == 2
        start(@@match[0], @@match[1])
      else
        puts '*' * 30
        MatchChannel.broadcast_to @user, {message: 'waiting'}
      end
    end
  end

  def start(player1, player2)
    game = Game.create!(red_user: player1, blue_user: player2, state: 'start', winning_user_id: nil)
    ActionCable.server.broadcast 'GameChannel', game: game, except: %i[created_at updated_at]
    MatchChannel.broadcast_to player1, { message: 'Match started Red Player' }
    MatchChannel.broadcast_to player2, { message: 'Match started Blue Player' }
  end


  def unsubscribed
    stop_all_streams
    # raise NotImplementedError
    # Any cleanup needed when channel is unsubscribed
  end
end
