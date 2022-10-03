import React, { useEffect, useState } from "react";
import PatientHistory from "./PatientHistory";
import "./PatientDisplay.css";

const today = new Date().toISOString().slice(0, 10);

const patients = [
	{id: 1, last_name: "Marks", first_name: "Jeff", email: "jeff@jeff.com", phone: "555-555-5555", status: "Working on relationship issues", appointments: [
		{id: 2, time: "10:00", date: today, notes: "Talked about father."},
		{id: 4, time: "10:30", date: today, notes: "Talked about siblings."},
		{id: 5, time: "11:00", date: today, notes: "Talked about mother."}
	]},
	{id: 2, last_name: "Marks", first_name: "Bob", email: "bob@bob.com", phone: "555-555-5555", status: "Has a fear of heights", appointments: [
		{id: 1, time: "09:30", date: today, notes: "Discussed coping mechanisms."},
		{id: 3, time: "10:30", date: today, notes: "Taught meditation techniques."}
	]}
]

function PatientDisplay({ record, recordType }) {
	const [patient, setPatient] = useState({});
	const [appointment, setAppointment] = useState({});

	let formattedDate = "";

	if (appointment.date) {
		let str = appointment.date;
		let mm = str.slice(5, 7);
		let dd;
		if (str[8] === "0") {
			dd = str.slice(9, 10);
		} else {
			dd = str.slice(8, 10);
		}
		let yyyy = str.slice(0, 4);
		formattedDate = `${mm}/${dd}/${yyyy}`;
	}

	useEffect(() => {
		const patient = patients[record.patient_id - 1]
		setPatient(patient);
		if (recordType === "appt") {
			setAppointment(record);
		}
		// setPatient(patients[record.patient_id + 1]);
		// fetch(`/patients/${record.patient_id}`)
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((patient) => setPatient(patient));
		// 		} else {
		// 			// error handling?
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}, [record]);

	if (patient) return (
		<div id="patient-display">
			<h2>Patient: {patient.first_name} {patient.last_name}</h2>
			<p>Phone: {patient.phone}</p>
			<p>Email: {patient.email}</p>
			<p>Status:</p>
			<p>{patient.status}</p>
			<div id="patient-display-line"></div>
			<p>Patient History:</p>
			<p>Appointment: {formattedDate} at {appointment.time}</p>
			<p>Notes:</p>
			<p>{appointment.notes}</p>
			<PatientHistory
				appointments={patient.appointments}
				setAppointment={setAppointment}
			/>
		</div>
	);
}

export default PatientDisplay;
