class RunsController < ApplicationController
  def index
    @runs = Run.where(user_id: current_user)
    @runs = @runs.where("state != 0")
  end

  def create
    # on cherche les races qui sont deja crees avec ce challenge
    @races = Race.where(challenge_id: params[:challenge_id])
    # on cherche les races qui sont deja crees avec ce challenge et deja pleines
    @races_full = @races.select { |race| race.users.count == 2 }
    # on cherche les races deja crees avec ce challenge et pas deja pleines
    @races_not_full = @races.select { |race| race.users.count < 2 }
    # on determine la premiere race qui n'est pas deja pleine
    @race = @races_not_full.first
    # si aucune race deja creee
    # ou si race deja cree mais deja remplie en nb de participants
    # alors on doit creer une nouvelle race
    if @races == [] || @races == @races_full
      @race = Race.new(challenge_id: params[:challenge_id])
      @race.save
      # on cree egalement le run
      @run = Run.new
      @run.race_id = @race.id
      @run.user_id = current_user.id
      @run.save

    # sinon on cree le run et on l'ajoute au premier race non plein
    # mais seulement si le current_user n'est pas deja inscrit a ce run

    elsif current_user.runs.select { |run| run.race_id == @race.id } == []
      @run = Run.new
      @run.race_id = @race.id
      @run.user_id = current_user.id
      @run.save
    end
    redirect_to race_path(@race)
  end
end
