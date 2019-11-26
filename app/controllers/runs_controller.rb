class RunsController < ApplicationController
  def create
    @race = Race.new(challenge_id: params[:challenge_id])
    @race.save

    @run = Run.new
    @run.race_id = @race.id
    @run.user_id = current_user.id
    @run.save

    redirect_to race_path(@race)
  end
end
