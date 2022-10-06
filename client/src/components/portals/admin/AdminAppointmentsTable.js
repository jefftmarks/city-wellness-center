import React, { useEffect } from "react";
import AdminAppointment from "./AdminAppointment";
import "./AdminAppointmentsTable.css";

function AdminAppointmentsTable({ date, setDate, setDisplay, setMode, handleAlert, setAppointments, appointments }) {

	useEffect(() => {
		fetch(`/appointments/date/${date}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((appointments) => setAppointments(appointments));
				}
			})
	}, [date])

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
				<tr>
					<th style={{width: "20%"}}>Last Name</th>
					<th style={{width: "20%"}} >First Name</th>
					<th style={{width: "17%"}} >Phone</th>
					<th style={{width: "43%"}}>Email</th>
				</tr>
			</table>
			<div id="appts-table-div">
				<table id="appts-table">
					<tr>
						<th style={{width: "14%"}}></th>
						<th style={{width: "43%"}} ></th>
						<th style={{width: "43%"}}></th>
					</tr>
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