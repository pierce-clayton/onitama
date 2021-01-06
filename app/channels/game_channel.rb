class GameChannel < ApplicationCable::Channel
  @@match = []

  def subscribed
    stream_from "GameChannel"
    # puts 'game_channel subscribed'
    # puts params
    # puts '*' * 30
  end

  def joined_game(user)
    # need to handle when players have an active game
    @user = User.find(user["id"])
    # last_game = @user.games.last
    # if last_game && last_game.winning_user_id.nil?
    #   ActionCable.server.broadcast 'GameChannel', game: last_game
    # else
    @@match.length == 2 ? (@@match = []) : nil
    @@match << @user unless @@match.include?(@user)
    if @@match.length == 2
      start(@@match[0], @@match[1])
    else
      puts "Waiting for opponent..."
    end
    # end
  end

  def start(player1, player2)
    game = Game.create!(red_user: player1, blue_user: player2, state: "start", winning_user_id: nil)
    ActionCable.server.broadcast "GameChannel", game: game
  end

  def unsubscribed
    # raise NotImplementedError
    # Any cleanup needed when channel is unsubscribed
  end
end
