class AppointmentsWithPatientsSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :doctor_id, :patient_id, :notes

  belongs_to :patient
end
