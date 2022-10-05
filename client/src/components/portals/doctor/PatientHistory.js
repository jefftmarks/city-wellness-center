import React from "react";
import PatientAppointment from "./PatientAppointment";
import "./PatientHistory.css";

function PatientHistory({ appointments, handleClickAppointment, selected}) {

	if (!appointments) return <p>Loading...</p>

	return (
		<table id="history-table">
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
						handleOnClick={handleClickAppointment}
						selected={selected}
					/>
				))}
			</tbody>
		</table>
	);
}

export default PatientHistory;