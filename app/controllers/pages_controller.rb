class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]
  layout "home_layout", only: [:home]
  def home
  end
end
