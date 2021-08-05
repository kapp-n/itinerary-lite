class ChangeColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column(:trips, :location, :locale)
  end
end
