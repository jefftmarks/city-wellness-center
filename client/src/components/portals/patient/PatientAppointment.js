import React from "react";

function PatientAppointment({ appointment }) {

	let formattedDate;
	let formattedTime;

	if (appointment.date) {
		// reformat date
		let str = appointment.date;
		let mm = str.slice(5, 7);
		let dd;
		if (str[8] === "0") {
			dd = str.slice(9, 10);
		} else {
			dd = str.slice(8, 10);
		}
		let yyyy = str.slice(0, 4);
		formattedDate = `${mm}/${dd}/${yyyy}`;
		
		// reformat time
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
		<tr>
			<td>{formattedDate}</td>
			<td>{formattedTime}</td>
			<td>{appointment.doctor.first_name} {appointment.doctor.last_name}</td>
		</tr>
	)
}

export default PatientAppointment;