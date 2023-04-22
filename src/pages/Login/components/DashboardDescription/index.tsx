import React from "react";
import { Container, InfoStack } from "./styles";
import logo from "../../../../assets/images/dashboardInfo.png";
import MESSAGES from "../../../../constants/messages";


const DashboardDescription = () => {

	return (
		<Container>
			<img src={logo} alt="Professora e aluno" />
			<InfoStack>
				<h1>{MESSAGES.LOGIN.DASHBOARD}</h1>
				<p>{MESSAGES.LOGIN.DESCRIPTION}</p>
			</InfoStack>
		</Container>
	);
};

export default DashboardDescription;