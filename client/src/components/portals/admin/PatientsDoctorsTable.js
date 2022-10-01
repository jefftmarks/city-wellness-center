import React, { useState, useEffect } from "react";
import Record from "./Record";
import "./PatientsDoctorsTable.css";

const patients = [
	{id: 1, last_name: "Marks", first_name: "Jeff"},
	{id: 2, last_name: "Marks", first_name: "Jeff"},
	{id: 3, last_name: "Marks", first_name: "Jeff"},
	{id: 4, last_name: "Marks", first_name: "Jeff"},
	{id: 5, last_name: "Marks", first_name: "Jeff"}
]

const doctors = [
	{id: 1, last_name: "Yabre", first_name: "Thierry"},
	{id: 2, last_name: "Yabre", first_name: "Thierry"},
	{id: 3, last_name: "Yabre", first_name: "Thierry"},
	{id: 4, last_name: "Yabre", first_name: "Thierry"},
	{id: 5, last_name: "Yabre", first_name: "Thierry"}
]

function PatientsDoctorsTable({ setDisplay }) {
	const [category, setCategory] = useState("patients");
	const [records, setRecords] = useState(patients);

	function handleChangeCategory(category) {
		setCategory(category);
		if (category === "patients") {
			setRecords(patients);
		} else {
			setRecords(doctors);
		}
	}

	// useEffect(() => {
	// 	fetch(`/${category}`)
	// 		.then((res) => res.json())
	// 		.then((records) => setRecords(records))
	// 		.catch((err) => console.error(err));
	// }, [category]);

	function handleClickRecord(record) {
		const payload = {data: record, mode: "record-edit"};
		setDisplay(payload);
	}

	return (
		<div id="patients-drs-table-container">
			<button
				id="show-patients-btn"
				className={category === "patients" ? "selected" : null}
				onClick={() => handleChangeCategory("patients")}
			>
				Patients
			</button>
			<button
				id="show-doctors-btn"
				className={category === "doctors" ? "selected" : null}
				onClick={() => handleChangeCategory("doctors")}
			>
				Doctors
			</button>
		<table id="patients-drs-table">
			<tbody>
				<tr>
					<th style={{width: "4%"}} >ID</th>
					<th style={{width: "48%"}}>Last Name</th>
					<th style={{width: "48%"}} >First Name</th>
				</tr>
				{records.map((record) => (
					<Record
						key={record.id}
						record={record}
						handleOnClick={handleClickRecord}
					/>
				))}
			</tbody>
		</table>
	</div>
	)
}

export default PatientsDoctorsTable;