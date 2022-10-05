class AppointmentsController < ApplicationController
	before_action :set_appointment, only: [:update, :destroy]

	def by_date
		date = params[:date]
		appointments = Appointment.where(date: date).order(:time)
		if appointments
			render json: appointments, status: :ok
		else
			render json: { error: "Appointments not found" }, status: :not_found
		end
	end

	def by_doctor
		date = params[:date]
		doctor_id = params[:doctor_id]
		appointments = Appointment.where(date: date, doctor_id: doctor_id).order(:time)
		if appointments
			render json: appointments, status: :ok
		else
			render json: { error: "Appointments not found" }, status: :not_found
		end
	end

	def by_patient
		patient_id = params[:patient_id]
		appointments = Appointment.where(patient_id: patient_id).order(:time)
		if appointments
			render json: appointments, status: :ok
		else
			render json: { error: "Appointments not found" }, status: :not_found
		end
	end

	def upcoming
		today = Date.today.to_time.iso8601.slice(0, 10)
		patient_id = params[:patient_id]
		appointments = Appointment.where(["date >= ? and patient_id = ?", today, patient_id]).order(:time)
		if appointments
			render json: appointments, status: :ok
		else
			render json: { error: "Appointments not found" }, status: :not_found
		end
	end

  def create
    appointment = Appointment.create!(appointment_params)
    render json: appointment, status: :created
  end

  def update
    @appointment.update!(appointment_params)
    render json: @appointment, status: :ok
  end

  def destroy
    @appointment.destroy
    render json: @appointment
  end

  private

  def appointment_params
    params.permit(:id, :date, :time, :notes, :doctor_id, :patient_id)
  end

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

end
