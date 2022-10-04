class PatientsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  # GET /patients
  def index
    patients = Patient.all
    render json: patients, only: [:first_name, :last_name]
  end

  # GET /patients/1
  def show
    patient = find_params
    render json: patient, except: :password
  end

  # POST /patients
  def create
    patient = Patient.create(patient_params)
    render json: doctor, status:created
  end

  # PATCH/PUT /patients/1
  def update
    patient = find_param
    patient.update(patient)
    render json: patient, status:updated
  end

  # DELETE /patients/1
  def destroy
    patient = find_param
    patient.destroy
    head :no_content
  end


  private
  def patient_params
    params.permit(:first_name, :last_name, :email, :password, :phone)
  end
  def find_params
    Patient.find(params[:id])
  end
  def render_not_found_response
    render json:{error:"Patient not found"}, status: :not_found 
  end
  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.error.full.messages }, status: :unprocessable_entity
  end


end
