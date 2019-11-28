class RacesController < ApplicationController

  def index

  end

  def show
    @race = Race.find(params[:id])
    @runs = Run.where(race_id: @race.id)
    @runs = @runs.select { |run| run.user_id != current_user.id }

    @runs_pos = Run.geocoded # returns users with coordinates

    @markers = @runs_pos.map do |run|
      {
        start_lat: run.start_latitude,
        start_lng: run.start_longitude,
        end_lat: run.finish_latitude,
        end_lng: run.finish_latitude
      }
    end
  end
end
