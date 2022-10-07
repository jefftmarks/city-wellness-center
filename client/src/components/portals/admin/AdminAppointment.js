import React from "react";

function AdminAppointment({ appointment, handleOnClick }) {

	// reformat time
	let formattedTime;
	
	if (appointment) {
		let hour = parseInt(appointment.time.slice(0, 2));
		let minutes = appointment.time.slice(3, 5);
		if (hour === 0) {
			formattedTime = `12:${minutes} AM`;
		} else if (hour === 12) {
			formattedTime = `12:${minutes} PM`;
		} else if (hour > 0 && hour < 12) {
			formattedTime = `${hour}:${minutes} AM`;
		} else {
			formattedTime = `${hour - 12}:${minutes} PM`;
		}
	}

	return (
		<tr onClick={() => handleOnClick(appointment)}>
			<td>{formattedTime}</td>
			<td>{appointment.patient.first_name} {appointment.patient.last_name}</td>
			<td>{appointment.doctor.first_name} {appointment.doctor.last_name}</td>
		</tr>
	)
}

export default AdminAppointment;