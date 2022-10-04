class WelcomesController < ApplicationController
  before_action :set_welcome, only: [:show, :update, :destroy]

  # GET /welcomes
  def index
    @welcomes = Welcome.all

    render json: @welcomes
  end

  # GET /welcomes/1
  def show
    render json: @welcome
  end

  # POST /welcomes
  def create
    @welcome = Welcome.new(welcome_params)

    if @welcome.save
      render json: @welcome, status: :created, location: @welcome
    else
      render json: @welcome.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /welcomes/1
  def update
    if @welcome.update(welcome_params)
      render json: @welcome
    else
      render json: @welcome.errors, status: :unprocessable_entity
    end
  end

  # DELETE /welcomes/1
  def destroy
    @welcome.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_welcome
      @welcome = Welcome.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def welcome_params
      params.fetch(:welcome, {})
    end
end
