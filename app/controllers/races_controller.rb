class RacesController < ApplicationController
  def show
    @race = Race.find(params[:id])
    @runs = Run.where(race_id: @race.id)
    @runs = @runs.select {|run| run.user_id != current_user.id }
  end
end
