class CreateMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :moves do |t|
      t.integer :pos_x
      t.integer :pos_y
      t.integer :pos_card
      t.references :game, null: false, foreign_key: true
      t.references :card, null: false, foreign_key: true
      t.references :piece, null: false, foreign_key: true

      t.timestamps
    end
  end
end
