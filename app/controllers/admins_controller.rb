class AdminsController < ApplicationController
  before_action :set_admin, only: [:show, :update, :destroy]

  

  
  # PATCH/PUT /admins/1
  def update
    if admin.update(admin_params)
      render json: admin
    else
      render json: admin.errors, status: :unprocessable_entity
    end
  end

  private
    def set_admin
      admin = Admin.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def admin_params
      params.require(:admin).permit(:first_name, :last_name, :email, :password_digest)
    end
end
