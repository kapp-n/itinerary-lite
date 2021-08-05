class Trip < ApplicationRecord
    belongs_to :user 
    belongs_to :category
    validates :location, presence: :true
end
