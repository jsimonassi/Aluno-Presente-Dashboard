import React from "react";
import { ModalContainer, ModalContent } from "./styles";
import MESSAGES from "../../../../constants/messages";
import errorImg from "../../../../assets/images/error.svg";
import { MainButton } from "../../../../components/Buttons";

interface AttendanceErrorModalProps {
	isOpen: boolean;
    onRedirectRequested: () => void;
}

const AttendanceErrorModal = (props: AttendanceErrorModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.START_ATTENDANCE_ERROR}</h1>
				<div>
					<img src={errorImg} alt="Error" />
				</div>
				<MainButton onClick={props.onRedirectRequested} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.START_ATTENDANCE_REDIRECT_INFO} enabled />
			</ModalContent>
		</ModalContainer>
	);
};

export default AttendanceErrorModal;