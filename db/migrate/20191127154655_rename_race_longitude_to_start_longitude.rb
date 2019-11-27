class RenameRaceLongitudeToStartLongitude < ActiveRecord::Migration[5.2]
  def change
    rename_column :runs, :longitude, :start_longitude
  end
end
