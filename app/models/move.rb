class Move < ApplicationRecord
  serialize :board, Array
  belongs_to :game
end
