class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all.sort_by { |challenge| [challenge.distance, challenge.bet] }

  end
end
