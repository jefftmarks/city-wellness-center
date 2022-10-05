Rails.application.routes.draw do
  
  # resources :welcomes
  resources :appointments, only: [:create, :update, :destroy]
  resources :admins, only: [:update]
  resources :patients, only: [:index, :update, :destroy, :create]
  resources :doctors, only: [:index, :update, :destroy, :create]

	get "/appointments/date/:date", to: "appointments#by_date"

	post "/login/admin", to: "admins#login"
	post "/login/doctor", to: "doctors#login"
	post "/login/patient", to: "patients#login"
	
	get "/profile", to: "sessions#profile"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
