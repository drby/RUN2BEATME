class RacesController < ApplicationController

  def index

  end

  def show
    @race = Race.find(params[:id])
    # @runs = Run.where(race_id: @race.id)
    # @runs = @runs.select {|run| run.user_id != current_user.id }

    @runs = Run.geocoded # returns users with coordinates

    @markers = @runs.map do |run|
      {
        lat: run.start_latitude,
        lng: run.start_longitude
      }
    end
  end
end
