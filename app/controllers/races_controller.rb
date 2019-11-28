class RacesController < ApplicationController

  def index

  end

  def update
    raise
  end

  def show
    @race = Race.find(params[:id])
    # @runs = Run.where(race_id: @race.id)
    @run = Run.find(5)
    @runs = Run.where(race_id: 3)
    # @runs = @runs.select { |run| run.user_id != current_user.id }
    # @runs_pos = Run.geocoded # returns users with coordinates

    @markers = {
        start_lat: @run.start_latitude,
        start_lng: @run.start_longitude,
        end_lat: @run.finish_latitude,
        end_lng: @run.finish_longitude
      }

  end
end
