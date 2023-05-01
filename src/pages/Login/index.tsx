import React from "react";
import { Container, ContainerMobile } from "./styles";
import { useWindowDimensions } from "../../hooks";
import CONSTANTS from "../../constants";
import { DashboardDescription, LoginBox } from "./components";
import { useNavigate } from "react-router-dom";

const Login = () => {

	const {width} = useWindowDimensions();
	const navigate = useNavigate();

	const onLoginRequested = (email: string, password: string) => {
		console.log(" Email and password: ", email, password);
		navigate("/" + CONSTANTS.ROUTES.DASHBOARD + "/" + CONSTANTS.ROUTES.OPTIONS.MY_CLASSES);
	};

	if(width < CONSTANTS.SCREEN_SIZE.TABLET) {
		return (
			<ContainerMobile>
				<LoginBox onLoginHandler={onLoginRequested} />
			</ContainerMobile>
		);
	}
	
	return (
		<Container>
			<DashboardDescription />
			<LoginBox onLoginHandler={onLoginRequested} />
		</Container>
	);
};

export default Login;