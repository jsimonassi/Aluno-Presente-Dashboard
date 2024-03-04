import React, { useEffect } from "react";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { useAppTheme } from "./contexts/Theme";
import { Toaster } from "react-hot-toast";
import { useUser } from "./contexts/User";
import { useAttendance } from "./contexts/Attendance";

function App() {

	const {currentTheme} = useAppTheme();
	const { loggedUser } = useUser();
	const { recoverAttendanceCache } = useAttendance();

	useEffect(() => {
		if (loggedUser) {
			recoverAttendanceCache();
		}
	}, [loggedUser]);

	return (
		<ThemeProvider theme={currentTheme}>
			<Toaster
				toastOptions={{
					style: {
						fontFamily: "Light"
					},
					success: {
						iconTheme: {
							primary: "green",
							secondary: "white",
						},
					},
				}}
			/>
			<Routes />
		</ThemeProvider>
	);
}

export default App;
