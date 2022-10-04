class DoctorsController < ApplicationController
	before_action :set_doctor, only: [:update, :destroy]

  def index
    doctors = Doctor.all
    render json: doctors
  end

  # def show
  #   doctor = find_params
  #   render json: doctor
  # end

  def create
    doctor = Doctor.create!(doctor_params)
    render json: doctor, status: :created
  end

  def update
    @doctor.update!(doctor_params)
    render json: @doctor, status: :ok
  end

  def destroy
    @doctor.destroy
    render json: @doctor
  end


  private

  def doctor_params
    params.permit(:id, :first_name, :last_name, :email, :phone, :bio, :certification, :image, :password)
  end

  def set_doctor
    @doctor = Doctor.find(params[:id])
  end

end
