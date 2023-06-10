import React from "react";
import { BigButton, Container } from "./styles";
import MESSAGES from "../../../../../../../constants/messages";


const AddStudents = () => {

	//TODO: Adicionar modais de add students

	return (
		<Container>
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.SELECT_OPTION}</h1>
			<BigButton>
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS}</h3>
				<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS_DESCRIPTION}</p>
			</BigButton>
			<BigButton>
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD}</h3>
				<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD_DESCRIPTION}</p>
			</BigButton>
		</Container>
	);
};

export default AddStudents;