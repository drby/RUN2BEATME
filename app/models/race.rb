class Race < ApplicationRecord
  has_many :runs
  belongs_to :challenge
  has_many :users, through: :runs
end
