Rails.application.routes.draw do
  resources :sessions, only: %i[create]
  resources :registrations, only: %i[create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  root 'pages#index'
  match '*path', to: 'pages#index', via: :all
  mount ActionCable.server => '/cable'
end
