# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Doctor.destroy_all
Appointment.destroy_all
Patient.destroy_all
Admin.destroy_all

puts "seeding starting"

Doctor.create(password:"1234", first_name:"Jennifer", last_name:"Lepen", bio:"I am a licensed therapist in the state of New York", certification:"Licensed Professional Conselor(LPC)", image:"https://www.sussmancounseling.com/images/rachel_sussman.png", email:"doctor@doctor.com", phone:"555-333-4444")
Doctor.create(password:"1234", first_name:"Ronald", last_name:"McDonald", bio:"I am a licensed therapist in the state of New York", certification:"Licensed Professional Conselor(LPC)", image:"https://www.sussmancounseling.com/images/rachel_sussman.png", email:"ronald@doctor.com", phone:"555-333-4444")
Doctor.create(password:"1234", first_name:"Hillary", last_name:"Clinton", bio:"I am a licensed therapist in the state of New York", certification:"Licensed Professional Conselor(LPC)", image:"https://www.sussmancounseling.com/images/rachel_sussman.png", email:"hillary@doctor.com", phone:"555-333-4444")

Patient.create(email:"first@gmail.com" , password:"1234", first_name:"Alan", last_name:"Rolands", status:"green 3", phone:"347 222 1111")
Patient.create(email:"second@gmail.com" , password:"1234", first_name:"Alan", last_name:"Rolands", status:"green 2", phone:"931 000 9999")
Patient.create(email:"third@gmail.com" , password:"1234", first_name:"Alan", last_name:"Rolands", status:"red 2", phone:"917 333 777")

Appointment.create(date:"2022-10-04", time:"09:30", doctor_id:Doctor.all.sample.id, patient_id:Patient.all.sample.id, notes:"Plan out more outings with your spouse")
Appointment.create(date:"2022-10-04", time:"08:30", doctor_id:Doctor.all.sample.id, patient_id:Patient.all.sample.id, notes:"Should read more often")
Appointment.create(date:"2022-10-04", time:"10:30", doctor_id:Doctor.all.sample.id, patient_id:Patient.all.sample.id, notes:"Anger problem")


Admin.create(email:"admin@admin.com", password:"admin", first_name:"Jeff", last_name:"Marks")

puts "seeding done"