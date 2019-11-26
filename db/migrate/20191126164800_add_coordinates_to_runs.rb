class AddCoordinatesToRuns < ActiveRecord::Migration[5.2]
  def change
    add_column :runs, :latitude, :float
    add_column :runs, :longitude, :float
  end
end
