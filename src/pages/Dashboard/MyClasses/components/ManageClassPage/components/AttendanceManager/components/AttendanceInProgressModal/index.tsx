import React from "react";
import { ModalContainer, ModalContent, ModalHeader } from "./styles";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";
import { AttendanceInProgressType } from "../../shared/types";
import { MainButton } from "../../../../../../../../../components/Buttons";


interface NewAttendanceModalProps {
	isOpen: boolean;
	onCancel: () => void;
	attendanceType: AttendanceInProgressType | null;
	courseId: string;
}

const AttendanceInProgressModal = (props: NewAttendanceModalProps) => {
	// // const cookies = new Cookies();
	// const { currentSession } = useSession();
	// // cookies.set("token", currentSession?.accessToken, { path: "/" });

	// const url = "wss://resource-server-89f6660ebc95.herokuapp.com/v1/api/attendences/ws/courses/65837c4462983963a1f5f7ac/dates/2000-10-31T02:31:00.001-03:00";

	// function setCookie(exdays) {
	// 	const d = new Date();
	// 	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	// 	const expires = "expires=" + d.toUTCString();
	// 	const text = `xablau=${encodeURIComponent(currentSession?.accessToken ?? "")}; domain=.herokuapp.com; path=/; samesite=None;`;
	// 	console.log(text);
	// 	document.cookie = text;
	// }
	

	// useEffect(() => {

	// 	setCookie(3);

	// 	const ws = new WebSocket(url);

	// 	ws.onmessage = function (event) {
	// 		const json = JSON.parse(event.data);
	// 		try {
	// 			console.log(json);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};

	// 	ws.onerror = function (event) {
	// 		console.log(event);
	// 	};

	// 	ws.onclose = function (event) {
	// 		console.log(event);
	// 	};

	// }, []);


	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onCancel(); }} />
					</div>
					<MainButton onClick={() => null} text="Send" enabled />
				</ModalHeader>
			</ModalContent>
		</ModalContainer>
	);
};

export default AttendanceInProgressModal;