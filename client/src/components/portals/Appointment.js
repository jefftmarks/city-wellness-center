import React from "react";

function Appointment({ appt, handleOnClick }) {
	return (
		<tr onClick={() => handleOnClick(appt)}>
			<td>{appt.time}</td>
			<td>{appt.patient}</td>
			<td>{appt.doctor}</td>
		</tr>
	)
}

export default Appointment;