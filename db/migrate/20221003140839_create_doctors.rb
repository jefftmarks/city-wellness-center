class CreateDoctors < ActiveRecord::Migration[6.1]
  def change
    create_table :doctors do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :bio
      t.string :certification
      t.string :image
      t.string :password_digest

      t.timestamps
    end
  end
end
