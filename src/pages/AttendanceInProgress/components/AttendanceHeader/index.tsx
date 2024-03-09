import React from "react";
import logo from "../../../../assets/images/whiteLogo.png";
import { LogoContainer } from "./styles";


export const AttendanceHeader = () => {
	return (
		<LogoContainer>
			<img src={logo} alt="logo" />
		</LogoContainer>
	);
};