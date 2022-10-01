import React from "react";

function Record({ record, handleOnClick }) {
	return (
		<tr onClick={() => handleOnClick(record)}>
			<td>{record.id}</td>
			<td>{record.last_name}</td>
			<td>{record.first_name}</td>
		</tr>
	)
}

export default Record;