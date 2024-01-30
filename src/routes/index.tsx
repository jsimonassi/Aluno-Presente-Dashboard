import React from "react";
import {
	Routes,
	Route,
	BrowserRouter as Router,
	Navigate,
} from "react-router-dom";
import { useAppTheme } from "../contexts/Theme";
import "../assets/styles/App.css";
import GlobalStyle from "../assets/styles/GlobalStyle";
import CONSTANTS from "../constants";
import PrivateRoute from "../services/auth/PrivateRoute";
import Menu from "../components/Menu";
import { About, AttendanceInProgress, ErrorPage, MyClasses, OldClasses, PostLogin } from "../pages";

const MainRoutes = () => {

	const { currentTheme } = useAppTheme();

	return (
		<Router>
			<GlobalStyle theme={currentTheme} />
			<Routes>
				<Route path="/" element={<Navigate to={"/" + CONSTANTS.ROUTES.DASHBOARD + "/" + CONSTANTS.ROUTES.OPTIONS.MY_CLASSES} />}/>
				<Route path={CONSTANTS.ROUTES.POST_LOGIN} element={<PostLogin/>} />

				<Route path={CONSTANTS.ROUTES.DASHBOARD} element={<PrivateRoute> <Menu renderAsPartial={true} /> </PrivateRoute>}>
					<Route path={CONSTANTS.ROUTES.OPTIONS.MY_CLASSES} element={<PrivateRoute> <MyClasses /> </PrivateRoute>} />
					<Route path={CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES} element={<PrivateRoute> <OldClasses /> </PrivateRoute>} />
					<Route path={CONSTANTS.ROUTES.OPTIONS.ABOUT} element={<PrivateRoute> <About /> </PrivateRoute>} />
				</Route>

				<Route path={CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS+"/:id"} element={<PrivateRoute> <AttendanceInProgress /> </PrivateRoute>}/>

				<Route path={ CONSTANTS.ROUTES.ERROR} element={<ErrorPage/>} />

				<Route path="auth/*" element={<div/>}/>
			</Routes>
		</Router>
	);
};

export default MainRoutes;