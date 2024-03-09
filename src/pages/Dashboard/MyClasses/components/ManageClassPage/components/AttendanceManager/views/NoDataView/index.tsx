import React from "react";
import { Container, EmptyContainer } from "./styles";
import MESSAGES from "../../../../../../../../../constants/messages";
import emptyImg from "../../../../../../../../../assets/images/emptyClassImg.svg";

export const NoDataView = () => {

	return (
		<Container>
			<EmptyContainer>
				<img src={emptyImg} alt="Nada para mostrar" />
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.NO_STUDENTS}</h3>
				<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.NO_STUDENTS_TIP}</p>
			</EmptyContainer>
		</Container>
	);
};