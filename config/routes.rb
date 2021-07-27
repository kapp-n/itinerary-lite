Rails.application.routes.draw do
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  resources :categories, only: [:index, :show, :create] do
    resources :trips 
  end 
  post "/categories/add", to: "categories#add_category"
  
end
