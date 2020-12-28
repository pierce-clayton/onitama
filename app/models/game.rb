class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games
  has_many :cards
  has_many :pieces
  has_many :moves

end
