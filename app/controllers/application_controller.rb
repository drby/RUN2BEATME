class ApplicationController < ActionController::Base

  layout :layout_by_resource

  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || challenges_path
  end


  private

  def layout_by_resource
    if devise_controller?
      "home_layout"
    else
      "application"
    end
  end

end

