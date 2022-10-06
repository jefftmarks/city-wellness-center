Doctor.destroy_all
Appointment.destroy_all
Patient.destroy_all
Admin.destroy_all

puts "seeding starting"

Doctor.create(password: "1234", first_name: "Jennifer", last_name: "Lepen", bio: "I am a licensed therapist in the state of New York", certification: "Licensed Professional Conselor(LPC)", image: "https://ericajmitchell.com/wp-content/uploads/2016/02/ShaylaLawson_by-Erica-J-Mitchell-Photographer_002_1x1_SocialMedia_Thumbs.jpg", email: "jennifer@doctor.com", phone: "555-333-4444")
Doctor.create(password: "1234", first_name: "Ronda", last_name: "McDonald", bio: "I am a licensed therapist in the state of New York", certification: "Licensed Professional Conselor(LPC)", image: "https://ericajmitchell.com/wp-content/uploads/2021/11/Sue-Schoenfeld-by-Erica-J-Mitchell-Photographer106.jpg", email: "ronald@doctor.com", phone: "555-333-4444")
Doctor.create(password: "1234", first_name: "Hillary", last_name: "Clinton", bio: "I am a licensed therapist in the state of New York", certification: "Licensed Professional Conselor(LPC)", image: "https://ericajmitchell.com/wp-content/uploads/2022/02/Norma-Mace-by-Erica-J-Mitchell-Photographer-011.jpg", email: "hillary@doctor.com", phone: "555-333-4444")

Patient.create(email: "bob@bob.com" , password: "1234", first_name: "Bob", last_name: "Dylan", status: "Trying out new medication", phone: "555-333-4444")
Patient.create(email: "alan@alan.com" , password: "1234", first_name: "Sarah", last_name: "Parker", status: "Afraid of heights", phone: "555-333-4444")
Patient.create(email: "spongebob@spongebob.com" , password: "1234", first_name: "Spongebob", last_name: "Squarepants", status: "Can only meet remotely", phone: "555-333-4444")

today = Date.today.to_time.iso8601.slice(0, 10)
tomorrow = Date.today.next_day.to_time.iso8601.slice(0, 10)

Appointment.create(date: today, time: "09:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Talked about issues with family")
Appointment.create(date: today, time: "08:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Discussed how they would like to read more often")
Appointment.create(date: today, time: "10:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Was not being very responsive")

Appointment.create(date: tomorrow, time: "09:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Having issues with spouse")
Appointment.create(date: tomorrow, time: "08:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Expressed concern over eating habits")
Appointment.create(date: tomorrow, time: "10:30", doctor_id: Doctor.all.sample.id, patient_id: Patient.all.sample.id, notes: "Making a lot of progress")

Admin.create(email:"admin@admin.com", password:"admin", first_name:"Jeff", last_name:"Marks")

puts "seeding done"