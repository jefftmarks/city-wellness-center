import React, { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import "./About.css";

function About() {
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		fetch("/doctors")
			.then((res) => res.json())
			.then((data) => {setDoctors(data)});
	}, [])
	console.log(doctors)

	return (
		<div id="about-page">
			<div id="doctor-card-container">
				{doctors.map((doctor) => (
					<DoctorCard key={doctor.id} doctor={doctor} />
				))}
			</div>
		</div>
	);
}

export default About;