Rails.application.routes.draw do
  resources :sessions, only: %i[create]
  resources :registrations, only: %i[create]
  resources :users, only: %i[update destroy]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root "pages#index"
  match "*path", to: "pages#index", via: :all
  get "/404", to: "pages#not_found"
  # for /404 error page ^
  # mount ActionCable.server => '/cable'
end
