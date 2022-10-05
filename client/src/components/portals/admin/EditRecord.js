import React, { useState, useEffect } from "react";
import "./EditRecord.css";

function EditRecord({ record, mode, setMode, onEditRecord, onDeleteRecord }) {
	const initializedForm = {
			email: "",
			phone: "",
			first_name: "",
			last_name: ""
	}
	const [formData, setFormData] = useState(initializedForm);

	const categoryHeader = record.category[0].toUpperCase() + record.category.slice(1, record.category.length - 1);

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
		fetch(`/${record.category}/${record.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						const payload = {
							...data,
							category: record.category
						};
						onEditRecord(payload);
					});
				} else {
					res.json().then((errors) => console.log(errors));
				}
			})
	}

	function handleDeleteRecord(event) {
		event.preventDefault();
		fetch (`/${record.category}/${record.id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(() => onDeleteRecord(record));
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		onEditRecord();
	}

	return (
		<div id="edit-record">
			<h2>Edit {categoryHeader}</h2>
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