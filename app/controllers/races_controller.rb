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

  def update
    @race = Race.find(params[:id])
    if @race.pending? # si le bouton start est clique et que la race est a pending
      @race.update(progress: 1, start_at: DateTime.now) # alors on update a in_progress et on lui affecte le temps du départ
    elsif @race.in_progress? # si le bouton finish est clique et que la race est a in_progress
      @race.update(progress: 2) # on passe le statut a finished
      @race.runs.first.update(state: 1) # on dit que c'est le 1er user qui a gagne
      @race.runs.first.update(finished_at: DateTime.now) # on lui affecte le temps d'arrive
    end
  end
end
