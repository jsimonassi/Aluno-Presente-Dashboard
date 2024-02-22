import React from "react";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { useAppTheme } from "./contexts/Theme";
import { Toaster } from "react-hot-toast";

function App() {

	const {currentTheme} = useAppTheme();

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
