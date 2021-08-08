Rails.application.routes.draw do
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  get "/categories/form", to: "categories#all_categories"
  resources :categories, except: [:update] do
    resources :trips
  end
end
