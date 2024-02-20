import React, { useEffect } from "react";
import { ModalContainer, ModalContent } from "./styles";
import MESSAGES from "../../../../constants/messages";
import errorImg from "../../../../assets/images/error.svg";

interface AttendanceErrorModalProps {
	isOpen: boolean;
    onRedirectRequested: () => void;
}

const AttendanceErrorModal = (props: AttendanceErrorModalProps) => {

	const [counter, setCounter] = React.useState(8);

	useEffect(() => {
		if(props.isOpen){
			const interval = setInterval(() => {
				setCounter(previous => previous - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [props.isOpen]);

	useEffect(() => {
		if(counter <= 0){
			props.onRedirectRequested();
		}
	}, [counter]);

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.START_ATTENDANCE_ERROR}</h1>
				<div>
					<img src={errorImg} alt="Error" />
				</div>
				<p>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.START_ATTENDANCE_REDIRECT_INFO + counter + " segundos."}</p>
			</ModalContent>
		</ModalContainer>
	);
};

export default AttendanceErrorModal;