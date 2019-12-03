class ApplicationController < ActionController::Base

  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?

  layout :layout_by_resource


  def after_sign_in_path_for(resource)
    stored_location_for(resource) || challenges_path
  end


  def configure_permitted_parameters
    update_attrs = [:wallet, :email, :password]
    devise_parameter_sanitizer.permit :account_update, keys: update_attrs
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

