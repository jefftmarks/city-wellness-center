import React, { useState, useEffect } from "react";
import "./EditAppointment.css";

function EditAppointment({ appt, onEditAppointment, mode, setMode }) {
	const [formData, setFormData] = useState(appt);

	useEffect(() => {
		setFormData(appt);
	}, [appt]);

	function handleChange(event) {
		setMode("edit");
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		setMode("");
		onEditAppointment(formData.date)
		// fetch(`/appointments/${appt.id}`, {
		// 	method: "PATCH",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		date: formData.date,
		// 		time: formData.time,
		// 	}),
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((appt) => {
		// 				console.log(appt);
		// 				setMode("");
		// 				onEditAppointment(formData.date)
		// 			});
		// 		} else {
		// 			// figure out error handling
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}

	function handleDeleteAppointment(event) {
		event.preventDefault();
		setMode("");
		onEditAppointment(appt.date);
		// fetch (`/appointments/${appt.id}`, {
		// 	method: "DELETE",
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			// rerender portal?
		// 			res.json().then((data) => {
		// 				setMode("");
		// 				onEditAppointment(appt.date);
		// 			});
		// 		} else {
		// 			// figure out error handling
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		setMode("");
		onEditAppointment(appt.date);
	}

	return (
		<div id="edit-appt">
			<h2>Edit Appointment</h2>
			<form id="edit-appt-form" onSubmit={handleSubmit}>
				<div>Patient: {appt.patient}</div>
				<div>Doctor: {appt.doctor}</div>
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