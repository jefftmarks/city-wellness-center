class DoctorsController < ApplicationController

  def index
    doctors = Doctor.all
    render json: doctors
  end

  # def show
  #   doctor = find_params
  #   render json: doctor
  # end

  # def create
  #   doctor = Doctor.create(doctor_params)
  #   render json: doctor, status:created
  # end

  # def update
  #   doctor = find_param
  #   doctor.update(doctor_params)
  #   render json: doctor, status:updated
  # end

  # def destroy
  #   doctor = find_param
  #   doctor.destroy
  #   head :no_content
  # end


  private

  def doctor_params
    params.permit(:first_name, :last_name, :email, :phone, :bio, :certification, :image)
  end

  def find_params
    Doctor.find(params[:id])
  end

end
