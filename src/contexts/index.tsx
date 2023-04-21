import React from "react";
import { TeacherProvider } from "./Teacher";
import { AppThemeProvider } from "./Theme";

interface AppProviderProps {
    children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<AppThemeProvider>
			<TeacherProvider>
				{ children }
			</TeacherProvider>
		</AppThemeProvider>
	);
};

export default AppProvider;
