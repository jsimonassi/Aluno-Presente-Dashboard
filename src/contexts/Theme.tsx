import React, { createContext, useContext, useState } from "react";
import { AppTheme } from "../types/Theme";
import { LightTheme } from "../assets/styles/theme";

interface AppThemeContextData {
    currentTheme: AppTheme;
    setCurrentTheme: (theme: AppTheme) => void;
}

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export const AppThemeContext = createContext({} as AppThemeContextData);

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {

	const [currentTheme, setCurrentTheme] = useState<AppTheme>(LightTheme);

	return (
		<AppThemeContext.Provider
			value={{
				currentTheme,
				setCurrentTheme
			}}>
			{children}
		</AppThemeContext.Provider>
	);
};

const useAppTheme = () => {
	const context = useContext(AppThemeContext);

	return context;
};

export { AppThemeProvider, useAppTheme };
