class PatientsController < ApplicationController
	before_action :set_patients, only: [:show, :update, :destroy, :all_appointments, :update_status]

  def index
    patients = Patient.all
    render json: patients
  end

  def show
    render json: @patient, status: :ok
  end

	def by_doctor
		doctor = Doctor.find(params[:doctor_id])
		patients = doctor.patients
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
    params.permit(:id, :first_name, :last_name, :email, :password, :phone, :status)
  end

  def set_patients
    @patient = Patient.find(params[:id])
  end

end
