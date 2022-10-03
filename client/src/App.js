import React, { useState, useEffect } from "react";
import Login from "./components/login-page/Login";
import PatientPortal from "./components/portals/patient/PatientPortal";
import DoctorPortal from "./components/portals/doctor/DoctorPortal";
import AdminPortal from "./components/portals/admin/AdminPortal";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/login-page/NavBar";

function App() {
	const [user, setUser] = useState({
		role: "doctor",
		email: "admin@admin.org",
		password: "12345",
		id: 1
	});

	// useEffect(() => {
	// 	let token = localStorage.getItem("jwt");
		
	// 	if (token && !user) {
	// 		fetch("/profile", {
	// 			headers: {
	// 				token: token,
	// 				"Content-Type": "application/json",
	// 			},
	// 		})
	// 		.then((res) => {
	// 			if (res.ok) {
	// 				res.json().then((user) => setUser(user));
	// 			} else {
	// 				res.json().then((data) => handleLogout(data))
	// 			}
	// 		});
	// 	}
	// }, []);

	function handleLogout() {
		localStorage.clear();
		setUser({role: ""});
	}

	function renderSwitch() {
		switch(user.role) {
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
						<Login onLogin={setUser} />
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
