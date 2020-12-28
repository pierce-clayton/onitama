class Move < ApplicationRecord
  belongs_to :game
  belongs_to :card
  belongs_to :piece
end
