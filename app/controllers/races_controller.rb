class RacesController < ApplicationController

  def show
    @race = Race.find(params[:id])
    @runs = Run.where(race_id: @race.id)
    # @run = Run.find(5)
    # @runs = Run.where(race_id: 3)
    @runs_opponents = @runs.select { |run| run.user_id != current_user.id }
    # @runs_pos = Run.geocoded # returns users with coordinates

    @run = @runs.select { |run| run.user_id == current_user.id }.first
    @markers = {
      start_lat: @run.start_latitude,
      #start_lat: 44.9052793,
      start_lng: @run.start_longitude,
      #start_lng: -0.5057087,
      end_lat: @run.finish_latitude,
      end_lng: @run.finish_longitude
    }
  end

  def update
    @race = Race.find(params[:id])
    @challenge = @race.challenge

    if @race.pending? # si le bouton start est clique et que la race est a pending
      @race.update(progress: 1, start_at: DateTime.now) # alors on update a in_progress et on lui affecte le temps du départ
      @race.runs.first.update(start_latitude: params[:lat], start_longitude: params[:long])
      @race.runs.last.update(start_latitude: params[:lat], start_longitude: params[:long])

      redirect_to race_path(@race)
    elsif @race.in_progress? # si le bouton finish est clique et que la race est a in_progress
      @race.update(progress: 2) # on passe le statut a finished

      @race.runs.first.update(state: 1) # on dit que c'est le 1er user qui a gagne
      @race.runs.first.update(finished_at: DateTime.now) # on lui affecte le temps d'arrive
      w1 = @race.runs.first.user.wallet
      @race.runs.first.user.update(wallet: (w1 + @challenge.bet)) # on lui credite son compte le temps d'arrive

      @race.runs.last.update(state: 2) # on dit que c'est le 2eme user qui a perdu
      w2 = @race.runs.last.user.wallet
      @race.runs.last.user.update(wallet: (w2 - @challenge.bet)) # on lui debite son compte le temps d'arrive

      redirect_to race_path(@race)
    end
  end
end
