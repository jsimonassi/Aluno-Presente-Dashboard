import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { useAppTheme } from "./contexts/Theme";

function App() {

	const {currentTheme} = useAppTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<Routes />
		</ThemeProvider>
	);
}

export default App;
