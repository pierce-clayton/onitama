Rails.application.routes.draw do
  resources :users
  root 'pages#index'
  match '*path', to: 'pages#index', via: :all
  mount ActionCable.server => '/cable'
end
