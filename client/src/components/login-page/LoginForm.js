import React from "react";
import "./LoginForm.css";

function LoginForm() {
	return (
		<div className="login-form-container">
			<form className="login-form">
				<div className="user-role-container">
					<label for="user-role">I'm logging in as a . . .</label>
					<select name="user-role" id="user-role">
						<option disabled value="">Please Choose</option>
						<option value="patient">Patient</option>
						<option value="doctoer">Doctor</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<div className="login-input-div"></div>
				<input
						type="text"
						id="username"
						name="username"
						placeholder="username"
						// value={formData.username}
						// onChange={handleChange}
						
					/>
				<div className="login-input-div"></div>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					// value={formData.password}
					// onChange={handleChange}
				/>
			</form>
		</div>
	)
}

export default LoginForm;