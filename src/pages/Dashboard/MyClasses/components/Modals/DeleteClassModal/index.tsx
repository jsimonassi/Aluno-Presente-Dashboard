import React from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "./styles";
import { MainButton, OutlineButton } from "../../../../../../components/Buttons";
import MESSAGES from "../../../../../../constants/messages";
import closeIcon from "../../../../../../assets/images/closeIcon.svg";
import { Course } from "../../../../../../types/Course";


interface DeleteClassModalProps {
    isOpen: boolean;
    selectedClass: Course | null;
    onCancel: () => void;
    onDeleteRequested: (id: string) => void;
}


const DeleteClassModal = (props: DeleteClassModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={props.onCancel} />
					</div>
				</ModalHeader>
				<ModalBody >
					<h3>{props.selectedClass?.name}</h3>
					<p>{MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.MESSAGE1}</p>
					<p><b>{MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.MESSAGE2}</b></p>
					<p>{MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.MESSAGE3}</p>
					<ModalFooter >
						<OutlineButton enabled onClick={props.onCancel} text={MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.CANCEL_BTN} />
						<MainButton enabled onClick={() => props.onDeleteRequested(props.selectedClass?.id ?? "")} text={MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.CONFIRM_BTN} />
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default DeleteClassModal;