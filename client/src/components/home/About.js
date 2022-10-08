import React, { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import Footer from "./Footer";
import "./About.css";

function About() {
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		fetch("/doctors")
			.then((res) => res.json())
			.then((data) => {setDoctors(data)});
	}, [])

	return (
		<div id="about-page">
			<div id="about-page-container">
				<div id="doctor-card-container">
					{doctors.map((doctor) => (
						<DoctorCard key={doctor.id} doctor={doctor} />
					))}
				</div>
				{/* <Footer /> */}
			</div>
		</div>
	);
}

export default About;