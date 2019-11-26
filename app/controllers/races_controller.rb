class RacesController < ApplicationController
  def show
    @race = Race.find(params[:id])
    @runs = Run.where(race_id: @race)
  end
end
