import React, {useState} from "react";
import { Container } from "./styles";
import MESSAGES from "../../../../../../../constants/messages";
import { AddFromManualModal, AddFromXlsxModal, FailToAddModal } from "./components";
import { BigButton } from "../../../../../../../components/Buttons";
import toast from "react-hot-toast";
import Api from "../../../../../../../services/api";
import { Student } from "../../../../../../../types/Student";
import { BatchAddResponseModel } from "../../../../../../../types/api/Student";

interface AddStudentsProps {
	courseId: string;
	onRefreshClassRequested: () => void;
}

const AddStudents = (props: AddStudentsProps) => {

	const [addFromXlsxModalIsOpen, setAddFromXlsxModalIsOpen] = useState(false);
	const [addFromManualModalIsOpen, setAddFromManualModalIsOpen] = useState(false);
	const [studentsWithFail, setStudentsWithFail] = useState<BatchAddResponseModel | null>(null);

	const onAddSingleRequest = (newStudent: Student) => {
		setAddFromManualModalIsOpen(false);
		const toastRef = toast.loading(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDING_STUDENT);
		Api.Student.addSingleStudent(newStudent, props.courseId)
			.then(() => {
				toast.success(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDED_STUDENT, { id: toastRef });
				props.onRefreshClassRequested();
			})
			.catch(() => {
				toast.error(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_ADDING_STUDENT, { id: toastRef });
			});
	};

	const onAddMultipleRequest = (newStudents: Student[]) => {
		setAddFromXlsxModalIsOpen(false);
		const toastRef = toast.loading(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDING_STUDENTS);
		Api.Student.addMultipleStudents(newStudents, props.courseId)
			.then((apiResponse) => {
				props.onRefreshClassRequested();
				if(apiResponse?.failed?.length > 0) {
					toast.error(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_ADDING_STUDENT, { id: toastRef });
					setStudentsWithFail(apiResponse);
					return;
				}
				toast.success(MESSAGES.MY_CLASSES.MANAGE_CLASS.STUDENTS_ADDED, { id: toastRef });
			})
			.catch(() => {
				toast.error(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_ADDING_STUDENT, { id: toastRef });
			});
	};

	return (
		<Container>
			<FailToAddModal 
				failedResponse={studentsWithFail}
				isOpen={studentsWithFail !== null}
				onClose={() => setStudentsWithFail(null)}
			/>
			<AddFromXlsxModal 
				isOpen={addFromXlsxModalIsOpen} 
				onClose={() => setAddFromXlsxModalIsOpen(false)}
				onAddStudentRequested={(newStudents) => onAddMultipleRequest(newStudents)}
			/>
			<AddFromManualModal 
				isOpen={addFromManualModalIsOpen} 
				onClose={() => setAddFromManualModalIsOpen(false)} 
				onAddStudentRequested={onAddSingleRequest}
			/>
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.SELECT_OPTION}</h1>
			<BigButton 
				onClick={() => setAddFromXlsxModalIsOpen(true)} 
				title={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS} 
				description={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS_DESCRIPTION} 
			/>
			<BigButton 
				onClick={() => setAddFromManualModalIsOpen(true)} 
				title={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD} 
				description={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD_DESCRIPTION} 
			/>
		</Container>
	);
};

export default AddStudents;