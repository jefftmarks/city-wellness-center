import React, { useState, useEffect } from "react";
import PatientAppointment from "./PatientAppointment";
import "./PatientAppointmentsTable.css";

function PatientAppointmentsTable({ user }) {
	const [appointments, setAppointments] = useState([]);

	// Populate table with patients upcoming appointments
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
			<table id="patient-appts-table-heading">
				<thead>
					<tr>
						<th style={{width: "20%"}}>Date</th>
						<th style={{width: "20%"}} >Time</th>
						<th style={{width: "60%"}}>Doctor</th>
					</tr>
				</thead>
			</table>
			<div id="patient-appts-table-div">
				<table id="patient-appts-table">
					<thead>
						<tr>
							<th style={{width: "20%"}}></th>
							<th style={{width: "20%"}} ></th>
							<th style={{width: "60%"}}></th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment) => (
							<PatientAppointment
								key={appointment.id}
								appointment={appointment}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default PatientAppointmentsTable;