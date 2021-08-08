class TripsController < ApplicationController
    before_action :authorize 
    
    def index
        user = User.find_by(id: session[:user_id])
        trips = user.trips
        render json: trips, include: :category
    end

    def show
        user = User.find_by(id: session[:user_id])
        trip = user.trips.find_by(id: params[:id])
        if trip
            render json: trip, include: :category
        else
            render json: { error: "Trip not found" }, status: :not_found
        end
    end

    def create
        #trip = Trip.create(trip_params)
        user = User.find_by(id: session[:user_id])
        trip = user.trips.create(trip_params)
        #byebug
        if trip.valid?
            render json: trip
        else
            render json: { error: "Location cannot be blank" }, status: :unprocessable_entity
        end
    end
        

    def update
        trip = Trip.find_by(id: params[:id])
        if trip
            trip.update(trip_params)
            render json: trip, include: :category
        else
            render json: { error: "Trip not found" }, status: :not_found
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        trip = user.trips.find_by(id: params[:id])
        trip.destroy
        head :no_content
    end

    private

    def trip_params
        params.require(:trip).permit(:trip, :locale, :lodging, :things_to_see, :category_id)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
