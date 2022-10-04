class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :notes

	belongs_to :doctor
	belongs_to :patient
end
