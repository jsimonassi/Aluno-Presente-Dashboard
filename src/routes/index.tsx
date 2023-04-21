import React from "react";
import {
	Routes,
	Route,
	BrowserRouter as Router,
} from "react-router-dom";
import { Login } from "../pages";
import { useAppTheme } from "../contexts/Theme";
import "../assets/styles/App.css";
import GlobalStyle from "../assets/styles/GlobalStyle";

const MainRoutes = () => {

	const { currentTheme } = useAppTheme();

	return (
		<Router>
			<GlobalStyle theme={currentTheme} />
			<Routes>
				<Route path="/" element={<Login/>} />
			</Routes>
		</Router>
	);
};

export default MainRoutes;