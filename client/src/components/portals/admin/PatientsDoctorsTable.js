import React, { useState, useEffect } from "react";
import Record from "./Record";
import "./PatientsDoctorsTable.css";

const patients = [
	{id: 1, last_name: "Marks", first_name: "Jeff"},
	{id: 2, last_name: "Marks", first_name: "Billy"},
	{id: 3, last_name: "Marks", first_name: "Joe"},
	{id: 4, last_name: "Marks", first_name: "Sarah"},
	{id: 5, last_name: "Marks", first_name: "Emily"}
]

const doctors = [
	{id: 1, last_name: "Yabre", first_name: "Thierry"},
	{id: 2, last_name: "Yabre", first_name: "Marcus"},
	{id: 3, last_name: "Yabre", first_name: "Hannah"},
	{id: 4, last_name: "Yabre", first_name: "Beverly"},
	{id: 5, last_name: "Yabre", first_name: "Chris"}
]

function PatientsDoctorsTable({ setDisplay, mode, setPatient, setDoctor }) {
	const [category, setCategory] = useState("patients");
	const [records, setRecords] = useState(patients);

	const categoryHeader = category[0].toUpperCase() + category.slice(1);

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
		switch (mode) {
			case "edit":
				alert("You've made changes to the record. Please submit or discard your changes before proceeding.");
				break;
		 	case "create":
				category === "patients" ? setPatient(record) : setDoctor(record)
				break;
			default:
				const payload = {data: record, page: "record-edit"};
				setDisplay(payload);
		}
	}

	return (
		<div id="patients-drs-table-container">
			<h2>{categoryHeader}</h2>
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