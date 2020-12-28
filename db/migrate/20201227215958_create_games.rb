class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.bigint :red_user_id
      t.bigint :blue_user_id
      t.string :state
      t.bigint :winning_user_id

      t.timestamps
    end
  end
end
