import React from "react";
import { AppThemeProvider } from "./Theme";
import { SessionProvider } from "./Session";
import { AttendanceProvider } from "./Attendance";
import { AddBatchProvider } from "./AddBatch";

interface AppProviderProps {
	children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<AppThemeProvider>
			<SessionProvider>
				<AttendanceProvider>
					<AddBatchProvider>
						{children}
					</AddBatchProvider>
				</AttendanceProvider>
			</SessionProvider>
		</AppThemeProvider>
	);
};

export default AppProvider;
