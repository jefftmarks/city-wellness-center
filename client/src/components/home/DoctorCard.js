import React from "react";
import "./DoctorCard.css";

function DoctorCard({ doctor }) {
	return (
		<div className="doctor-card">
			<img src={doctor.image} alt="doctor" />
			<div className="doctor-info">
				<p>{doctor.first_name} {doctor.last_name}</p>
				<p>{doctor.certification}</p>
				<div className="card-line"></div>
				<p>"{doctor.bio}"</p>
			</div>
		</div>
	);
}

export default DoctorCard;