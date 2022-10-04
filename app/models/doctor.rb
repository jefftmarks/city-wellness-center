class Doctor < ApplicationRecord
    has_many :appointments, dependent: :destroy
    has_many :patients, through: :appointments

		has_secure_password

		# VALID_EMAIL_REGEX = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i

		validates :first_name, presence: true
		validates :last_name, presence: true
		validates :phone, presence: true
		validates :password, presence: true, on: :create
    validates :email , presence: true, uniqueness:{case_sensetive:false}
		# validates :email , presence: true, uniqueness:{case_sensetive:false}, format: { with: VALID_EMAIL_REGEX, multiline: true }
end
