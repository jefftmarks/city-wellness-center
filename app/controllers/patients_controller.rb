class PatientsController < ApplicationController
	before_action :set_patients, only: [:update, :destroy]

  def index
    patients = Patient.all
    render json: patients
  end

  # def show
  #   patient = find_params
  #   render json: patient, except: :password
  # end

  def create
    patient = Patient.create!(patient_params)
    render json: patient, status: :created
  end

	def update
    @patient.update!(patient_params)
    render json: @patient, status: :ok
  end

  def destroy
    @patient.destroy
    render json: @patient
  end

  private

  def patient_params
    params.permit(:id, :first_name, :last_name, :email, :password, :phone)
  end

  def set_patients
    @patient = Patient.find(params[:id])
  end

end
