import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import "./AppointmentsTable.css";

const today = new Date().toISOString().slice(0, 10);

const dummyData = [
	{id: 1, time: "09:00", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 2, time: "10:00", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 3, time: "10:30", date: today, patient: "Bob Marks", doctor: "Thierry Yabre"},
	{id: 4, time: "10:30", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 5, time: "11:00", date: today, patient: "Jeff Marks", doctor: "Thierry Yabre"},
]

function AppointmentsTable({ date, setDate, setDisplay, mode, setMode }) {
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

	function handleClickAppointment(appt) {
		if (mode === "edit") {
			alert("You've made changes to the record. Please submit or discard your changes before proceeding.");
		} else if (mode === "create") {
			alert("Please submit or discard the new appointment before proceeding.");
		} else {
			const payload = {data: appt, page: "appointment-edit"};
			setDisplay(payload);
		}
	}

	function onClickCreateAppointment() {
		setDisplay({page: "appointment-new"});
		setMode("create");
	}

	return (
		<div id="appts-table-container">
			<h2>Appointments</h2>
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
						<Appointment
							key={appt.id}
							appt={appt}
							handleOnClick={handleClickAppointment}
						/>
					))}
				</tbody>
			</table>
			<button onClick={onClickCreateAppointment}>
				Create Appointment
			</button>
		</div>
	)
}

export default AppointmentsTable;