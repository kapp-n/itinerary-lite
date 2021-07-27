class TripsController < ApplicationController
    before_action :authorize 
    
    def index
        # user = User.find_by(id: session[:user_id])
        # trips = user.trips
        # render json: trips, include: :categories 
    end

    def show
        # user = User.find_by(id: session[:user_id])
        # trip = user.trips.find_by(id: params[:id])
        # render json: trip, include: :categories
    end

    def create
    end

    def update
        
    end

    def destroy
    end

    private

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
