class Challenge < ApplicationRecord
  has_many :races
  enum category: [ :classic_run, :battle_royal ]
end
