class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.string :locale
      t.text :things_to_see
      t.string :lodging
      t.integer :category_id
      t.integer :user_id

      t.timestamps
    end
  end
end
