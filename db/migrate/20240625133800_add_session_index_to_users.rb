class AddSessionIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :session_index, :string
  end
end
