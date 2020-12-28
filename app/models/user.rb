class User < ApplicationRecord
  has_many :user_games
  has_many :games, through: :user_games
  has_many :pieces
  has_many :cards
end
