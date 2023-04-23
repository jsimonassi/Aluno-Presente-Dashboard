import React from "react";
import { Container, ContainerMobile } from "./styles";
import { useWindowDimensions } from "../../hooks";
import CONSTANTS from "../../constants";
import { DashboardDescription, LoginBox } from "./components";

const Login = () => {

	const {width} = useWindowDimensions();


	if(width < CONSTANTS.SCREEN_SIZE.TABLET) {
		return (
			<ContainerMobile>
				<LoginBox />
			</ContainerMobile>
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