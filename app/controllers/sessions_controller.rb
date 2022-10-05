class SessionsController < ApplicationController

	def profile
		token = request.headers["token"]
		hash = decode_token(token)
		if hash["user_id"]
			if hash["role"] == "admin"
				admin = Admin.find(hash["user_id"])
				render json: { user: AdminSerializer.new(admin), token: token, role: "admin" }
			elsif hash["role"] == "doctor"
				doctor = Doctor.find(hash["user_id"])
				render json: { user: DoctorSerializer.new(doctor), token: token, role: "doctor" }
			elsif hash["role"] == "patient"
				patient = Patient.find(hash["user_id"])
				render json: { user: PatientSerializer.new(patient), token: token, role: "patient" }
			end
		else
			render json: { error: "Unauthorized" }, status: :unauthorized
		end
	end

end
