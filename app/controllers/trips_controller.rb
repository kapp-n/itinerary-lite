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
        trip.user_id == user.id
        category = Category.find_by(cname: trip_params[:cname])
        if trip.valid?
            if category
                trip.category_id == category.id
                render json: :trip, status: :created
            else
                new_category = Category.create(cname: trip_params[:cname])
                trip.category_id == new_category.id 
                render json: :trip, status: :created
            end
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
        params.require(:trip).permit(:trip, :location, :lodging, :things_to_see, :cname)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
# user = User.find_by(id: session[:user_id])
#         category = Category.find_by(name: trip_params[:cName])
#         if category
#             trip = user.trips.create(location: trip_params[:location], category_id: category.id)
#             if trip.valid?
#                 render json: trip, include: :category, status: :created
#             end
#         else
#             trip = user.trips.create(location: trip_params[:location], )
#         else 
#             render json: { error: "Location cannot be blank" }, status: :unprocessable_entity
#         end
#     end