class Trip < ApplicationRecord
    belongs_to :user 
    belongs_to :category
    validates :locale, presence: :true
end
