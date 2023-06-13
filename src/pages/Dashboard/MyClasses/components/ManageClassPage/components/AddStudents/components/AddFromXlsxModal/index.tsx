import React from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "./styles";
import { MainButton } from "../../../../../../../../../components/Buttons";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";

interface AddFromXlsxModalProps {
    isOpen: boolean;
    onCancel: () => void;
}

const AddFromXlsxModal = (props: AddFromXlsxModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onCancel(); }} />
					</div>
				</ModalHeader>
				<ModalBody >
					
					<ModalFooter >
						<MainButton enabled onClick={() => null} text={"Adicionar"} />
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default AddFromXlsxModal;