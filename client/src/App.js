import React, { useState, useEffect } from "react";
import NavBar from "./components/login-page/NavBar";
import Login from "./components/login-page/Login";
import PatientPortal from "./components/portals/patient/PatientPortal";
import DoctorPortal from "./components/portals/doctor/DoctorPortal";
import AdminPortal from "./components/portals/admin/AdminPortal";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
	const [user, setUser] = useState({role: "admin"});

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
					res.json().then((user) => setUser(user));
				} else {
					res.json().then((data) => handleLogout(data))
				}
			});
		}
	}, []);

	function handleLogout() {
		localStorage.clear();
		setUser({role: ""});
	}

	function renderSwitch() {
		switch(user.role) {
			case "patient":
				return <PatientPortal />;
			case "doctor":
				return <DoctorPortal />;
			case "admin":
				return <AdminPortal />;
			default:
				return (
					<div>
						<NavBar />
						<Login onLogin={setUser} />
					</div>
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
