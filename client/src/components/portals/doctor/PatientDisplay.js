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

function PatientDisplay({ record, mode, setMode, appointment, setAppointment, handleAlert }) {
	const [patient, setPatient] = useState({});
	const [status, setStatus] = useState("");
	const [notes, setNotes] = useState("");

	let formattedDate;
	let formattedTime;

	if (appointment.date) {
		// reformat date
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
		
		// reformat time
		let hour = parseInt(appointment.time.slice(0, 2));
		let minutes = appointment.time.slice(3, 5);
		if (hour === 0) {
			formattedTime = `12:${minutes} AM`;
		} else if (hour === 12) {
			formattedTime = `12:${minutes} PM`;
		} else if (hour > 0 && hour < 12) {
			formattedTime = `${hour}:${minutes} AM`;
		} else {
			formattedTime = `${hour - 12}:${minutes} PM`;
		}
	}

	useEffect(() => {
		let id = record.type === "appt" ? record.patient_id : record.id; 
		const patient = patients[id - 1];
		setPatient(patient);
		setAppointment(record);
		setStatus(patient.status);
		setNotes(record.notes);
		// setPatient(patients[record.patient_id + 1]);
		// fetch(`/patients/${id}`)
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((patient) => setPatient(patient));
		// 		} else {
		// 			// error handling?
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}, [record]);

	function handleSubmitStatus(event) {
		event.preventDefault();
		setMode("");
		setPatient({...patient, status: status});
		// fetch(`patients/${patient.id}`, {
		// 	method: "PATCH",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({status: status}),
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((patient) => {
		// 				setMode("");
		// 				setPatient(patient);
		// 			});
		// 		} else {
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}

	function handleSubmitNotes(event) {
		event.preventDefault();
		setMode("");
		setAppointment({...appointment, notes: notes});
		// fetch(`appontment/${appointment.id}`, {
		// 	method: "PATCH",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({notes: notes}),
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((appointment) => {
		// 				setMode("");
		// 				setAppointment(appointment);
		// 			});
		// 		} else {
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}

	function handleClickAppointment(appointment) {
		if (handleAlert()) {
			setAppointment(appointment);
		}
	}

	if (patient) return (
		<div id="patient-display">
			<h2>Patient: {patient.first_name} {patient.last_name}</h2>
			<p>Phone: {patient.phone}</p>
			<p>Email: {patient.email}</p>
			<div id="status-container">
				<p>Status:</p>
				{mode === "edit-status" ? (
					<form onSubmit={handleSubmitStatus}><button>Submit</button></form>
				) : (
					<button onClick={() => setMode("edit-status")}>Edit Status</button>
				)}
			</div>
			{mode === "edit-status" ? (
				<textarea
					id="edit-status-field"
					onChange={(event) => setStatus(event.target.value)}
					value={status}
				>
				</textarea>
			) : (
				<p id="status-text">{patient.status}</p>
			)}
			<div id="patient-display-line"></div>
			<h3>Patient History:</h3>
			{appointment.date ? (
				<div id="appt-notes">
					<div id="notes-header-container">
						<p id="notes-header">Notes &#8211; {formattedDate} at {formattedTime}</p>
						{mode === "edit-notes" ? (
							<form onSubmit={handleSubmitNotes}><button>Submit</button></form>
						) : (
							<button onClick={() => setMode("edit-notes")} >Edit Notes</button>
						)}
					</div>
					{mode === "edit-notes" ? (
						<textarea
						id="edit-notes-field"
						onChange={(event) => setNotes(event.target.value)}
						value={notes}
						>
						</textarea>
					) : (
						<p id="notes-text">{appointment.notes}</p>
					)}
				</div>
			) : null}
			<p>Select Appointment Below to View Notes:</p>
			<PatientHistory
				selected={appointment.id}
				appointments={patient.appointments}
				handleClickAppointment={handleClickAppointment}
			/>
		</div>
	);
}

export default PatientDisplay;
