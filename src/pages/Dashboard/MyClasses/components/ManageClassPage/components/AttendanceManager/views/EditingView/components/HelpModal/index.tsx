import React from "react";
import { ModalBody, ModalContainer, ModalContent, ModalHeader, RowItem } from "./styles";
import closeIcon from "../../../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../../../constants/messages";


interface HelpModalProps {
	isOpen: boolean;
	onClose: () => void;
}


const HelpModal = (props: HelpModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.HELP_MODAL.HELP}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={props.onClose} />
					</div>
				</ModalHeader>
				<ModalBody >
					<RowItem>
						<p><b>{MESSAGES.MY_CLASSES.HELP_MODAL.P_TITLE}</b></p>
						<p>{MESSAGES.MY_CLASSES.HELP_MODAL.P_DESCRIPTION}</p>
					</RowItem>
					<RowItem>
						<p><b>{MESSAGES.MY_CLASSES.HELP_MODAL.F_TITLE}</b></p>
						<p>{MESSAGES.MY_CLASSES.HELP_MODAL.F_DESCRIPTION}</p>
					</RowItem>
					<RowItem>
						<p><b>{MESSAGES.MY_CLASSES.HELP_MODAL.UNSUBSCRIBED_TITLE}</b></p>
						<p>{MESSAGES.MY_CLASSES.HELP_MODAL.UNSUBSCRIBED_DESCRIPTION}</p>
					</RowItem>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default HelpModal;