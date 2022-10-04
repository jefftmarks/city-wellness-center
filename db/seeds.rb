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

Doctor.create(password_digest:"", first_name:"Jennifer", last_name:"Lepen", bio:"I am a licensed therapist in the state of New York", certification:"Licensed Professional Conselor(LPC)", image:"https://www.sussmancounseling.com/images/rachel_sussman.png", email:"", phone:"555-333-4444")
Doctor.create(password_digest:"", first_name:"Paul", last_name:"Cleaners", bio:"I am a licensed therapist in the state of New Jersey", certification:"Licensed Professional Conselor(LPC)", image:"https://images.squarespace-cdn.com/content/v1/5c4cc2d74eddecd289445fc9/1594748757880-JPIAZZ6KR4E32SHBZK6Y/sex+addiction+therapy.jpg?format=1500w", email:"" , phone:"999-222-0000" ,)
Doctor.create(password_digest:"" , first_name:"Jeff", last_name:"Marks" , bio:"I am a licensed therapist in the state of California", certification:"Licensed Professional Conselor(LPC)", image:"https://photos.psychologytoday.com/cad24c1a-bff5-4e01-96eb-4fb60b531ca9/2/320x400.jpeg", email:"", phone:"111-333-5555")


Patient.create(email:"first@gmail.com" , password_digest:"", first_name:"Alan", last_name:"Rolands", status:"green 3", phone:"347 222 1111")
Patient.create(email:"second@gmail.com" , password_digest:"", first_name:"Alan", last_name:"Rolands", status:"green 2", phone:"931 000 9999")
Patient.create(email:"third@gmail.com" , password_digest:"", first_name:"Alan", last_name:"Rolands", status:"red 2", phone:"917 333 777")



Appointment.create(date:"10/27/2022", time:"9:30 AM", doctor_id:Doctor.all.sample.id, patient_id:Patient.all.sample.id, notes:"Plan out more outings with your spouse")
Appointment.create(date:"10/29/2022", time:"8:30 AM", doctor_id:Doctor.all.sample.id, patient_id:Patient.all.sample.id, notes:"Should read more often")
Appointment.create(date:"10/30/2022", time:"10:30 AM", doctor_id:Doctor.all.sample.id, patient_id:Patient.all.sample.id, notes:"Anger problem")


Admin.create(email:"", password_digest:"", first_name:"Jeff", last_name:"Marks")

puts "seeding done"