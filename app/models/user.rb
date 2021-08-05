class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: true
    has_many :trips
    has_many :categories, through: :trips
end
