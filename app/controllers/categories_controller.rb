class CategoriesController < ApplicationController
    before_action :authorize

    def index
        user = User.find_by(id: session[:user_id])
        categories = user.categories 
        render json: categories, include: :trips
    end

    def show 
        user = User.find_by(id: session[:user_id])
        category = user.categories.find_by(id: params[:id])
        render json: category, include: :trips
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        categories = user.categories
        categories.reject { |c| c[:id] == params[:id] }
        head :no_content
    end

    def create
        category = Category.create(category_params)
        if category.valid?
            render json: category, status: :created
        else
            render json: { errors: "There was an issue with your request, please make sure your category doesn't already exist when creating a trip" }, status: :unprocessable_entity
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
