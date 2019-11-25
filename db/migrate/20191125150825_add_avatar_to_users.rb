class AddAvatarToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar, :string, default: "assets/images/default_avatar.jpg"
  end
end
