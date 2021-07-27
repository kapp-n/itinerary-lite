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

    def create
        category = Category.create(category_params)
        if category.valid?
            render json: category, status: :created
        else
            render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def add_category
        user = User.find_by(id: sessions[:user_id])
        category = user.categories.create(category_params)
        if category.valid?
            render json: category, status: :created
        else
            render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def category_params
        params.permit(:name)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
