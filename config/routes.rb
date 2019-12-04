Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :challenges, only: [:index] do
    resources :runs, only: [:create]
  end
  resources :races, only: [:index, :show, :update]
  resources :runs, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => "/cable"
end
