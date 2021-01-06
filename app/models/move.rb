class Move < ApplicationRecord
  belongs_to :game
  serializes :board_state
end
