class RenameRunLatitudeToFullStartLatitude < ActiveRecord::Migration[5.2]
  def change
    rename_column :runs, :latitude, :start_latitude
  end
end
