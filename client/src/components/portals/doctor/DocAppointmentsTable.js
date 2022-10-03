import React, { useState, useEffect } from "react";
import DocAppointment from "./DocAppointment";
import "./DocAppointmentsTable.css";

const today = new Date().toISOString().slice(0, 10);

const dummyData = [
	{id: 1, time: "09:00", date: today, patient_id: 2, patient: "Bob Marks", notes: "Discussed coping mechanisms."},
	{id: 2, time: "10:00", date: today, patient_id: 1, patient: "Jeff Marks", notes: "Talked about father."},
	{id: 3, time: "10:30", date: today, patient_id: 2, patient: "Bob Marks", notes: "Taught meditation techniques."},
	{id: 4, time: "10:30", date: today, patient_id: 1, patient: "Jeff Marks", notes: "Talked about siblings."},
	{id: 5, time: "11:00", date: today, patient_id: 1, patient: "Jeff Marks", notes: "Talked about mother."}
]

function DocAppointmentsTable({ setDisplay, setMode, handleAlert, user }) {
	const [date, setDate] = useState(today);
	const [appointments, setAppointments] = useState(dummyData);

	// useEffect(() => {
	// 	fetch(`/appointments/doctor/${user.id}/date/${date}`)
	// 		.then((res) => {
	// 			if (res.ok) {
	// 				res.json().then((appts) => setAppointments(appts));
	// 			}
	// 			// errors necessary?
	// 		})
	// }, [date, user])

	function handleClickAppointment(appointment) {
		if (handleAlert()) {
			const payload = {data: {...appointment, type: "appt" }, page: "patient"};
			setDisplay(payload);
		}
	}

	// function onClickCreateAppointment() {
	// 	if (handleAlert()) {
	// 		setDisplay({page: "appointment-new"});
	// 		setMode("create-appointment");
	// 	}
	// }

	return (
		<div id="dr-appts-table-container">
			<h2>Appointments</h2>
			<input
				type="date"
				onChange={(e) => setDate(e.target.value)}
				value={date}
			/>
			<table id="dr-appts-table">
				<tbody>
					<tr>
						<th style={{width: "14%"}}>Time</th>
						<th style={{width: "86%"}} >Patient</th>
					</tr>
					{appointments.map((appointment) => (
						<DocAppointment
							key={appointment.id}
							appointment={appointment}
							handleOnClick={handleClickAppointment}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DocAppointmentsTable;