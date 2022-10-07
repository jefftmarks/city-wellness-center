import React, { useState, useEffect } from "react";
import Record from "../Record";
import "./PatientsDoctorsTable.css";

function PatientsDoctorsTable({ setDisplay, mode, setMode, setPatient, setDoctor, category, setCategory, records, setRecords }) {

	// patients --> Patient, doctors --> Doctor
	const categoryHeader = category[0].toUpperCase() + category.slice(1);

	useEffect(() => {
		fetch(`/${category}`)
			.then((res) => res.json())
			.then((records) => setRecords(records))
			.catch((err) => console.error(err));
	}, [category]);


	// Alert handling specific to this component
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

	// If in create appointment mode, clicking on patient or doctor will update create appointment form
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
			// include category in payload to determine whether creating patient or doctor
			setDisplay({page: "record-new", category: category});
			setMode("create-record");
		}
	}

	return (
		<div id="pd-table-container">
			<div id="pd-table-header">
				<h2>{categoryHeader}</h2>
				<button id="create-record-btn" onClick={onClickCreateRecord}>
					Create {category === "patients" ? "Patient" : "Doctor"}
				</button>
			</div>
			<button
				id="show-patients-btn"
				className={category === "patients" ? "selected" : null}
				onClick={() => setCategory("patients")}
			>
				Patients
			</button>
			<button
				id="show-doctors-btn"
				className={category === "doctors" ? "selected" : null}
				onClick={() => setCategory("doctors")}
			>
				Doctors
			</button>
			<table id="pd-table-heading">
				<thead>
					<tr>
						<th style={{width: "20%"}}>Last Name</th>
						<th style={{width: "20%"}} >First Name</th>
						<th style={{width: "17%"}} >Phone</th>
						<th style={{width: "43%"}}>Email</th>
					</tr>
				</thead>
			</table>
			<div id="pd-table-div">
				<table id="pd-table">
					<thead>
						<tr id="pd-table-invis">
							<th style={{width: "20%"}}></th>
							<th style={{width: "20%"}} ></th>
							<th style={{width: "17%"}}></th>
							<th style={{width: "43%"}}></th>
						</tr>
					</thead>
					<tbody>
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
	</div>
	)
}

export default PatientsDoctorsTable;