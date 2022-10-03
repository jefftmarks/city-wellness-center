import React, { useState } from "react";
import DocAppointmentsTable from "./DocAppointmentsTable";
import PatientsTable from "./PatientsTable";
import PatientDisplay from "./PatientDisplay";
import "./DoctorPortal.css";

function DoctorPortal({ user }) {
	const [display, setDisplay] = useState({page: ""});
	const [mode, setMode] = useState("");
	const [appointment, setAppointment] = useState({});

	function renderDisplay() {
		switch (display.page) {
			case "patient":
				return (
					<PatientDisplay
						record={display.data}
						mode={mode}
						setMode={setMode}
						appointment={appointment}
						setAppointment={setAppointment}
						handleAlert={handleAlert}
					/>
				);
			// case "edit-profile":
			// 	return (
			// 		<EditAdminProfile
			// 			user={display.user}
			// 			setMode={setMode}
			// 			setDisplay={setDisplay}
			// 		/>
			// 	)
			default:
				return null;
		}
	}

	// function onClickEditProfile() {
	// 	if (handleAlert()) {
	// 		setMode("edit");
	// 		setDisplay({page: "edit-profile", user: user});
	// 	}
	// }

	// function onClickSignOut() {
	// 	if (handleAlert()) {
	// 		handleClickSignOut();
	// 	}
	// }

	function handleAlert() {
		if (mode === "edit-status" || mode === "edit-notes") {
			alert("You've made changes to the record. Please submit your changes before proceeding.");
			return false;
		} else {
			return true;
		}
	}

	return (
		<div id="dr-portal">
			<div id="dr-portal-header">
				{/* <button onClick={onClickEditProfile}>Edit Profile</button>
				<button onClick={onClickSignOut}>Sign Out</button> */}
			</div>
			<div id="dr-portal-container">
				<div id="dr-left-panel">
					<DocAppointmentsTable
						user={user}
						handleAlert={handleAlert}
						setDisplay={setDisplay}
							// setMode={setMode}
						/>
					<div className="dr-portal-div"></div>
					<PatientsTable
						user={user}
						handleAlert={handleAlert}
						setDisplay={setDisplay}
						// mode={mode}
						// setMode={setMode}
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