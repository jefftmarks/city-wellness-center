import React, { useState } from "react";
import DocAppointmentsTable from "./DocAppointmentsTable";
import PatientsTable from "./PatientsTable";
import PatientDisplay from "./PatientDisplay";
import "./DoctorPortal.css";

function DoctorPortal({ user }) {
	const [display, setDisplay] = useState({page: ""});
	const [mode, setMode] = useState("");

	

	// const [apptPatient, setApptPatient] = useState(null);
	// const [apptDoctor, setApptDoctor] = useState(null);

	function renderDisplay() {
		switch (display.page) {
			case "patient":
				return (
					<PatientDisplay
						record={display.data}
						recordType ={display.record_type}
						// mode={mode}
						// setMode={setMode}
						// onEditRecord={handleUpdateRecords}
					/>
				);
			// case "appointment-new":
			// 	return (
			// 		<CreateAppointment
			// 			mode={mode}
			// 			setMode={setMode}
			// 			patient={apptPatient}
			// 			doctor={apptDoctor}
			// 			onEditAppointment={handleUpdateAppointments}
			// 		/>
			// 	)
			// case "record-edit":
			// 	return (
			// 		<EditRecord
			// 			record={display.data}
			// 			mode={mode}
			// 			setMode={setMode}
			// 			onEditRecord={handleUpdateRecords}
			// 		/>
			// 	);
			// case "record-new":
			// 	return (
			// 		<CreateRecord
			// 			category={display.category}
			// 			setMode={setMode}
			// 			onEditRecord={handleUpdateRecords}
			// 		/>
			// 	)
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

	// function handleUpdateRecords(newCategory = category) {
	// 	setCategory(newCategory);
	// 	setDisplay({page: ""});
	// }

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
		switch (mode) {
			case "edit":
				alert("You've made changes to the record. Please submit or discard your changes before proceeding.");
				return false;
			default:
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
						// setDisplay={setDisplay}
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