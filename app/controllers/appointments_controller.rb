class AppointmentsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  # GET /appointments
  def index
    appointments = Appointment.all
    render json: appointments
  end

  # GET /appointment/1
  def show
    appointment = find_params
    render json: appointment, each_serializer:AppointmentsWithPatientsSerializer, serializer:AppointmentsWithDoctorsSerializer
  end

  # POST /appointment
  def create
    appointment = create!(doctor_params)
    render json: appointment, status:created
  end

  # PATCH/PUT /appointment/1
  def update
    appointment = find_param
    appointment.update(appointment_params)
    render json: appointment, status:updated
  end

  # DELETE /appointment/1
  def destroy
    appointment = find_param
    appointment.destroy
    head :no_content
  end

  private
  def appointment_params
    params.permit(:date, :time, :doctor_id, :patient_id)
  end
  def find_params
    Appointment.find(params[:id])
  end
  def render_not_found_response
    render json:{error:"Appointment not found"}, status: :not_found 
  end
  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.error.full.messages }, status: :unprocessable_entity
  end

end
