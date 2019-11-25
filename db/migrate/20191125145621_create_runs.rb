class CreateRuns < ActiveRecord::Migration[5.2]
  def change
    create_table :runs do |t|
      t.references :user, foreign_key: true
      t.references :race, foreign_key: true
      t.integer :state, default: 0
      t.datetime :finished_at

      t.timestamps
    end
  end
end
