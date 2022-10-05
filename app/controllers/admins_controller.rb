class AdminsController < ApplicationController
  before_action :set_admin, only: [:update]

  def update
    @admin.update!(admin_params)
    render json: @admin, status: :ok
  end

	def login
		user = Admin.find_by(email: params[:email])
		if user&.authenticate(params[:password])
			token = generate_token({user_id: user.id, role: "admin"})
			render json: { user: user, token: token, role: "admin" }, status: :created
		else
			render json: { error: ["Invalid username or password"] }, status: :unauthorized
		end
	end

  private
    def set_admin
      @admin = Admin.find(params[:id])
    end

    def admin_params
      params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
