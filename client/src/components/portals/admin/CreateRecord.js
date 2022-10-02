import React, { useState } from "react";
import "./CreateRecord.css";

function CreateRecord({ category, setMode, onEditRecord }) {
	const intializedForm = {
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		password: "",
		password_confirmation: ""
	}
	const [formData, setFormData] = useState(intializedForm);
	const [errors, setErrors] = useState([]);

	const categoryHeader = category[0].toUpperCase() + category.slice(1, category.length - 1);

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		setMode("");
		onEditRecord(category);
		setErrors([]);
		// fetch(`/${category}`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(formData),
		// })
		// 	.then((res) => {
		// 		if (res.ok) {
		// 			res.json().then((record) => {
		// 				setMode("");
		// 				onEditRecord(category);
		// 			});
		// 		} else {
		// 			res.json().then((data) => setErrors(data.errors));
		// 		}
		// 	})
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		setMode("");
		onEditRecord();
	}

	return (
		<div id="create-record">
			<h2>Create {categoryHeader} </h2>
			<form id="create-record-form" onSubmit={handleSubmit}>
				<label>First Name:
					<input
					required
					type="text"
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
				<label>Password:
					<input
					required
					type="password"
					name="password"
					onChange={handleChange}
					value={formData.password}
					/>
				</label>
				<label>Confirm Password:
					<input
					required
					type="password"
					name="password_confirmation"
					onChange={handleChange}
					value={formData.password_confirmation}
					/>
				</label>
				<button>Submit {categoryHeader}</button>
				<button onClick={handleDiscardChanges}>Discard Record</button>
			</form>
			{errors.length > 0 ? (
					<>
						<ul id="create-record-errors">{errorList}</ul>
					</>
				) : null}
		</div>
	)
}

export default CreateRecord;