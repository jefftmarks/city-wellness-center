import React, { useState } from "react";
import AppointmentsTable from "../AppointmentsTable";
import PatientsDoctorsTable from "./PatientsDoctorsTable";
import EditAppointment from "../admin/EditAppointment";
import CreateAppointment from "../admin/CreateAppointment";
import EditRecord from "../admin/EditRecord";
import "./AdminPortal.css";

const today = new Date().toISOString().slice(0, 10);

function AdminPortal() {
	const [display, setDisplay] = useState({page: ""});
	const [mode, setMode] = useState("");
	const [date, setDate] = useState(today);

	const [apptPatient, setApptPatient] = useState({});
	const [apptDoctor, setApptDoctor] = useState({});

	function renderDisplay() {
		switch (display.page) {
			case "appointment-edit":
				return (
					<EditAppointment
						appt={display.data}
						onEditAppointment={handleUpdateAppointments}
						setMode={setMode}
					/>
				);
			case "appointment-new":
				return (
					<CreateAppointment
						setMode={setMode}
						patient={apptPatient}
						doctor={apptDoctor}
					/>
				)
			case "record-edit":
				return <EditRecord record={display.data} />;
			default:
				return null;
		}
	}

	function handleUpdateAppointments(date) {
		setDate(date);
		setDisplay({page: ""});
	}

	return (
		<div id="admin-portal">
			<div id="admin-left-panel">
				<AppointmentsTable
					date={date}
					setDate={setDate}
					setDisplay={setDisplay}
					mode={mode}
					setMode={setMode}
				/>
				<div className="admin-portal-div"></div>
				<PatientsDoctorsTable
					setDisplay={setDisplay}
					mode={mode}
					setPatient={setApptPatient}
					setDoctor={setApptDoctor}
				/>
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