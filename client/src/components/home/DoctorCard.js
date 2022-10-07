import React from "react";
import "./DoctorCard.css";

function DoctorCard({ doctor }) {
	return (
		<div className="doctor-card">
			<img
				src={doctor.image ? doctor.image : "https://www.exhibitindexes.com/product_images/uploaded_images/legal-pads.jpeg"}
				alt="doctor"
			/>
			<div className="doctor-info">
				<p>{doctor.first_name} {doctor.last_name}</p>
				<p>{doctor.certification ? doctor.certification : ""}</p>
				<div className="card-line"></div>
				<p>{doctor.bio ? `"${doctor.bio}"` : ""}</p>
			</div>
		</div>
	);
}

export default DoctorCard;