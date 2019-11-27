class RacesController < ApplicationController
  def index
    @users = User.geocoded # returns users with coordinates

    @users = @users.map do |user|
      {
        lat: user.latitude,
        lng: user.longitude
      }
    end
  end

  def show
    @race = Race.find(params[:id])
    @runs = Run.where(race_id: @race.id)
    @runs = @runs.select {|run| run.user_id != current_user.id }
  end
end
