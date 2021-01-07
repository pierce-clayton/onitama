class User < ApplicationRecord
  has_secure_password
  validates_presence_of :user_name
  validates_uniqueness_of :user_name

  has_many :blue_games, class_name: 'Game', foreign_key: 'blue_user'
  has_many :red_games, class_name: 'Game', foreign_key: 'red_user'
  has_many :won_games, class_name: 'Game', foreign_key: 'winning_user'
  

  def games
    [blue_games.to_a, red_games.to_a].flatten.sort
  end
end
