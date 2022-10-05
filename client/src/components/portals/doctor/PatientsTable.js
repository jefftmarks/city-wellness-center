import React, { useState, useEffect } from "react";
import Record from "../Record";
import "./PatientsTable.css";

function PatientsTable({ setDisplay, user, handleAlert }) {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		fetch(`/patients/doctor/${user.id}`)
		.then((res) => {
			if (res.ok) {
				res.json().then((records) => setRecords(records));
			}
				res.json().then((errors) => console.log(errors));
		})
	}, [user]);

	function handleClickPatient(patient) {
		if (handleAlert()) {
			const payload = {data: {...patient, type: "patient"}, page: "patient"};
			setDisplay(payload);
		}
	}

	return (
		<div id="patients-table-container">
			<h2>Patients</h2>
		<table id="patients-table">
			<tbody>
				<tr>
					<th style={{width: "20%"}}>Last Name</th>
					<th style={{width: "20%"}} >First Name</th>
					<th style={{width: "17%"}} >Phone</th>
					<th style={{width: "43%"}}>Email</th>
				</tr>
				{records.map((record) => (
					<Record
						key={record.id}
						record={record}
						handleOnClick={handleClickPatient}
					/>
				))}
			</tbody>
		</table>
	</div>
	)
}

export default PatientsTable;