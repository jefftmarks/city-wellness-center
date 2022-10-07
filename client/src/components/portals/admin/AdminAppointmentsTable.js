import React, { useEffect } from "react";
import AdminAppointment from "./AdminAppointment";
import "./AdminAppointmentsTable.css";

function AdminAppointmentsTable({ date, setDate, setDisplay, setMode, handleAlert, setAppointments, appointments }) {

	// Populate appointments according to date input (default date of today passed down as prop)
	useEffect(() => {
		fetch(`/appointments/date/${date}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((appointments) => setAppointments(appointments));
				}
			})
	}, [date])

	// Include page attribute in payload to determine form display
	function handleClickAppointment(appointment) {
		if (handleAlert()) {
			const payload = {data: appointment, page: "appointment-edit"};
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
			<table id="appts-table-heading">
				<thead>
					<tr>
						<th style={{width: "14%"}}>Time</th>
						<th style={{width: "43%"}}>Patient</th>
						<th style={{width: "43%"}}>Doctor</th>
					</tr>
				</thead>
			</table>
			<div id="appts-table-div">
				<table id="appts-table">
					<thead>
						<tr>
							<th style={{width: "14%"}}></th>
							<th style={{width: "43%"}} ></th>
							<th style={{width: "43%"}}></th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment) => (
							<AdminAppointment
								key={appointment.id}
								appointment={appointment}
								handleOnClick={handleClickAppointment}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminAppointmentsTable;