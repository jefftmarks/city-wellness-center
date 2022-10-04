Rails.application.routes.draw do
  
  # resources :welcomes
  resources :appointments, only: [:create, :update, :destroy]
  resources :admins, only: [:update]
  resources :patients, only: [:index]
  resources :doctors, only: [:index]

	get "/appointments/date/:date", to: "appointments#by_date"

	post "/login/admin", to: "admins#login"
	get "/profile", to: "sessions#profile"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
