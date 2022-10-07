import React, { useState, useEffect } from "react";
import "./EditPatientProfile.css";

function EditPatientProfile({ user, setUser, setMode, setDisplay }) {
	const initializedForm = {
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		password: "",
		password_confirmation: ""
	};
	const [formData, setFormData] = useState(initializedForm);
	const [errors, setErrors] = useState([]);

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	// Autoload form with patient info
	useEffect(() => {
		setFormData({
			...formData,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone
		});
	}, [user]);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`/patients/${user.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => {
						setUser(user);
						setMode("");
						setDisplay("");
					});
				} else {
					res.json().then((data) => setErrors(data.errors));
				}
			})
	}

	function handleDiscardChanges(event) {
		event.preventDefault();
		setMode("");
		setDisplay("");
	}

	return (
		<div id="edit-patient">
			<h2>Update Profile </h2>
			<form id="edit-patient-form" onSubmit={handleSubmit}>
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
				<label>Email:
					<input
					required
					type="email"
					name="email"
					onChange={handleChange}
					value={formData.email}
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
				<label>Current / New Password:
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
						<ul id="edit-patient-errors">{errorList}</ul>
					</>
				) : null}
		</div>
	);
}

export default EditPatientProfile;