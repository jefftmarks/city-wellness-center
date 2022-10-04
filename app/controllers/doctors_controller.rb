class DoctorsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  # GET /doctors
  def index
    doctors = Doctor.all
    render json: doctors
  end

  # GET /doctors/1
  def show
    doctor = find_params
    render json: doctor
  end

  # POST /doctors
  def create
    doctor = Doctor.create(doctor_params)
    render json: doctor, status:created
  end

  # PATCH/PUT /doctors/1
  def update
    doctor = find_param
    doctor.update(doctor_params)
    render json: doctor, status:updated
  end

  # DELETE /doctors/1
  def destroy
    doctor = find_param
    doctor.destroy
    head :no_content
  end


  private
  def doctor_params
    params.permit(:first_name, :last_name, :email, :phone, :bio, :certification, :image)
  end
  def find_params
    Doctor.find(params[:id])
  end
  def render_not_found_response
    render json:{error:"Doctor not found"}, status: :not_found 
  end
  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.error.full.messages }, status: :unprocessable_entity
  end

end
