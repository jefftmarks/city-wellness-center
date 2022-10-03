import React from "react";

function PatientAppointment({ appointment, handleOnClick, selected }) {

	let formattedDate;

	if (appointment) {
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
	}

 	return (
		<tr
			onClick={() => handleOnClick(appointment)}
			className={selected === appointment.id ? "selected" : null}
		>
			<td>{formattedDate}</td>
			<td>{appointment.time}</td>
		</tr>
	)
}

export default PatientAppointment;