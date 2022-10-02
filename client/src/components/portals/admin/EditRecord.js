import React, { useState, useEffect } from "react";
import "./EditRecord.css";

function EditRecord({ record, mode, setMode, onEditRecord }) {
	const [formData, setFormData] = useState(record);

	useEffect(() => {
		setFormData({
			email: record.email,
			phone: record.phone,
			first_name: record.first_name,
			last_name: record.last_name,
		});
	}, [record]);

	function handleChange(event) {
		setMode("edit");
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		setMode("");
		onEditRecord(record.category)
		// fetch(`/${record.category}/${record.id}`, {
		// 	method: "PATCH",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(formData),
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((record) => {
		// 				console.log(record);
		// 				setMode("");
		// 				onEditRecord(record.category)
		// 			});
		// 		} else {
		// 			// figure out error handling
		// 			res.json().then((errors) => console.log(errors));
		// 		}
		// 	})
	}

	function handleDeleteRecord(event) {
		event.preventDefault();
		setMode("");
		onEditRecord(record.category)
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
		onEditRecord(record.category)
	}

	return (
		<div id="edit-record">
			<h2>Edit Record</h2>
			<form id="edit-record-form" onSubmit={handleSubmit}>
				<label>First Name:
					<input
					required
					type="test"
					name="first_name"
					onChange={handleChange}
					value={formData.first_name}
					/>
				</label>
				<label>Last Name:
					<input
					required
					type="text"
					name="last_name"
					onChange={handleChange}
					value={formData.last_name}
					/>
				</label>
				<label>Phone:
					<input
					required
					type="phone"
					name="phone"
					onChange={handleChange}
					value={formData.phone}
					/>
				</label>
				<label>Email:
					<input
					required
					type="email"
					name="email"
					onChange={handleChange}
					value={formData.email}
					/>
				</label>
				<button disabled={mode !== "edit"}>Submit Changes</button>
				<button onClick={handleDiscardChanges}>
					{mode === "edit" ? "Discard Changes" : "Back"}
				</button>
				<button onClick={handleDeleteRecord}>Delete Record</button>
			</form>
		</div>
	)
}

export default EditRecord;