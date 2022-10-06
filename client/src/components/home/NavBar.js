import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

function NavBar() {

	return (
		<div id="navbar">
			<Link to="/"><p>Home</p></Link>
			<Link to="/about"><p>About</p></Link>
		</div>
	)
}

export default NavBar;