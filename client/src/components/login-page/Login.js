import React from "react";
import LoginForm from "./LoginForm";
import "./Login.css";

function Login({ onLogin }) {
	return (
		<div id="login-container">
			<LoginForm onLogin={onLogin} />
		</div>
	)
}

export default Login;