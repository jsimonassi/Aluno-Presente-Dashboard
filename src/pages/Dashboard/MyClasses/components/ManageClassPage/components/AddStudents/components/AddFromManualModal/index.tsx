import React, { useEffect, useState } from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, RowContainer } from "./styles";
import { MainButton } from "../../../../../../../../../components/Buttons";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";
import { MainInput } from "../../../../../../../../../components/Inputs";
import { Student } from "../../../../../../../../../types/Student";
import { Feedback } from "../../../../../../../../../types/Feedback";

interface AddFromManualModalProps {
	isOpen: boolean;
	onClose: (feedback: Feedback) => void;
	onAddStudentRequested: (newStudent: Student) => void;
}

const AddFromManualModal = (props: AddFromManualModalProps) => {

	const [newStudent, setNewStudent] = useState<Student>({} as Student);
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [registrationError, setRegistrationError] = useState("");

	useEffect(() => {
		setNewStudent({} as Student);
		setNameError("");
		setEmailError("");
		setRegistrationError("");
	}, [props.isOpen]);

	const validateNewStudent = () => {
		let allRight = true;
		if (newStudent.name === undefined || newStudent.name === "") {
			setNameError(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.MANDATORY_FIELD);
			allRight = false;
		} else {
			setNameError("");
		}

		if (newStudent.email === undefined || newStudent.email === "") {
			setEmailError(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.MANDATORY_FIELD);
			allRight = false;
		} else {
			setEmailError("");
		}

		if (newStudent.registration === undefined || newStudent.registration === "") {
			setRegistrationError(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.MANDATORY_FIELD);
			allRight = false;
		} else {
			setRegistrationError("");
		}

		if(allRight) {
			props.onAddStudentRequested(newStudent);
		}
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onClose({ isOpen: false, success: false }); }} />
					</div>
				</ModalHeader>
				<ModalBody >
					<MainInput
						value={newStudent?.name ?? ""}
						onChange={(newName) => setNewStudent({ ...newStudent, name: newName })}
						placeholder={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.NAME_PLACEHOLDER}
						type="text"
						title={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.NAME}
						titleStyle={{ color: "black", fontSize: "14px", fontFamily: "normal" }}
						errorText={nameError}
					/>
					<MainInput
						value={newStudent?.email ?? ""}
						onChange={(newEmail) => setNewStudent({ ...newStudent, email: newEmail })}
						placeholder={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.EMAIL_PLACEHOLDER}
						type="text"
						title={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.EMAIL}
						titleStyle={{ color: "black", fontSize: "14px", fontFamily: "normal" }}
						errorText={emailError}
					/>
					<RowContainer>
						<MainInput
							value={newStudent?.registration ?? ""}
							onChange={(newRa) => setNewStudent({ ...newStudent, registration: newRa })}
							placeholder={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.NUMBER_PLACEHOLDER}
							type="number"
							title={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.NUMBER}
							titleStyle={{ color: "black", fontSize: "14px", fontFamily: "normal" }}
							errorText={registrationError}
						/>
					</RowContainer>
					<ModalFooter >
						<MainButton enabled onClick={validateNewStudent} text={"Adicionar"} />
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default AddFromManualModal;