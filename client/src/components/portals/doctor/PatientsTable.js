import React, { useState, useEffect } from "react";
import Record from "../Record";
import "./PatientsTable.css";

const patients = [
	{id: 1, last_name: "Marks", first_name: "Jeff", email: "jeff@jeff.com", phone: "555-555-5555"},
	{id: 2, last_name: "Marks", first_name: "Bob", email: "bob@bob.com", phone: "555-555-5555"}
]

function PatientsTable({ setDisplay, mode, setMode }) {
	const [records, setRecords] = useState(patients);

	// function handleChangeCategory(category) {
	// 	setCategory(category);
	// 	if (category === "patients") {
	// 		setRecords(patients);
	// 	} else {
	// 		setRecords(doctors);
	// 	}
	// }

	// useEffect(() => {
	// 	fetch(`/${category}`)
	// 		.then((res) => res.json())
	// 		.then((records) => setRecords(records))
	// 		.catch((err) => console.error(err));
	// }, [category]);

	// function handleAlert() {
	// 	switch (mode) {
	// 		case "edit":
	// 			alert("You've made changes to the record. Please submit or discard your changes before proceeding.");
	// 			return false;
	// 		case "create-record":
	// 			alert("Please submit or discard the new record before proceeding.");
	// 			return false;
	// 		default:
	// 			return true;
	// 	}
	// }

	// function handleClickRecord(record) {
	// 	if (!handleAlert()) return; 
	// 	if (mode === "create-appointment") {
	// 		category === "patients" ? setPatient(record) : setDoctor(record)
	// 	} else {
	// 		const payload = {
	// 			data: {...record, category: category},
	// 			page: "record-edit"
	// 		};
	// 		setDisplay(payload);
	// 	}
	// }

	// function onClickCreateRecord() {
	// 	if (mode === "create-appointment") {
	// 		alert("Please submit or discard the new appointment before proceeding.");
	// 		return;
	// 	}
	// 	if (handleAlert()) {
	// 		setDisplay({page: "record-new", category: category});
	// 		setMode("create-record");
	// 	}
	// }

	return (
		<div id="patients-table-container">
			<h2>Patients</h2>
		<table id="patients-table">
			<tbody>
				<tr>
					<th style={{width: "2%"}} >ID</th>
					<th style={{width: "20%"}}>Last Name</th>
					<th style={{width: "20%"}} >First Name</th>
					<th style={{width: "17%"}} >Phone</th>
					<th style={{width: "41%"}}>Email</th>
				</tr>
				{records.map((record) => (
					<Record
						key={record.id}
						record={record}
						// handleOnClick={handleClickRecord}
					/>
				))}
			</tbody>
		</table>
	</div>
	)
}

export default PatientsTable;