import React from "react";
import PatientAppointmentsTable from "./PatientAppointmentsTable";
import "./PatientPortal.css";

function PatientPortal({ user, handleClickSignOut }) {

	return (
		<div id="patient-portal">
			<div id="patient-portal-header">
				<h3>{user.first_name} {user.last_name} (Patient)</h3>
				<button onClick={handleClickSignOut}>Sign Out</button>
			</div>
			<div id="patient-portal-container">
				<PatientAppointmentsTable user={user} />
			</div>
		</div>
	)
}

export default PatientPortal;