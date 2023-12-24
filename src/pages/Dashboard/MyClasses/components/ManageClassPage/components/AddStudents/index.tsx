import React, {useState} from "react";
import { Container } from "./styles";
import MESSAGES from "../../../../../../../constants/messages";
import { AddFromManualModal, AddFromXlsxModal } from "./components";
import { BigButton } from "../../../../../../../components/Buttons";
import toast from "react-hot-toast";
import Api from "../../../../../../../services/api";
import { Student } from "../../../../../../../types/Student";

interface AddStudentsProps {
	courseId: string;
}

const AddStudents = (props: AddStudentsProps) => {

	const [addFromXlsxModalIsOpen, setAddFromXlsxModalIsOpen] = useState(false);
	const [addFromManualModalIsOpen, setAddFromManualModalIsOpen] = useState(false);

	const onAddSingleRequest = (newStudent: Student) => {
		setAddFromManualModalIsOpen(false);
		const toastRef = toast.loading(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDING_STUDENT);
		Api.Student.addSingleStudent(newStudent, props.courseId)
			.then(() => {
				toast.success(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDED_STUDENT, { id: toastRef });
			})
			.catch(() => {
				toast.error(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_ADDING_STUDENT, { id: toastRef });
			});
	};

	return (
		<Container>
			<AddFromXlsxModal isOpen={addFromXlsxModalIsOpen} onClose={() => setAddFromXlsxModalIsOpen(false)} />
			<AddFromManualModal isOpen={addFromManualModalIsOpen} onClose={() => setAddFromManualModalIsOpen(false)} onAddStudentRequested={onAddSingleRequest}/>
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.SELECT_OPTION}</h1>
			<BigButton onClick={() => setAddFromXlsxModalIsOpen(true)} title={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS} description={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS_DESCRIPTION} />
			<BigButton onClick={() => setAddFromManualModalIsOpen(true)} title={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD} description={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD_DESCRIPTION} />
		</Container>
	);
};

export default AddStudents;