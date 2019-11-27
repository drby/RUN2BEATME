class Run < ApplicationRecord
  belongs_to :user
  belongs_to :race
  enum state: [ :pending, :won, :lost ]

  reverse_geocoded_by :start_latitude, :start_longitude
  after_validation :geocode, if: :will_save_change_to_address?
end
