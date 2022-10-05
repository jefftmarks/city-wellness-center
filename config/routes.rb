Rails.application.routes.draw do
  
  # resources :welcomes
  resources :appointments, only: [:create, :update, :destroy]
  resources :admins, only: [:update]
  resources :patients, only: [:index, :show, :update, :destroy, :create]
  resources :doctors, only: [:index, :update, :destroy, :create]

	get "/appointments/date/:date", to: "appointments#by_date"
	get "/appointments/doctor/:doctor_id/date/:date", to: "appointments#by_doctor"
	get "/appointments/patient/:patient_id", to: "appointments#by_patient"

	get "/patients/doctor/:doctor_id", to: "patients#by_doctor"

	patch "/patients/status/:id", to: "patients#update_status"

	post "/login/admin", to: "admins#login"
	post "/login/doctor", to: "doctors#login"
	post "/login/patient", to: "patients#login"
	
	get "/profile", to: "sessions#profile"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
