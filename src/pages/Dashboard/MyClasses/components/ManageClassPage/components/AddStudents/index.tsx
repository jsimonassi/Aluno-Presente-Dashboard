import React, {useState} from "react";
import { Container } from "./styles";
import MESSAGES from "../../../../../../../constants/messages";
import { AddFromManualModal, AddFromXlsxModal } from "./components";
import { BigButton } from "../../../../../../../components/Buttons";


const AddStudents = () => {

	const [addFromXlsxModalIsOpen, setAddFromXlsxModalIsOpen] = useState(false);
	const [addFromManualModalIsOpen, setAddFromManualModalIsOpen] = useState(false);


	return (
		<Container>
			<AddFromXlsxModal isOpen={addFromXlsxModalIsOpen} onClose={() => setAddFromXlsxModalIsOpen(false)} />
			<AddFromManualModal isOpen={addFromManualModalIsOpen} onClose={() => setAddFromManualModalIsOpen(false)} />
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.SELECT_OPTION}</h1>
			<BigButton onClick={() => setAddFromXlsxModalIsOpen(true)} title={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS} description={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS_DESCRIPTION} />
			<BigButton onClick={() => setAddFromManualModalIsOpen(true)} title={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD} description={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD_DESCRIPTION} />
		</Container>
	);
};

export default AddStudents;