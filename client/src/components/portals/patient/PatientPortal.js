import React, { useState } from "react";
import PatientAppointmentsTable from "./PatientAppointmentsTable";
import EditPatientProfile from "./EditPatientProfile";
import "./PatientPortal.css";

function PatientPortal({ user, setUser, handleClickSignOut }) {
	// Display setting renders different forms on right panel and passes along payload of record data to the loaded display
	const [display, setDisplay] = useState({page: ""});
	// Mode enables and disables certain click functionality and triggers alerts when a record is being edited
	const [mode, setMode] = useState("");

	// ~~~~~~~ Render Displays in Right Panel ~~~~~~~
	
	function renderDisplay() {
		if (display.page === "edit-profile") {
			return (
				<EditPatientProfile
					user={display.user}
					setUser={setUser}
					setMode={setMode}
					setDisplay={setDisplay}
				/>
			)
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
		if (mode === "edit-profile") {
			alert("You've made changes to the record. Please submit your changes before proceeding.");
			return false;
		} else {
			return true;
		}
	}

	return (
		<div id="patient-portal">
			<div id="patient-portal-header">
				<h3>{user.first_name} {user.last_name} (Doctor)</h3>
				<button onClick={onClickEditProfile}>Edit Profile</button>
				<button onClick={onClickSignOut}>Sign Out</button>
			</div>
			<div id="patient-portal-container">
				<div id="patient-left-panel">
					<PatientAppointmentsTable
						user={user}
						handleAlert={handleAlert}
						setDisplay={setDisplay}
						/>
				</div>
				<div id="patient-right-panel">
					<div id="patient-display-container">
						{renderDisplay()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PatientPortal;