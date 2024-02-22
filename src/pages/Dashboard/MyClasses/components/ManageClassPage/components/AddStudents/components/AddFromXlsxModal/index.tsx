import React, { useEffect, useState } from "react";
import { InputFileContainer, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, ResultContainer } from "./styles";
import { MainButton } from "../../../../../../../../../components/Buttons";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";
import { FileInput } from "../../../../../../../../../components/Inputs";
import { Helpers } from "../../../../../../../../../helpers";
import { Student } from "../../../../../../../../../types/Student";
import { ResultTable } from "./components";
import { Feedback } from "../../../../../../../../../types/Feedback";

interface AddFromXlsxModalProps {
	isOpen: boolean;
	onClose: (feedback: Feedback) => void;
	onAddStudentRequested: (newStudent: Student[]) => void;
}

const AddFromXlsxModal = (props: AddFromXlsxModalProps) => {

	const [studentsList, setStudentsList] = useState<Student[] | null>(null);

	useEffect(() => {
		setStudentsList(null);
	}, [props.isOpen]);

	const handleAddStudents = async (file: File) => {
		const studentsFound = await Helpers.XlsxManager.getStudentsFromXlsx(file);
		setStudentsList(studentsFound);
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onClose({isOpen: false, success: false}); }} />
					</div>
				</ModalHeader>
				<ModalBody >
					<InputFileContainer>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.TABLE}</h3>
						<FileInput
							onChange={(file) => handleAddStudents(file)}
							accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						/>
					</InputFileContainer>
					<ResultContainer>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.FINNED_STUDENTS}</h3>
						<ResultTable foundStudents={studentsList} />
					</ResultContainer>
					<small>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.OBS}</small>
					<ModalFooter >
						<MainButton enabled={studentsList !== null} onClick={() => studentsList && props.onAddStudentRequested(studentsList)} text={"Adicionar"} />
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default AddFromXlsxModal;