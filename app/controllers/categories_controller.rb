class CategoriesController < ApplicationController
    before_action :authorize

    def index
        user = User.find_by(id: session[:user_id])
        categories = user.categories 
        render json: categories, include: :trips
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        categories = user.categories
        categories.reject { |c| c[:id] == params[:id] }
        trips = user.trips.find_by(category_id: params[:id])
        trips.destroy
        head :no_content
    end

    def create
        category = Category.find_by(cname: category_params[:cname])
        if category
            render json: category
        else
            new_category = Category.create(category_params)
            if new_category.valid?
                render json: new_category
            else
                render json: { error: "Must enter or select a category" }, status: :unprocessable_entity
            end
        end
    end

    def all_categories
        categories = Category.all
        render json: categories
    end

   

    private

    def category_params
        params.permit(:category, :cname)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
