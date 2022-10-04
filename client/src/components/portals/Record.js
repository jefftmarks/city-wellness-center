import React from "react";

function Record({ record, handleOnClick }) {
	return (
		<tr onClick={() => handleOnClick(record)}>
			<td>{record.last_name}</td>
			<td>{record.first_name}</td>
			<td>{record.phone}</td>
			<td>{record.email}</td>
		</tr>
	)
}

export default Record;