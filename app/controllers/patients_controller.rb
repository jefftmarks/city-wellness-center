class PatientsController < ApplicationController

  def index
    patients = Patient.all
    render json: patients
  end

  # def show
  #   patient = find_params
  #   render json: patient, except: :password
  # end

  # def create
  #   patient = Patient.create(patient_params)
  #   render json: doctor, status:created
  # end

  # def update
  #   patient = find_param
  #   patient.update(patient)
  #   render json: patient, status:updated
  # end

  # def destroy
  #   patient = find_param
  #   patient.destroy
  #   head :no_content
  # end

  private

  def patient_params
    params.permit(:first_name, :last_name, :email, :password, :phone)
  end

  def find_params
    Patient.find(params[:id])
  end

end
