import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

function NavBar() {

	return (
		<div id="navbar">
			<Link to="/"><button>Home</button></Link>
			<Link to="/about"><button>About</button></Link>
			<Link to="/login"><button>Login</button></Link>
		</div>
	)
}

export default NavBar;