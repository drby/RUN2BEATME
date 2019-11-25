class CreateChallenges < ActiveRecord::Migration[5.2]
  def change
    create_table :challenges do |t|
      t.integer :category, default: 0
      t.integer :distance
      t.integer :bet

      t.timestamps
    end
  end
end
