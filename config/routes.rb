Rails.application.routes.draw do
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/categories/add", to: "categories#add_category"
  get "/categories/form", to: "categories#all_categories"
  resources :categories, only: [:index, :show, :create] do
    resources :trips 
  end 
  
end
