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
	const [user, setUser] = useState(null);
	const [role, setRole] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		let token = localStorage.getItem("jwt");
		
		if (token && !user) {
			setRole("loading");
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
	}, [user]);

	function handleLogin(data) {
		setUser(data.user);
		setRole(data.role);
		navigate("/");
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

	function renderNavBar() {
		if (role === "") {
			return <NavBar/>
		}
	}

	function renderLoginAndAbout() {
		if (role === "") {
			return <Route path="/about" element={<About/>} />
		}
	}

  return (
    <div className="App">
			{renderNavBar()}
			<Routes>
				{renderLoginAndAbout()}
				<Route exact path="/" element={renderSwitch()} />
			</Routes>
    </div>
  );

}

export default App;
