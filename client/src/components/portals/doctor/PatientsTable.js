import React, { useState, useEffect } from "react";
import Record from "../Record";
import "./PatientsTable.css";

function PatientsTable({ setDisplay, user, handleAlert }) {
	const [records, setRecords] = useState([]);

	// Populate with patients that belong to doctor
	useEffect(() => {
		fetch(`/patients/doctor/${user.id}`)
		.then((res) => {
			if (res.ok) {
				res.json().then((records) => setRecords(records));
			} else {
				res.json().then((errors) => console.log(errors));
			}			
		})
	}, [user]);


	function handleClickPatient(patient) {
		if (handleAlert()) {
			// Include page in payload to render correct form
			// Include type of "patient" in payload to conditionally render the patient display page
			const payload = {data: {...patient, type: "patient"}, page: "patient"};
			setDisplay(payload);
		}
	}

	return (
		<div id="patients-table-container">
			<h2>Patients</h2>
			<table id="patients-table-heading">
					<tr>
						<th style={{width: "20%"}}>Last Name</th>
						<th style={{width: "20%"}} >First Name</th>
						<th style={{width: "17%"}} >Phone</th>
						<th style={{width: "43%"}}>Email</th>
					</tr>
				</table>
			<div id="patients-table-div">
				<table id="patients-table">
					<tr>
						<th style={{width: "20%"}}></th>
						<th style={{width: "20%"}} ></th>
						<th style={{width: "17%"}} ></th>
						<th style={{width: "43%"}}></th>
					</tr>
					<tbody>
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
	</div>
	)
}

export default PatientsTable;