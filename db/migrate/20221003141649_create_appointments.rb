class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.string :date
      t.string :time
      t.integer :doctor_id
      t.integer :patient_id
      t.text :notes

      t.timestamps
    end
  end
end
