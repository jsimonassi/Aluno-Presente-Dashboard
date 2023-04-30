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
import CONSTANTS from "../constants";
import PrivateRoute from "../services/auth/PrivateRoute";
import Menu from "../components/Menu";
import { About, MyClasses, OldClasses } from "../pages/Dashboard";

const MainRoutes = () => {

	const { currentTheme } = useAppTheme();

	return (
		<Router>
			<GlobalStyle theme={currentTheme} />
			<Routes>
				<Route path="/" element={<Login/>} />
				<Route path={CONSTANTS.ROUTES.DASHBOARD} element={<PrivateRoute> <Menu renderAsPartial={true} isMainPage /> </PrivateRoute>}>
					<Route path={CONSTANTS.ROUTES.OPTIONS.MY_CLASSES} element={<PrivateRoute> <MyClasses /> </PrivateRoute>} />
					<Route path={CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES} element={<PrivateRoute> <OldClasses /> </PrivateRoute>} />
					<Route path={CONSTANTS.ROUTES.OPTIONS.ABOUT} element={<PrivateRoute> <About /> </PrivateRoute>} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MainRoutes;