class Category < ApplicationRecord
    has_many :users, through: :trips
    has_many :trips, dependent: :destroy
    validates :cname, presence: true, uniqueness: :true
end
