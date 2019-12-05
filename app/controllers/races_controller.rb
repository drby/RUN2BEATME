class RacesController < ApplicationController
  def show
    @race = Race.find(params[:id])
    @runs = Run.where(race_id: @race.id)
    # @run = Run.find(5)
    # @runs = Run.where(race_id: 3)
    @runs_opponents = @runs.select { |run| run.user_id != current_user.id }
    # @runs_pos = Run.geocoded # returns users with coordinates

    @run = @runs.select { |run| run.user_id == current_user.id }.first
    direction = ["N","S","E","W"].sample
    case direction
    when "N"
      teta = 90
    when "E"
      teta = 0
    when "S"
      teta = 270
    when "W"
      teta = 180
    end
    distance = @race.challenge.distance / 100
    # @run.update(finish_lon )

    @markers = {
      start_lat: @run.start_latitude,
      start_lng: @run.start_longitude,
      end_lat: distance * 360 / (2 * 6371 * Math::PI) * Math.sin(teta * Math::PI / 180) + @run.start_latitude.to_f,
      end_lng: distance * 360 / (2 * 6371 * Math::PI) * Math.cos(teta * Math::PI / 180) + @run.start_longitude.to_f
    }
  end

  def update
    @race = Race.find(params[:id])
    @challenge = @race.challenge
    @runs = Run.where(race_id: @race.id)

    if @race.pending? # si le bouton start est clique et que la race démarre
      @race.update(progress: 1, start_at: DateTime.now) # alors on update a in_progress et on lui affecte le temps du départ
      @race.runs.find_by(user: current_user).update(start_latitude: params[:lat], start_longitude: params[:long])
      @race.runs.where.not(user: current_user).first.update(start_latitude: params[:lat], start_longitude: params[:long])

    elsif @race.in_progress? && params[:finished] == "true" # si le bouton finish est clique et que la race est a in_progress
      @race.update(progress: 2) # on passe le statut a finished

      @race.runs.find_by(user: current_user).update(state: 1) # on dit que c'est le 1er user qui a gagne
      @race.runs.find_by(user: current_user).update(finished_at: DateTime.now) # on lui affecte le temps d'arrive
      w1 = current_user.wallet
      current_user.update(wallet: (w1 + @challenge.bet)) # on lui credite son compte le temps d'arrive

      @race.runs.where.not(user: current_user).first.update(state: 2) # on dit que c'est le 2eme user qui a perdu
      @race.runs.where.not(user: current_user).first.update(finished_at: DateTime.now) # on lui affecte le temps d'arrive
      w2 = @race.runs.where.not(user: current_user).first.user.wallet
      @race.runs.where.not(user: current_user).first.user.update(wallet: (w2 - @challenge.bet)) # on lui debite son compte le temps d'arrive
      ActionCable.server.broadcast("race_#{@race.id}", {
        race_partial: ApplicationController.renderer.render(
          partial: "races/finished",
          locals: {race: @race, runs: @runs, winner: current_user }
          )
        })
    end

    respond_to do |format|
      # format.html { redirect_to race_path(@race) }
      format.js # <-- will render `app/views/races/update.js.erb`
    end

  end
end
