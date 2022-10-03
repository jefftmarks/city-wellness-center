import React, { useState } from "react";
import PatientAppointment from "./PatientAppointment";
import "./PatientHistory.css";

function PatientHistory({ appointments, setAppointment }) {
	const [selected, setSelected] = useState(null);

	function handleClickAppointment(appointment) {
		setSelected(appointment.id);
		setAppointment(appointment)
	}

	if (!appointments) return <p>Loading...</p>

	return (
		<table id="history-table">
			<tbody>
				<tr>
					<th style={{width: "50%"}}>Date</th>
					<th style={{width: "50%"}} >Time</th>
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