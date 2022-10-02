import React, { useState, useEffect } from "react";
import Record from "./Record";
import "./PatientsDoctorsTable.css";

const patients = [
	{id: 1, last_name: "Marks", first_name: "Jeff", email: "jeff@jeff.com", phone: "555-555-5555"},
	{id: 2, last_name: "Marks", first_name: "Billy", email: "jeff@jeff.com", phone: "555-555-5555"},
	{id: 3, last_name: "Marks", first_name: "Joe", email: "jeff@jeff.com", phone: "555-555-5555"},
	{id: 4, last_name: "Marks", first_name: "Sarah", email: "jeff@jeff.com", phone: "555-555-5555"},
	{id: 5, last_name: "Marks", first_name: "Emily", email: "jeff@jeff.com", phone: "555-555-5555"}
]

const doctors = [
	{id: 1, last_name: "Yabre", first_name: "Thierry", email: "doc@doctor.com", phone: "555-555-5555"},
	{id: 2, last_name: "Yabre", first_name: "Marcus", email: "doc@doctor.com", phone: "555-555-5555"},
	{id: 3, last_name: "Yabre", first_name: "Hannah", email: "doc@doctor.com", phone: "555-555-5555"},
	{id: 4, last_name: "Yabre", first_name: "Beverly", email: "doc@doctor.com", phone: "555-555-5555"},
	{id: 5, last_name: "Yabre", first_name: "Chris", email: "doc@doctor.com", phone: "555-555-5555"}
]

function PatientsDoctorsTable({ setDisplay, mode, setMode, setPatient, setDoctor, category, setCategory }) {
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

	function handleAlert() {
		switch (mode) {
			case "edit":
				alert("You've made changes to the record. Please submit or discard your changes before proceeding.");
				return false;
			case "create-record":
				alert("Please submit or discard the new record before proceeding.");
				return false;
			default:
				return true;
		}
	}

	function handleClickRecord(record) {
		if (!handleAlert()) return; 
		if (mode === "create-appointment") {
			category === "patients" ? setPatient(record) : setDoctor(record)
		} else {
			const payload = {
				data: {...record, category: category},
				page: "record-edit"
			};
			setDisplay(payload);
		}
	}

	function onClickCreateRecord() {
		if (mode === "create-appointment") {
			alert("Please submit or discard the new appointment before proceeding.");
			return;
		}
		if (handleAlert()) {
			setDisplay({page: "record-new", category: category});
			setMode("create-record");
		}
	}

	return (
		<div id="patients-drs-table-container">
			<div id="patients-drs-table-header">
				<h2>{categoryHeader}</h2>
				<button id="create-record-btn" onClick={onClickCreateRecord}>
					Create {category === "patients" ? "Patient" : "Doctor"}
				</button>
			</div>
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
						handleOnClick={handleClickRecord}
					/>
				))}
			</tbody>
		</table>
	</div>
	)
}

export default PatientsDoctorsTable;