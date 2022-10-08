import React, { useState, useEffect } from "react";
import Home from "./components/home/Home";
import About from "./components/home/About";
import PatientPortal from "./components/portals/patient/PatientPortal";
import DoctorPortal from "./components/portals/doctor/DoctorPortal";
import AdminPortal from "./components/portals/admin/AdminPortal";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/home/NavBar";

function App() {
	// Active user with default state of no role assigned
	const [user, setUser] = useState({role: ""});

	const navigate = useNavigate();

	// Grab logged in user on reload via JWT token in local storage
	// Token payload wil include user_id and role of user
	useEffect(() => {
		let token = localStorage.getItem("jwt");
		
		if (token && user.role === "") {
			setUser({
				...user,
				role: "loading"
			});
			fetch("/profile", {
				headers: {
					token: token,
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						setUser({
							...data.user,
							role: data.role
						})
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		}
	}, [user]);

	// ~~~~~~~ Reset State After Login / Logout ~~~~~~~

	function handleLogin(data) {
		setUser({
			...data.user,
			role: data.role
		});
		navigate("/");
	}

	function handleLogout() {
		localStorage.clear();
		setUser({role: ""});
	}

	// ~~~~~~~ Conditionally Render App Components ~~~~~~~

	// If no user, render welcome page with login. Otherwise, depending on user role, render patient, doctor, or admin portal

	function renderSwitch() {
		switch(user.role) {
			case "patient":
				return (
					<div className="portal-container">
						<PatientPortal
							user={user}
							setUser={setUser}
							handleClickSignOut={handleLogout}
						/>
					</div>
				);
			case "doctor":
				return (
					<div className="portal-container">
						<DoctorPortal
							handleClickSignOut={handleLogout}
							user={user}
							setUser={setUser}
						/>
					</div>
				);
			case "admin":
				return (
					<div className="portal-container">
						<AdminPortal
							handleClickSignOut={handleLogout}
							user={user}
							setUser={setUser}
						/>
					</div>
				);
			case "loading":
				return <h2>Loading...</h2>
			default:
				return <Home onLogin={handleLogin}/>;
		}
	}

	// Only render nav bar when no user logged in
	function renderNavBar() {
		if (user.role === "") {
			return <NavBar/>
		}
	}

	// About page route should only be accessibly when no user logged in
	function renderAbout() {
		if (user.role === "") {
			return <Route path="/about" element={<About/>} />
		}
	}

  return (
    <div className="App">
			{renderNavBar()}
			<Routes>
				{renderAbout()}
				<Route exact path="/" element={renderSwitch()} />
			</Routes>
    </div>
  );

}

export default App;
