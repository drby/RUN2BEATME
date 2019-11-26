class AddAddressToRuns < ActiveRecord::Migration[5.2]
  def change
    add_column :runs, :address, :string
  end
end
