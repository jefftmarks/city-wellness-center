import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import "./AppointmentsTable.css";

const dummyData = [
	{id: 1, time: "09:00", date: "2022-10-15", patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 2, time: "10:00", date: "2022-10-15", patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 3, time: "10:30", date: "2022-10-15", patient: "Bob Marks", doctor: "Thierry Yabre"},
	{id: 4, time: "10:30", date: "2022-10-15", patient: "Jeff Marks", doctor: "Thierry Yabre"},
	{id: 5, time: "11:00", date: "2022-10-15", patient: "Jeff Marks", doctor: "Thierry Yabre"},
]

function AppointmentsTable({ setDisplay }) {
	const [appointments, setAppointments] = useState(dummyData);
	const [date, setDate] = useState("");

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
		const payload = {data: appt, mode: "appointment-edit"};
		setDisplay(payload);
	}

	return (
		<div id="appts-table-container">
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
		</div>
	)
}

export default AppointmentsTable;