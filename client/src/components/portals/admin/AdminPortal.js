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

function AdminPortal({ handleClickSignOut, user, setUser }) {
	const [display, setDisplay] = useState({page: ""});
	const [mode, setMode] = useState("");

	const [date, setDate] = useState(today);
	const [category, setCategory] = useState("patients");

	const [apptPatient, setApptPatient] = useState(null);
	const [apptDoctor, setApptDoctor] = useState(null);

	const [appointments, setAppointments] = useState([]);
	const [records, setRecords] = useState([]);

	function renderDisplay() {
		switch (display.page) {
			case "appointment-edit":
				return (
					<EditAppointment
						appointment={display.data}
						onEditAppointment={handleUpdateAppointments}
						mode={mode}
						setMode={setMode}
						onDeleteAppointment={handleDeleteAppointment}
					/>
				);
			case "appointment-new":
				return (
					<CreateAppointment
						patient={apptPatient}
						doctor={apptDoctor}
						onCreateAppointment={handleCreateAppointment}
						onDeleteAppointment={handleDeleteAppointment}
					/>
				)
			case "record-edit":
				return (
					<EditRecord
						record={display.data}
						mode={mode}
						setMode={setMode}
						onEditRecord={handleUpdateRecords}
						onDeleteRecord={handleDeleteRecord}
					/>
				);
			case "record-new":
				return (
					<CreateRecord
						category={display.category}
						setMode={setMode}
						onCreateRecord={handleCreateRecord}
					/>
				)
			case "edit-profile":
				return (
					<EditAdminProfile
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
			setMode("edit");
			setDisplay({page: "edit-profile", user: user});
		}
	}

	function onClickSignOut() {
		if (handleAlert()) {
			handleClickSignOut();
		}
	}

	// ~~~~~~~ Appointments CRUD ~~~~~~~

	function handleCreateAppointment(appointment = null) {
		setDisplay({page: ""})
		setMode("");
		setApptDoctor(null);
		setApptPatient(null);
		if (appointment) {
			setAppointments([...appointments, appointment]);
		}
	}

	function handleUpdateAppointments(updatedAppt = null) {
		setDisplay({page: ""});
		setMode("");
		if (updatedAppt) {
			const updatedAppointments = appointments.map((appt) => {
				if (appt.id === updatedAppt.id) {
					return updatedAppt;
				} else {
					return appt;
				}
			})
			setAppointments(updatedAppointments);
		}
	}

	function handleDeleteAppointment(delAppt) {
		setDisplay({page: ""});
		setMode("");
		const updatedAppointments = appointments.filter((appt) => appt.id !== delAppt.id);
		setAppointments(updatedAppointments);
	}

	// ~~~~~~~ Records (Patients & Doctors) CRUD ~~~~~~~

	function handleCreateRecord(record = null) {
		setDisplay({page: ""})
		setMode("");
		if (record) {
			setRecords([...records, record]);
		}
	}

	function handleUpdateRecords(updatedRecord = null) {
		setDisplay({page: ""});
		setMode("");
		if (updatedRecord) {
			const updatedRecords = records.map((record) => {
				if (record.id === updatedRecord.id) {
					return updatedRecord;
				} else {
					return record;
				}
			})
			setRecords(updatedRecords);
		}
	}

	function handleDeleteRecord(delRecord) {
		setDisplay({page: ""});
		setMode("");
		const updatedRecords = records.filter((record) => record.id !== delRecord.id);
		setRecords(updatedRecords);
	}

	// ~~~~~~~ Alert System ~~~~~~~

	function handleAlert() {
		switch (mode) {
			case "edit":
				alert("You've made changes to the record. Please submit or discard your changes before proceeding.");
				return false;
			case "create-appointment":
				alert("Please submit or discard the new appointment before proceeding.");
				return false;
			case "create-record":
				alert("Please submit or discard the new record before proceeding.");
				return false;
			default:
				return true;
		}
	}

	return (
		<div id="admin-portal">
			<div id="admin-portal-header">
				<h3>{user.first_name} {user.last_name} (Admin)</h3>
				<button onClick={onClickEditProfile}>Edit Profile</button>
				<button onClick={onClickSignOut}>Sign Out</button>
			</div>
			<div id="admin-portal-container">
				<div id="admin-left-panel">
					<AdminAppointmentsTable
						date={date}
						setDate={setDate}
						setDisplay={setDisplay}
						handleAlert={handleAlert}
						setMode={setMode}
						appointments={appointments}
						setAppointments={setAppointments}
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
						records={records}
						setRecords={setRecords}
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