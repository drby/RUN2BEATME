class AddFinishLatitudeToRuns < ActiveRecord::Migration[5.2]
  def change
    add_column :runs, :finish_latitude, :float
  end
end
