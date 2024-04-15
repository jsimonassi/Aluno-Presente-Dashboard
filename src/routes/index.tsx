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
import { About, AttendanceInProgressQrCode, AttendanceInProgressSessionCode, Consent, MyClasses, Notifications, OldClasses, PostLogin, Privacy, TermsAndPolice } from "../pages";

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
					<Route path={CONSTANTS.ROUTES.OPTIONS.NOTIFICATIONS} element={<PrivateRoute> <Notifications /> </PrivateRoute>} />
					<Route path={CONSTANTS.ROUTES.OPTIONS.ABOUT} element={<PrivateRoute> <About /> </PrivateRoute>} />
				</Route>

				<Route path={CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_QR_CODE+"/:id"} element={<PrivateRoute> <AttendanceInProgressQrCode /> </PrivateRoute>}/>
				<Route path={CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_SESSION_CODE+"/:id"} element={<PrivateRoute> <AttendanceInProgressSessionCode /> </PrivateRoute>}/>

				<Route path="auth/*" element={<div/>}/>

				<Route path={CONSTANTS.ROUTES.TERMS} element={<TermsAndPolice />} />
				<Route path={CONSTANTS.ROUTES.PRIVACY} element={<Privacy />} />
				<Route path={CONSTANTS.ROUTES.CONSENT} element={<Consent />} />
			</Routes>
		</Router>
	);
};

export default MainRoutes;