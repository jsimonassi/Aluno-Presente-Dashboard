import React from "react";
import { ModalContainer, ModalContent } from "./styles";
import MESSAGES from "../../../constants/messages";
import success from "../../../assets/images/success.svg";
import error from "../../../assets/images/error.svg";

interface FeedbackModalProps {
    isOpen: boolean;
    success: boolean;
}

const FeedbackModal = (props: FeedbackModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<h1>{ props.success ? MESSAGES.FEEDBACK_MESSAGES.SUCCESS : MESSAGES.FEEDBACK_MESSAGES.ERROR}</h1>
				<img src={props.success ? success : error } alt="Status image" style={{maxWidth: "200px"}} />
			</ModalContent>
		</ModalContainer >
	);

};

export default FeedbackModal;