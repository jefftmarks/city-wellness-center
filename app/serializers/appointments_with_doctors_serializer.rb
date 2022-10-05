class AppointmentsWithDoctorsSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :doctor_id, :patient_id, :notes

  belongs_to :doctor
end
