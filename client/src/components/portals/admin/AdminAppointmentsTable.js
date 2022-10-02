import React, { useState, useEffect } from "react";
import AdminAppointment from "./AdminAppointment";
import "./AdminAppointmentsTable.css";

const today = new Date().toISOString().slice(0, 10);

const dummyData = [
	{id: 1, time: "09:00", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 2, time: "10:00", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 3, time: "10:30", date: today, patient: "Bob Marks", doctor: "Thierry Yabre"},
	{id: 4, time: "10:30", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 5, time: "11:00", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
]

function AdminAppointmentsTable({ date, setDate, setDisplay, mode, setMode }) {
	const [appointments, setAppointments] = useState(dummyData);

	// useEffect(() => {
	// 	fetch(`/appointments/date/${date}`)
	// 		.then((res) => {
	// 			if (res.ok) {
	// 				res.json().then((appts) => setAppointments(appts));
	// 			}
	// 			// errors necessary?
	// 		})
	// }, [date])

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

	function handleClickAppointment(appt) {
		if (handleAlert()) {
			const payload = {data: appt, page: "appointment-edit"};
			setDisplay(payload);
		}
	}

	function onClickCreateAppointment() {
		if (handleAlert()) {
			setDisplay({page: "appointment-new"});
			setMode("create-appointment");
		}
	}

	return (
		<div id="appts-table-container">
			<div id="appts-table-header">
				<h2>Appointments</h2>
				<button onClick={onClickCreateAppointment}>
					Create Appointment
				</button>
			</div>
			<input
				type="date"
				onChange={(e) => setDate(e.target.value)}
				value={date}
			/>
			<table id="appts-table">
				<tbody>
					<tr>
						<th style={{width: "14%"}}>Time</th>
						<th style={{width: "43%"}} >Patient</th>
						<th style={{width: "43%"}}>Doctor</th>
					</tr>
					{appointments.map((appt) => (
						<AdminAppointment
							key={appt.id}
							appt={appt}
							handleOnClick={handleClickAppointment}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminAppointmentsTable;