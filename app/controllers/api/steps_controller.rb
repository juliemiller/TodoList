class Api::StepsController < ApplicationController
  def index
    render json: Step.where(todo_id: params[:todo_id])
  end

  def create
    step = Step.create!(step_params)
    render json: step
  end

  def destroy
    step = Step.find(params[:id])
    step.destroy!
    render json: step
  end

  def update
    step = Step.find(params[:id])
    step.update!(step_params)
    render json: step
  end

  private
  def step_params
    params.require(:step).permit(:todo_id, :body, :done)
  end
end
