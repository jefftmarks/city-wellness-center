class ApplicationController < ActionController::API
	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
	# rescue_from JWT::DecodeError, with: :render_unauthorized_response

	def get_secret_key
		"hotdog"
	end

	def generate_token(payload)
		JWT.encode({user_id: payload[:user_id], role: payload[:role]}, get_secret_key)
	end

	def decode_token(token)
		JWT.decode(token, get_secret_key)[0]
	end

	private

	def render_not_found_response(exception)
		render json: { error: "#{exception.model} not found" }, status: :not_found
	end

	def render_unprocessable_entity_response(exception)
		render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
	end

	# def render_unauthorized_response(exception)
	# 	render json: { error: ["Unauthorized"] }, status: :unauthorized
	# end

end
