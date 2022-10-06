import React from "react";
import LoginForm from "./LoginForm";
import "./Home.css";

function Home({ onLogin }) {
	return (
		<div id="home-page">
				<LoginForm onLogin={onLogin} />
		</div>
	)
}

export default Home;