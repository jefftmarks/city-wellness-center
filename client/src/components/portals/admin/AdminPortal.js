import React, { useState } from "react";
import AppointmentsTable from "../AppointmentsTable";
import PatientsDoctorsTable from "./PatientsDoctorsTable";
import EditAppointment from "../admin/EditAppointment";
import EditRecord from "../admin/EditRecord";
import "./AdminPortal.css";

function AdminPortal() {
	const [display, setDisplay] = useState({mode: ""});

	function renderDisplay() {
		switch (display.mode) {
			case "appointment-edit":
				return <EditAppointment appt={display.data} />;
			case "record-edit":
				return <EditRecord record={display.data} />;
			default:
				return null;
		}
	}

	return (
		<div id="admin-portal">
			<div id="admin-left-panel">
				<AppointmentsTable setDisplay={setDisplay} />
				<div className="admin-portal-div"></div>
				<PatientsDoctorsTable setDisplay={setDisplay} />
			</div>
			<div id="admin-right-panel">
				<div id="admin-display-container">
					{renderDisplay()}
				</div>
			</div>
		</div>
	)
}

export default AdminPortal;