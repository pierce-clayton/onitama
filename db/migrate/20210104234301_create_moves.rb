class CreateMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :moves do |t|
      t.references :game, null: false, foreign_key: true
      t.string :board_state

      t.timestamps
    end
  end
end
