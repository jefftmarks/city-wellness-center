import React, { useState, useEffect } from "react";
import "./EditAdminProfile.css";

function EditAdminProfile({ user, setMode, setDisplay }) {
	const initializedForm = {email: "", password: "", password_confirmation: ""};
	const [formData, setFormData] = useState(initializedForm);
	const [errors, setErrors] = useState([]);

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	useEffect(() => {
		setFormData({...formData, email: user.email});
	}, [user]);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	console.log(user.id)

	function handleSubmit(event) {
		event.preventDefault();
		// setMode("");
		// setDisplay("");
		fetch(`/admins/${user.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((record) => {
						console.log(record)
						// console.log(record);
						// setMode("");
					});
				} else {
					res.json().then((data) => setErrors(data));
				}
			})
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		setMode("");
		setDisplay("");
	}

	return (
		<div id="edit-admin">
			<h2>Update Profile </h2>
			<form id="edit-admin-form" onSubmit={handleSubmit}>
				<label>Email:
					<input
					required
					type="email"
					name="email"
					onChange={handleChange}
					value={formData.email}
					/>
				</label>
				<label>New Password:
					<input
					required
					type="password"
					name="password"
					onChange={handleChange}
					value={formData.password}
					/>
				</label>
				<label>Confirm New Password:
					<input
					required
					type="password"
					name="password_confirmation"
					onChange={handleChange}
					value={formData.password_confirmation}
					/>
				</label>
				<button>Update Profile</button>
				<button onClick={handleDiscardChanges}>Discard Changes</button>
			</form>
			{errors.length > 0 ? (
					<>
						<ul id="edit-admin-errors">{errorList}</ul>
					</>
				) : null}
		</div>
	);
}

export default EditAdminProfile;