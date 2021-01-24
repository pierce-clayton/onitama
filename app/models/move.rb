class Move < ApplicationRecord
  belongs_to :game
  serialize :board_state
end
