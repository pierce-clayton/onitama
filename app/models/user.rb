class User < ApplicationRecord
  has_secure_password
  validates_presence_of :user_name
  validates_uniqueness_of :user_name
  
  has_many :user_games
  has_many :games, through: :user_games
  has_many :pieces
  has_many :cards
end
