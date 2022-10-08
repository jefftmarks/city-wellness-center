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

Doctor.create(password:"1234", first_name:"Jennifer", last_name:"Lepen", bio:"I am a licensed therapist in the state of New York", certification:"Licensed Professional Conselor(LPC)", image:"https://images.pexels.com/photos/5699484/pexels-photo-5699484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", email:"doctor@doctor.com", phone:"555-333-4444")
Doctor.create(password:"1234", first_name:"Paul", last_name:"Burns", bio:"I am a licensed therapist in the state of Delaware", certification:"Licensed Professional Conselor(LPC)", image:"https://images.pexels.com/photos/4100672/pexels-photo-4100672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", email:"paul@doctor.com", phone:"555-333-4444")
Doctor.create(password:"1234", first_name:"Amanda", last_name:"Sakuma", bio:"I am a licensed therapist in the state of New Jersey", certification:"Licensed Professional Conselor(LPC)", image:"https://images.squarespace-cdn.com/content/v1/5737c9737c65e49dc21c962d/1627580613982-114AVQ8HBXSE78EVF6MW/Lauren%2BO%2527Connor.jpg", email:"amanda@doctor.com", phone:"555-933-4444")
Doctor.create(password:"1234", first_name:"Dana", last_name:"Lobell", bio:"I am a licensed therapist in the state of New York", certification:"Licensed Professional Conselor(LPC)", image:"https://www.cambridgehealth.edu/wp-content/uploads/2020/01/rad.jpg", email:"dana@doctor.com", phone:"555-023-4444")
Doctor.create(password:"1234", first_name:"Karl", last_name:"Savinskiy", bio:"I am a licensed therapist in the state of Arizona", certification:"Licensed Professional Conselor(LPC)", image:"https://photos.psychologytoday.com/3fba4fe8-46cd-11ea-a6ad-06142c356176/2/320x400.jpeg", email:"karl@doctor.com", phone:"555-333-4044")

Patient.create(email: "bob@bob.com" , password: "1234", first_name: "Bob", last_name: "Dylan", status: "Trying out new medication", phone: "555-333-4444")
Patient.create(email: "alan@alan.com" , password: "1234", first_name: "Sarah", last_name: "Parker", status: "Afraid of heights", phone: "555-333-4444")
Patient.create(email: "spongebob@spongebob.com" , password: "1234", first_name: "Spongebob", last_name: "Squarepants", status: "Can only meet remotely", phone: "555-333-4444")
Patient.create(email: "maryanne@maryanne.com" , password: "1234", first_name: "Maryanne", last_name: "Perez", status: "New patient", phone: "555-333-4444")
Patient.create(email: "courtney@courtney.com" , password: "1234", first_name: "Courtney", last_name: "White", status: "New patient", phone: "555-333-4444")
Patient.create(email: "barney@barney.com" , password: "1234", first_name: "Barney", last_name: "Black", status: "Considering anger management", phone: "555-333-4444")
Patient.create(email: "tomas@gmail.com" , password: "1034", first_name: "Tomas", last_name: "Makaj", status: "Dangerous", phone: "931-000-0099")
Patient.create(email: "thierry@gmail.com" , password: "1034", first_name: "Thierry", last_name: "Yabre", status: "Anger management", phone: "931-000-0099")
Patient.create(email: "frank@gmail.com" , password: "1204", first_name: "Frank", last_name: "Rolands", status: "New patient", phone: "931-000-0099")
Patient.create(email: "will@gmail.com" , password: "1234", first_name: "Will", last_name: "Smith", status: "Insecure", phone: "931-000-0099")
Patient.create(email:"Kevin@gmail.com" , password:"1024", first_name:"Kevin", last_name:"Hart", status:"green 2", phone:"931-000-0099")

today = Date.today.to_time.iso8601.slice(0, 10)
tomorrow = Date.today.next_day.to_time.iso8601.slice(0, 10)

Appointment.create(date: today, time: "09:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Talked about issues with family")
Appointment.create(date: today, time: "10:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Discussed how they would like to read more often")
Appointment.create(date: today, time: "14:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Was not being very responsive")
Appointment.create(date: tomorrow, time: "12:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")
Appointment.create(date: tomorrow, time: "18:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")
Appointment.create(date: tomorrow, time: "17:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")
Appointment.create(date: today, time: "09:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Plan out more outings with your spouse")
Appointment.create(date: today, time: "18:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Should read more often")
Appointment.create(date: today, time: "10:30", doctor_id:Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Anger problem")
Appointment.create(date: today, time: "13:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Making a lot of progress")
Appointment.create(date: tomorrow, time: "16:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")
Appointment.create(date: tomorrow, time: "11:00", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")
Appointment.create(date: tomorrow, time: "19:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")
Appointment.create(date: tomorrow, time: "19:00", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "")

Admin.create(email:"admin@admin.com", password:"admin", first_name:"Jeff", last_name:"Marks")

puts "seeding done"