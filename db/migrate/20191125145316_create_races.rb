class CreateRaces < ActiveRecord::Migration[5.2]
  def change
    create_table :races do |t|
      t.references :challenge, foreign_key: true
      t.datetime :start_at
      t.integer :progress, default: 0

      t.timestamps
    end
  end
end
