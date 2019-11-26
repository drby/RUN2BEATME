class Run < ApplicationRecord
  belongs_to :user
  belongs_to :race
  enum state: [ :pending, :won, :lost ]
end
