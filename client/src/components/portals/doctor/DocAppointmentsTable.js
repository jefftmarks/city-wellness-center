import React, { useState, useEffect } from "react";
import DocAppointment from "./DocAppointment";
import "./DocAppointmentsTable.css";

const today = new Date().toISOString().slice(0, 10);

function DocAppointmentsTable({ setDisplay, handleAlert, user }) {
	const [date, setDate] = useState(today);
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		fetch(`/appointments/doctor/${user.id}/date/${date}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((appts) => setAppointments(appts));
				} else {
					res.json().then((errors) => console.log(errors));
				}
			})
	}, [date, user])

	function handleClickAppointment(appointment) {
		if (handleAlert()) {
			const payload = {data: {...appointment, type: "appt" }, page: "patient"};
			setDisplay(payload);
		}
	}

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