import React from "react";
import { AppThemeProvider } from "./Theme";
import { SessionProvider } from "./Session";
import { AttendanceProvider } from "./Attendance";

interface AppProviderProps {
	children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<AppThemeProvider>
			<SessionProvider>
				<AttendanceProvider>
					{children}
				</AttendanceProvider>
			</SessionProvider>
		</AppThemeProvider>
	);
};

export default AppProvider;
