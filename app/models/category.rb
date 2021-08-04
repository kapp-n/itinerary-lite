class Category < ApplicationRecord
    has_many :trips, dependent:  :destroy
    has_many :users, through: :trips
    validates :name, presence: true, length: { in: 2..30 }
end
