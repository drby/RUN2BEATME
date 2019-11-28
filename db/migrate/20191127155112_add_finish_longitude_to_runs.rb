class AddFinishLongitudeToRuns < ActiveRecord::Migration[5.2]
  def change
    add_column :runs, :finish_longitude, :float
  end
end
