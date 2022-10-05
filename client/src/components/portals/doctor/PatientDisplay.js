import React, { useEffect, useState } from "react";
import PatientHistory from "./PatientHistory";
import "./PatientDisplay.css";

function PatientDisplay({ record, mode, setMode, handleAlert, setDisplay }) {
	const [patient, setPatient] = useState({});
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState({});

	let formattedDate;
	let formattedTime;

	if (selectedAppointment.date) {
		// reformat date
		let str = selectedAppointment.date;
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
		let hour = parseInt(selectedAppointment.time.slice(0, 2));
		let minutes = selectedAppointment.time.slice(3, 5);
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
		let id = record.type === "appt" ? record.patient.id : record.id; 
		fetch(`/patients/${id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((patient) => {
						setPatient(patient);
					});
				} else {
					// error handling?
					res.json().then((errors) => console.log(errors));
				}
			})
	}, [record]);

	useEffect(() => {
		fetch(`/appointments/patient/${patient.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((appointments) => {
						setAppointments(appointments);
					});
				} else {
					// error handling?
					res.json().then((errors) => console.log(errors));
				}
			})
	}, [patient]);

	function handleChangePatient(event) {
		setPatient({
			...patient,
			status: event.target.value
		})
	}

	function handleChangeAppointment(event) {
		setSelectedAppointment({
			...selectedAppointment,
			notes: event.target.value
		})
	}

	function handleSubmitStatus(event) {
		event.preventDefault();
		fetch(`patients/status/${patient.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({status: patient.status}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((patient) => {
						setMode("");
						setPatient(patient);
					});
				} else {
					res.json().then((errors) => console.log(errors));
				}
			})
	}

	function handleSubmitNotes(event) {
		event.preventDefault();
		fetch(`appointments/${selectedAppointment.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({notes: selectedAppointment.notes}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((updatedAppt) => {
						setMode("");
						setSelectedAppointment(updatedAppt);
						const updatedAppointments = appointments.map((appointment => {
							if (appointment.id === updatedAppt.id) {
								return updatedAppt;
							} else {
								return appointment;
							}
						}))
						setAppointments(updatedAppointments);
					});
				} else {
					res.json().then((errors) => console.log(errors));
				}
			})
	}

	function handleClickAppointment(appointment) {
		if (handleAlert()) {
			setSelectedAppointment(appointment);
		}
	}

	function onClickEditStatus() {
		if (handleAlert()) {
			setMode("edit-status");
		}
	}

	function onClickEditNotes() {
		if (handleAlert()) {
			setMode("edit-notes");
		}
	}

	function onClickBack(event){
		event.preventDefault();
		setMode("");
		setDisplay("");
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
					<button onClick={onClickEditStatus}>Edit Status</button>
				)}
			</div>
			{mode === "edit-status" ? (
				<textarea
					id="edit-status-field"
					onChange={handleChangePatient}
					value={patient.status}
				>
				</textarea>
			) : (
				<p id="status-text">{patient.status}</p>
			)}
			<div id="patient-display-line"></div>
			<h3>Patient History:</h3>
			{selectedAppointment.date ? (
				<div id="appt-notes">
					<div id="notes-header-container">
						<p id="notes-header">Notes &#8211; {formattedDate} at {formattedTime}</p>
						{mode === "edit-notes" ? (
							<form onSubmit={handleSubmitNotes}><button>Submit</button></form>
						) : (
							<button onClick={onClickEditNotes} >Edit Notes</button>
						)}
					</div>
					{mode === "edit-notes" ? (
						<textarea
						id="edit-notes-field"
						onChange={handleChangeAppointment}
						value={selectedAppointment.notes}
						>
						</textarea>
					) : (
						<p id="notes-text">{selectedAppointment.notes}</p>
					)}
				</div>
			) : null}
			<p>Select Appointment Below to View Notes:</p>
			<PatientHistory
				selected={selectedAppointment.id}
				appointments={appointments}
				handleClickAppointment={handleClickAppointment}
			/>
			<button id="patient-display-back" onClick={onClickBack}>
				Back
			</button>
		</div>
	);
}

export default PatientDisplay;
