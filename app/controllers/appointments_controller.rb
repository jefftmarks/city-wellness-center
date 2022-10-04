class AppointmentsController < ApplicationController
	before_action :set_appointment, only: [:update, :destroy]

  # def index
  #   appointments = Appointment.all
  #   render json: appointments
  # end

	def by_date
		date = params[:date]
		appointments = Appointment.where(date: date)
		if appointments
			render json: appointments, status: :ok
		else
			render json: { error: "Appointments not found" }, status: :not_found
		end
	end

  # def show
  #   appointment = find_params
  #   render json: appointment
  # end

  def create
    appointment = Appointment.create!(appointment_params)
    render json: appointment, status: :created
  end

  def update
    @appointment.update!(appointment_params)
    render json: @appointment, status: :accepted
  end

  def destroy
    @appointment.destroy
    head :no_content
  end

  private

  def appointment_params
    params.permit(:id, :date, :time, :doctor_id, :patient_id)
  end

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

end
