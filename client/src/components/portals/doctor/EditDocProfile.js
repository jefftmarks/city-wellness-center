import React, { useState, useEffect } from "react";
import "./EditDocProfile.css";

function EditDocProfile({ user, setUser, setMode, setDisplay }) {
	const initializedForm = {
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		password: "",
		password_confirmation: "",
		certification: "",
		bio: "",
		image: "",
	};
	const [formData, setFormData] = useState(initializedForm);
	const [errors, setErrors] = useState([]);

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	useEffect(() => {
		setFormData({
			...formData,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone,
			certification: user.certification,
			bio: user.bio,
			image: user.image
		});
	}, [user]);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`/doctors/${user.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => {
						setMode("");
						setDisplay("");
						setUser(user);
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
		<div id="edit-doctor">
			<h2>Update Profile </h2>
			<form id="edit-doctor-form" onSubmit={handleSubmit}>
				<label>First Name:
					<input
					required
					className="edit-doctor-input"
					type="text"
					name="first_name"
					onChange={handleChange}
					value={formData.first_name}
					/>
				</label>
				<label>Last Name:
					<input
					required
					className="edit-doctor-input"
					type="text"
					name="last_name"
					onChange={handleChange}
					value={formData.last_name}
					/>
				</label>
				<label>Email:
					<input
					required
					className="edit-doctor-input"
					type="email"
					name="email"
					onChange={handleChange}
					value={formData.email}
					/>
				</label>
				<label>Phone:
					<input
					required
					className="edit-doctor-input"
					type="phone"
					name="phone"
					onChange={handleChange}
					value={formData.phone}
					/>
				</label>
				<div>
					<label>Certification:</label>
					<textarea
						className="edit-doctor-textarea"
						name="certification"
						onChange={handleChange}
						value={formData.certification}
					>
					</textarea>
				</div>
				<div>
					<label>Bio:</label>
					<textarea
						className="edit-doctor-textarea"
						name="bio"
						onChange={handleChange}
						value={formData.bio}
					>
					</textarea>
				</div>
				<label>Image:
					<input
					className="edit-doc-image"
					type="text"
					name="image"
					onChange={handleChange}
					value={formData.image}
					/>
				</label>
				<label>Current / New Password:
					<input
					required
					className="edit-doctor-input"
					type="password"
					name="password"
					onChange={handleChange}
					value={formData.password}
					/>
				</label>
				<label>Confirm Password:
					<input
					required
					className="edit-doctor-input"
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
						<ul id="edit-doctor-errors">{errorList}</ul>
					</>
				) : null}
		</div>
	);
}

export default EditDocProfile;