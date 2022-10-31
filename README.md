# City Wellness Center

A portal for doctors, office administrators, and patients to create, view, and edit medical appointments and patient records.

### Background

This app was created in October 2022 by [Jeff Marks](https://github.com/jefftmarks) and [Thierry Herman Yabre](https://github.com/Cresus9) as part of a project to practice full-stack web development. City Wellness Center is a fictional medical office, and the app features fictional names and medical records.

The frontend is built on Javascript and React. The backend is build on Ruby on Rails with a PostgreSQL relational database.

### Database Associations

![Database Associations](/associations.png)

### Running the App

To run the app in development mode, navigate into the root directory.

Run `bundle install` and `npm install --prefix client` and install the necessary frontend and backend dependencies.

Run `rails db:migrate db:seed` to build the database.

Run `rails s` to launch the backend server at [http://localhost:3000](http://localhost:3000).

In a separate terminal, run `npm start --prefix client` to run the app on [http://localhost:4000](http://localhost:4000).

### Logging In

The app has three modes in which to log in: admin, doctor, and patient.

![Landing page](/screenshots/Landing%20Page.png)

To log in as an admin, enter:
email: admin@admin.com
password: admin

To log in as a doctor or patient, select one of the doctor or patient accounts in the db/seeds.rb file and log in using their email and password.

### Admin Portal

As admin, you can view, create, and edit appointments. In addition, you can view, create, and edit patient and doctor records. However, admins cannot view details of a patient's medical records.

![Admin Portal](/screenshots/Admin%20Portal.png)

### Doctor Portal

A doctor can view all appointments belonging to them. In addition, they can view the records of all of their patients, where they are able to view and edit a patient's history.

![Doctor Portal](/screenshots/Doctor%20Portal.png)

### Patient Portal

A patient can view all of their upcoming appointments.