class Game < ApplicationRecord
  belongs_to :red_user, class_name: 'User'
  belongs_to :blue_user, class_name: 'User'
  has_many :cards
  has_many :pieces
  has_many :moves

  def users
    [red_user, blue_user]
  end
end
