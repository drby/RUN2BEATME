class Race < ApplicationRecord
  belongs_to :challenge
  has_many :users, through: :runs
  has_many :runs
end
