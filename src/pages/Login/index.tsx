import React from "react";
import { Container } from "./styles";
import { useWindowDimensions } from "../../hooks";
import CONSTANTS from "../../constants";
import { DashboardDescription, LoginBox } from "./components";

const Login = () => {

	const {width} = useWindowDimensions();


	if(width < CONSTANTS.SCREEN_SIZE.TABLET) {
		return (
			<Container>
				<h1>Mobile</h1>
			</Container>
		);
	}
	
	return (
		<Container>
			<DashboardDescription />
			<LoginBox />
		</Container>
	);
};

export default Login;