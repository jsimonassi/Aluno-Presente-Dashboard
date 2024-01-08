import React from "react";
import { ModalContainer, ModalContent, ModalHeader } from "./styles";
import { BigButton } from "../../../../../../../../../components/Buttons";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";
import { AttendanceInProgressType } from "../../shared/types";


interface NewAttendanceModalProps {
	isOpen: boolean;
	onCancel: () => void;
	onRequestStartAttendance: (type: AttendanceInProgressType) => void;
}

const NewAttendanceModal = (props: NewAttendanceModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onCancel(); }} />
					</div>
				</ModalHeader>
				<BigButton onClick={() => props.onRequestStartAttendance("qrCode")} title={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.QR_CODE_TITLE} description={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.QR_CODE_DESCRIPTION} />
				<BigButton onClick={() => props.onRequestStartAttendance("sessionCode")} title={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.SESSION_CODE_TITLE} description={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.SESSION_CODE_DESCRIPTION} />
				<span>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.OBS}</span>
			</ModalContent>
		</ModalContainer>
	);
};

export default NewAttendanceModal;