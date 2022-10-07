import React from "react";
import PatientAppointment from "./PatientAppointment";
import "./PatientHistory.css";

function PatientHistory({ appointments, handleClickAppointment, selected}) {

	if (!appointments) return <p>Loading...</p>

	return (
		<div>
			<table id="history-table-heading">
				<thead>
						<tr>
							<th style={{width: "20%"}}>Date</th>
							<th style={{width: "20%"}}>Time</th>
							<th style={{width: "60%"}}>Doctor</th>
						</tr>
				</thead>
			</table>
			<div id="history-table-div">
				<table id="history-table">
					<thead>
						<tr>
								<th style={{width: "20%"}}></th>
								<th style={{width: "20%"}}></th>
								<th style={{width: "60%"}}></th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment) => (
							<PatientAppointment
								key={appointment.id}
								appointment={appointment}
								handleOnClick={handleClickAppointment}
								selected={selected}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PatientHistory;