import React, { useState, useEffect } from "react"; 
import "./EditAppointment.css";

function EditAppointment({ appointment, onEditAppointment, onDeleteAppointment, mode, setMode }) {
	const [formData, setFormData] = useState(appointment);

	// Autofill form with appointment info
	useEffect(() => {
		setFormData(appointment);
	}, [appointment]);

	function handleChange(event) {
		setMode("edit");
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`/appointments/${appointment.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: formData.date,
				time: formData.time,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((appointment) => onEditAppointment(appointment));
				} else {
					res.json().then((errors) => console.log(errors));
				}
			})
	}

	function handleDeleteAppointment(event) {
		event.preventDefault();
		fetch (`/appointments/${appointment.id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(() => onDeleteAppointment(appointment));
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		setMode("");
		onEditAppointment(appointment.date);
	}

	return (
		<div id="edit-appt">
			<h2>Edit Appointment</h2>
			<form id="edit-appt-form" onSubmit={handleSubmit}>
				<div>Patient: {appointment.patient.first_name} {appointment.patient.last_name}</div>
				<div>Doctor: {appointment.doctor.first_name} {appointment.doctor.last_name}</div>
				<label>Date:
					<input
					required
					type="date"
					name="date"
					onChange={handleChange}
					value={formData.date}
					/>
				</label>
				<label>Time:
					<input
					required
					type="time"
					name="time"
					id="edit-appt-time"
					onChange={handleChange}
					value={formData.time}
					/>
				</label>
				<button disabled={mode !== "edit"}>Submit Changes</button>
				<button onClick={handleDiscardChanges}>
					{mode === "edit" ? "Discard Changes" : "Back"}
				</button>
				<button onClick={handleDeleteAppointment}>Delete Appointment</button>
			</form>
		</div>
	)
}

export default EditAppointment;