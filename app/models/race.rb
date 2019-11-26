class Race < ApplicationRecord
  has_many :runs
  belongs_to :challenge
  has_many :users, through: :runs
  enum progress: [ :pending, :in_progress, :finished ]
end
