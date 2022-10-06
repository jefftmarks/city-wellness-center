import React from "react";
import LoginForm from "./LoginForm";
import "./Home.css";

function Home({ onLogin }) {
	return (
		<div id="home-page">
				<div id="home-left-panel">
					<LoginForm onLogin={onLogin}/>
				</div>
				<div id="home-right-panel">
					<h1>City Wellness Center</h1>
				</div>
		</div>
	)
}

export default Home;