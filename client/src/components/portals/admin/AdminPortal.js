import React, { useState } from "react";
import AdminAppointmentsTable from "./AdminAppointmentsTable"
import PatientsDoctorsTable from "./PatientsDoctorsTable";
import EditAppointment from "./EditAppointment";
import CreateAppointment from "./CreateAppointment";
import EditRecord from "./EditRecord";
import CreateRecord from "./CreateRecord";
import EditAdminProfile from "./EditAdminProfile";
import "./AdminPortal.css";

const today = new Date().toISOString().slice(0, 10);

function AdminPortal({ onClickSignOut, user }) {
	const [display, setDisplay] = useState({page: ""});
	const [mode, setMode] = useState("");

	const [date, setDate] = useState(today);
	const [category, setCategory] = useState("patients");

	const [apptPatient, setApptPatient] = useState(null);
	const [apptDoctor, setApptDoctor] = useState(null);

	function renderDisplay() {
		switch (display.page) {
			case "appointment-edit":
				return (
					<EditAppointment
						appt={display.data}
						onEditAppointment={handleUpdateAppointments}
						mode={mode}
						setMode={setMode}
					/>
				);
			case "appointment-new":
				return (
					<CreateAppointment
						mode={mode}
						setMode={setMode}
						patient={apptPatient}
						doctor={apptDoctor}
						onEditAppointment={handleUpdateAppointments}
					/>
				)
			case "record-edit":
				return (
					<EditRecord
						record={display.data}
						mode={mode}
						setMode={setMode}
						onEditRecord={handleUpdateRecords}
					/>
				);
			case "record-new":
				return (
					<CreateRecord
						category={display.category}
						setMode={setMode}
						onEditRecord={handleUpdateRecords}
					/>
				)
			case "edit-profile":
				return (
					<EditAdminProfile
						user={display.user}
						setMode={setMode}
						setDisplay={setDisplay}
					/>
				)
			default:
				return null;
		}
	}

	function handleUpdateAppointments(date = today) {
		setDate(date);
		setDisplay({page: ""});
	}

	function handleUpdateRecords(newCategory = category) {
		setCategory(newCategory);
		setDisplay({page: ""});
	}

	function onClickEditProfile() {
		setMode("edit");
		setDisplay({page: "edit-profile", user: user});
	}

	return (
		<div id="admin-portal">
			<div id="admin-portal-header">
				<button onClick={onClickEditProfile}>Edit Profile</button>
				<button onClick={onClickSignOut}>Sign Out</button>
			</div>
			<div id="admin-portal-container">
				<div id="admin-left-panel">
					<AdminAppointmentsTable
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
						setMode={setMode}
						setPatient={setApptPatient}
						setDoctor={setApptDoctor}
						category={category}
						setCategory={setCategory}
					/>
				</div>
				<div id="admin-right-panel">
					<div id="admin-display-container">
						{renderDisplay()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminPortal;