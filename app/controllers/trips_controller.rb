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
        render json: trip, include: :category
    end

    def create
        trip = Trip.create(trip_params)
        user = User.find_by(id: session[:user_id])
        user.trips << trip
        #category = Category.find_by(id: trip_params[:category_id])
        #trip.category_id == category.id
        if trip.valid?
            render json: :trip, status: :created
        else
            render json: { error: "Location cannot be blank" }, status: :unprocessable_entity
        end
    end
        

    def update
        
    end

    def destroy
    end

    private

    def trip_params
        params.require(:trip).permit(:trip, :locale, :lodging, :things_to_see, :category_id)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
