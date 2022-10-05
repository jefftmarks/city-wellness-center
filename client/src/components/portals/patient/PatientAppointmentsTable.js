import React, { useState, useEffect } from "react";
import PatientAppointment from "./PatientAppointment";
import "./PatientAppointmentsTable.css";

function PatientAppointmentsTable({ user }) {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		fetch(`/appointments/upcoming/${user.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((appointments) => {
						setAppointments(appointments);
					});
				} else {
					res.json().then((errors) => console.log(errors));
				}
			})
	}, [user]);

	return (
		<div id="patient-appts-table-container">
			<h2>Appointments</h2>
			<table id="patient-appts-table">
				<tbody>
					<tr>
					<th style={{width: "20%"}}>Date</th>
					<th style={{width: "20%"}} >Time</th>
					<th style={{width: "60%"}}>Doctor</th>
					</tr>
					{appointments.map((appointment) => (
						<PatientAppointment
							key={appointment.id}
							appointment={appointment}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default PatientAppointmentsTable;