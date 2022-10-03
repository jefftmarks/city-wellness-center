import React from "react";

function DocAppointment({ appt, handleOnClick }) {
	return (
		<tr onClick={() => handleOnClick(appt)}>
			<td>{appt.time}</td>
			<td>{appt.patient}</td>
		</tr>
	)
}

export default DocAppointment;