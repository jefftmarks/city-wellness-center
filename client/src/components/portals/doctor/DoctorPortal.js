import React, { useState } from "react";
import DocAppointmentsTable from "./DocAppointmentsTable";
import PatientsTable from "./PatientsTable";
import PatientDisplay from "./PatientDisplay";
import EditDocProfile from "./EditDocProfile";
import "./DoctorPortal.css";

function DoctorPortal({ user, setUser, handleClickSignOut }) {
	const [display, setDisplay] = useState({page: ""});
	const [mode, setMode] = useState("");
	

	function renderDisplay() {
		switch (display.page) {
			case "patient":
				return (
					<PatientDisplay
						record={display.data}
						mode={mode}
						setMode={setMode}
						handleAlert={handleAlert}
						setDisplay={setDisplay}
					/>
				);
			case "edit-profile":
				return (
					<EditDocProfile
						user={display.user}
						setUser={setUser}
						setMode={setMode}
						setDisplay={setDisplay}
					/>
				)
			default:
				return null;
		}
	}

	// ~~~~~~~ Logout & Edit Profile ~~~~~~~

	function onClickEditProfile() {
		if (handleAlert()) {
			setMode("edit-profile");
			setDisplay({page: "edit-profile", user: user});
		}
	}

	function onClickSignOut() {
		if (handleAlert()) {
			handleClickSignOut();
		}
	}

	// ~~~~~~~ Alert System ~~~~~~~

	function handleAlert() {
		if (mode === "edit-profile" || mode === "edit-status" || mode === "edit-notes") {
			alert("You've made changes to the record. Please submit your changes before proceeding.");
			return false;
		} else {
			return true;
		}
	}

	return (
		<div id="dr-portal">
			<div id="dr-portal-header">
				<h3>{user.first_name} {user.last_name} (Doctor)</h3>
				<button onClick={onClickEditProfile}>Edit Profile</button>
				<button onClick={onClickSignOut}>Sign Out</button>
			</div>
			<div id="dr-portal-container">
				<div id="dr-left-panel">
					<DocAppointmentsTable
						user={user}
						handleAlert={handleAlert}
						setDisplay={setDisplay}
						/>
					<div className="dr-portal-div"></div>
					<PatientsTable
						user={user}
						handleAlert={handleAlert}
						setDisplay={setDisplay}
					/>
				</div>
				<div id="dr-right-panel">
					<div id="dr-display-container">
						{renderDisplay()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DoctorPortal;