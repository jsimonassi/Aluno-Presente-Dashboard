import React, { useState } from "react";
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
}

const AddFromManualModal = (props: AddFromManualModalProps) => {

	const [newStudent, setNewStudent] = useState<Student>({} as Student);

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
					/>
					<MainInput
						value={newStudent?.email ?? ""}
						onChange={(newEmail) => setNewStudent({ ...newStudent, email: newEmail })}
						placeholder={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.EMAIL_PLACEHOLDER}
						type="text"
						title={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.EMAIL}
						titleStyle={{ color: "black", fontSize: "14px", fontFamily: "normal" }}
					/>
					<RowContainer>
						<MainInput
							value={newStudent?.cpf ?? ""}
							onChange={(newCpf) => setNewStudent({ ...newStudent, name: newCpf })}
							placeholder={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.CPF_PLACEHOLDER}
							type="text"
							title={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.CPF}
							titleStyle={{ color: "black", fontSize: "14px", fontFamily: "normal" }}
							style={{ marginRight: "10px"}}
						/>
						<MainInput
							value={newStudent?.ra ?? ""}
							onChange={(newRa) => setNewStudent({ ...newStudent, ra: newRa })}
							placeholder={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.NUMBER_PLACEHOLDER}
							type="text"
							title={MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_MANUAL_MODAL.NUMBER}
							titleStyle={{ color: "black", fontSize: "14px", fontFamily: "normal" }}
							style={{ marginLeft: "10px"}}
						/>
					</RowContainer>
					<ModalFooter >
						<MainButton enabled onClick={() => props.onClose({ isOpen: true, success: false })} text={"Adicionar"} />
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default AddFromManualModal;