import React from "react";
import { UserProvider } from "./User";
import { AppThemeProvider } from "./Theme";
import { SessionProvider } from "./Session";

interface AppProviderProps {
	children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<AppThemeProvider>
			<UserProvider>
				<SessionProvider>
					{children}
				</SessionProvider>
			</UserProvider>
		</AppThemeProvider>
	);
};

export default AppProvider;
