import React, { useState } from "react";
import "./CreateAppointment.css";

// Appointment cannot be created before current date
const today = new Date().toISOString().slice(0, 10);

function CreateAppointment({ patient, doctor, onCreateAppointment }) {
	const intializedForm = {date: "", time: ""}
	const [formData, setFormData] = useState(intializedForm);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function renderFullName(record) {
		return record.first_name + " " + record.last_name;
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (patient && doctor) {
			const newAppointment = {
				...formData,
				patient_id: patient.id,
				doctor_id: doctor.id
			};
			fetch("/appointments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newAppointment),
			})
				.then((res) => {
					if (res.ok) {
						res.json().then((appointment) => {
							onCreateAppointment(appointment);
						});
					} else {
						res.json().then((errors) => console.log(errors));
					}
				})
		} else {
			alert("Please select a patient and a doctor.")
		}
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		onCreateAppointment();
	}

	return (
		<div id="create-appt">
			<h2>Create Appointment</h2>
			<form id="create-appt-form" onSubmit={handleSubmit}>
				<div>
					<small>Select Record from Patients List</small>
					<div className="create-appt-name">
						Patient: {patient ? renderFullName(patient) : null}
					</div>
				</div>
				<div>
					<small>Select Record from Doctors List</small>
					<div className="create-appt-name">
						Doctor: {doctor ? renderFullName(doctor) : null}
					</div> 
				</div>
				<label>Date:
					<input
					required
					type="date"
					name="date"
					onChange={handleChange}
					value={formData.date}
					min={today}
					/>
				</label>
				<label>Time:
					<input
					id="create-appt-time-input"
					required
					type="time"
					name="time"
					onChange={handleChange}
					value={formData.time}
					/>
				</label>
				<button>Submit Appointment</button>
				<button onClick={handleDiscardChanges}>Discard Appointment</button>
			</form>
		</div>
	)
}

export default CreateAppointment;