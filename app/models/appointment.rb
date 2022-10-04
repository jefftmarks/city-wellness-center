class Appointment < ApplicationRecord
    belongs_to :doctor
    belongs_to :patient

		validates :patient_id, presence: true
		validates :doctor_id, presence: true
		validates :date, presence: true
		validates :time, presence: true
		# validates :date, presence: true, on_or_after: {Date.current}
end
