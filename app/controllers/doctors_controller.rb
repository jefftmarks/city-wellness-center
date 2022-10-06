class DoctorsController < ApplicationController
	before_action :set_doctor, only: [:update, :destroy]

  def index
    doctors = Doctor.all.order(:last_name)
    render json: doctors
  end

	def login
		user = Doctor.find_by(email: params[:email])
		if user&.authenticate(params[:password])
			token = generate_token({user_id: user.id, role: "doctor"})
			render json: { user: user, token: token, role: "doctor" }, status: :created
		else
			render json: { error: ["Invalid username or password"] }, status: :unauthorized
		end
	end

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
    params.permit(:id, :first_name, :last_name, :email, :phone, :bio, :certification, :image, :password, :password_confirmation)
  end

  def set_doctor
    @doctor = Doctor.find(params[:id])
  end

end
