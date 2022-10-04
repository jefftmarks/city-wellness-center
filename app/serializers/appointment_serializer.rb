class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :doctor_id, :patient_id, :notes
end
