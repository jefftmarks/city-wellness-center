class PatientWithAppointmentsSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :status

	has_many :appointments
end
