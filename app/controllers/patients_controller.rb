class PatientsController < ApplicationController
	before_action :set_patients, only: [:show, :update, :destroy, :all_appointments, :update_status]

  def index
    patients = Patient.all.order(:last_name)
    render json: patients
  end

  def show
    render json: @patient, status: :ok
  end

	def login
		user = Patient.find_by(email: params[:email])
		if user&.authenticate(params[:password])
			token = generate_token({user_id: user.id, role: "patient"})
			render json: { user: user, token: token, role: "patient" }, status: :created
		else
			render json: { error: ["Invalid username or password"] }, status: :unauthorized
		end
	end

	def by_doctor
		doctor = Doctor.find(params[:doctor_id])
		patients = doctor.patients.order(:last_name).distinct
		if patients
			render json: patients, status: :ok
		else
			render json: { error: "Patients not found" }, status: :not_found
		end
	end

  def create
    patient = Patient.create!(patient_params)
    render json: patient, status: :created
  end

	def update
    @patient.update!(patient_params)
    render json: @patient, status: :ok
  end

	def update_status
    @patient.update!(patient_params)
    render json: @patient, status: :ok
  end

  def destroy
    @patient.destroy
    render json: @patient, status: :ok
  end

  private

  def patient_params
    params.permit(:id, :first_name, :last_name, :email, :password, :password_confirmation, :phone, :status)
  end

  def set_patients
    @patient = Patient.find(params[:id])
  end

end
