import React, { useState, useEffect } from "react";
import Login from "./components/login-page/Login";
import PatientPortal from "./components/portals/patient/PatientPortal";
import DoctorPortal from "./components/portals/doctor/DoctorPortal";
import AdminPortal from "./components/portals/admin/AdminPortal";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/login-page/NavBar";

function App() {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState("");

	useEffect(() => {
		let token = localStorage.getItem("jwt");
		
		if (token && !user) {
			fetch("/profile", {
				headers: {
					token: token,
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						setUser(data.user);
						setRole(data.role);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		}
	}, []);

	function handleLogin(data) {
		setUser(data.user);
		setRole(data.role);
	}

	function handleLogout() {
		localStorage.clear();
		setRole("");
		setUser(null);
	}

	function renderSwitch() {
		switch(role) {
			case "patient":
				return (
					<div className="portal-container">
						<PatientPortal />
					</div>
				);
			case "doctor":
				return (
					<div className="portal-container">
						<DoctorPortal user={user} />
					</div>
				);
			case "admin":
				return (
					<div className="portal-container">
						<AdminPortal handleClickSignOut={handleLogout} user={user} />
					</div>
				);
			default:
				return (
					<>
						<NavBar />
						<Login onLogin={handleLogin} />
					</>
				);
		}
	}

  return (
    <div className="App">
			<Routes>
				<Route path="/" element={renderSwitch()} />
			</Routes>
    </div>
  );

}

export default App;
