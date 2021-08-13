class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :trips
    has_many :categories, through: :trips
end
