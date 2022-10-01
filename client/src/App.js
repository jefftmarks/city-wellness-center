import React, { useState } from "react";
import NavBar from "./components/login-page/NavBar";
import Login from "./components/login-page/Login";
import "./App.css";

function App() {
	const [user, setUser] = useState(null);

	if (!user) return (
		<div>
			<NavBar />
			<Login />
		</div>
	)

  return (
    <div className="App">
    </div>
  );

}

export default App;
