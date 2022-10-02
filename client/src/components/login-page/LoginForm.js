import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
	const initializedForm = {email: "", password: "", role: ""};
	const [formData, setFormData] = useState(initializedForm);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setErrors([]);
		fetch(`/login/${formData.role}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					res.json().then((data) => {
						localStorage.setItem("jwt", data.token);
						onLogin(data.user);
					});
				} else {
					res.json().then((data) => setErrors(data.errors));
				}
			})
	}

	

	return (
		<div id="login-form-container">
			<form id="login-form" onSubmit={handleSubmit}>
				<div id="user-role-container">
					<label htmlFor="user-role">I'm logging in as . . .</label>
					<select
						name="role"
						id="user-role"
						value={formData.role}
						onChange={handleChange}
					>
						<option disabled value="">Please Choose</option>
						<option value="patient">Patient</option>
						<option value="doctor">Doctor</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<div className="login-input-div"></div>
				<input
						type="email"
						id="login-email"
						name="email"
						placeholder="email"
						value={formData.email}
						onChange={handleChange}
						
					/>
				<div className="login-input-div"></div>
				<input
					type="password"
					id="login-password"
					name="password"
					placeholder="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<div className="login-input-div"></div>
				<div id="login-btn-container">
					<button>{isLoading ? "Loading..." : "Sign In"}</button>
				</div>
				{errors.length > 0 ? (
					<>
						<div className="login-input-div"></div>
						<ul id="login-errors">{errorList}</ul>
					</>
				) : null}
			</form>
		</div>
	)
}

export default LoginForm;