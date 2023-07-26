import React, {useState} from "react";
import { BigButton, Container } from "./styles";
import MESSAGES from "../../../../../../../constants/messages";
import { AddFromManualModal, AddFromXlsxModal } from "./components";


const AddStudents = () => {

	const [addFromXlsxModalIsOpen, setAddFromXlsxModalIsOpen] = useState(false);
	const [addFromManualModalIsOpen, setAddFromManualModalIsOpen] = useState(false);


	return (
		<Container>
			<AddFromXlsxModal isOpen={addFromXlsxModalIsOpen} onClose={() => setAddFromXlsxModalIsOpen(false)} />
			<AddFromManualModal isOpen={addFromManualModalIsOpen} onClose={() => setAddFromManualModalIsOpen(false)} />
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.SELECT_OPTION}</h1>
			<BigButton onClick={() => setAddFromXlsxModalIsOpen(true)}>
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS}</h3>
				<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS_DESCRIPTION}</p>
			</BigButton>
			<BigButton onClick={() => setAddFromManualModalIsOpen(true)}>
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD}</h3>
				<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD_DESCRIPTION}</p>
			</BigButton>
		</Container>
	);
};

export default AddStudents;