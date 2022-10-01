import React, { useEffect, useState } from "react";
import "./CreateAppointment.css";

function CreateAppointment({ setMode, patient, doctor }) {
	const intializedForm = {date: "", time: ""}
	const [formData, setFormData] = useState(intializedForm);

	useEffect(() => {
		setFormData({
			...formData,
			patient_id: patient.id,
			doctor_id: doctor.id
		})
	}, [patient, doctor]);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function renderFullName(record) {
		return record.first_name + " " + record.last_name;
	}

	return (
		<div id="create-appt">
			<h2>Create Appointment</h2>
			<form id="create-appt-form">
					<div>
						<small>Select Record from Patients List</small>
						<div className="create-appt-name">
							Patient: {patient ? renderFullName(patient) : null}
						</div>
					</div>
					<div>
						<small>Select Record from Doctors List</small>
						<div className="create-appt-name">
							Doctor: {doctor ? renderFullName(doctor) : null}
						</div> 
					</div>
				<label>Date:
					<input
					type="date"
					name="date"
					onChange={handleChange}
					value={formData.date}
					/>
				</label>
				<label>Time:
					<input
					type="time"
					name="time"
					onChange={handleChange}
					value={formData.time}
					/>
				</label>
				<button>Submit Appointment</button>
				<button onClick={() => setMode("")}>Discard Appointment</button>
			</form>
		</div>
	)
}

export default CreateAppointment;