import React, { useEffect, useState } from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, QrCodeContainer, StudentItem, StudentsListContainer } from "./styles";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";
import { AttendanceInProgressType } from "../../shared/types";
import { MainButton } from "../../../../../../../../../components/Buttons";
import { useSession } from "../../../../../../../../../contexts/Session";
import moment from "moment";
import { QRCodeSVG } from "qrcode.react";
import { MainLoader } from "../../../../../../../../../components/Loaders";

interface NewAttendanceModalProps {
	isOpen: boolean;
	onCancel: () => void;
	attendanceType: AttendanceInProgressType | null;
	courseId: string;
}

interface WsStartRequest {
	courseId: string;
	date: string;
	type: "START" | "STOP";
}

const AttendanceInProgressModal = (props: NewAttendanceModalProps) => {

	const { currentSession } = useSession();
	const url = "wss://resource-server-89f6660ebc95.herokuapp.com/v1/api/attendances/ws?token=" + currentSession?.accessToken;
	let ws: null | WebSocket = null;
	const date = moment().format();
	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");

	useEffect(() => {
		if(props.isOpen) {
			ws = new WebSocket(url);

			ws.onopen = function () {
				console.log("Connection Established");
				handleStartAttendance();
			};
		
			ws.onmessage = function (event) {
				console.log("Cod: ", event.data);
				setCurrentCodeValue(event.data);
			};
		
			ws.onerror = function (event) {
				console.log("Error:  ", event);
			};
		
			ws.onclose = function (event) {
				console.log("Close: ", event.reason);
			};
		}else{
			if(ws){
				ws.close();
			}
			setCurrentCodeValue("");
		}
	}, [props.isOpen]);

	const handleStartAttendance = () => {
		const request: WsStartRequest = {
			courseId: props.courseId,
			date: date,
			type: "START"
		};
		console.log("sending ", request);
		if(ws && ws.readyState === 1){
			ws.send(JSON.stringify(request));
		}		
	};

	const handleStopAttendance = () => {
		const request: WsStartRequest = {
			courseId: props.courseId,
			date: date,
			type: "STOP"
		};
		console.log("sending ", request);
		if(ws && ws.readyState === 1){
			ws.send(JSON.stringify(request));
		}
		props.onCancel();
	};


	const getCode = () => {
		if (currentCodeValue === "") {
			return <MainLoader />;
		}

		if (props.attendanceType === "qrCode") {
			return (
				<QrCodeContainer>
					<QRCodeSVG value={currentCodeValue} width={180} height={180} />
				</QrCodeContainer>
			);
		}

		return <h1>ABC123</h1>;
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={handleStopAttendance} />
					</div>
				</ModalHeader>
				<ModalBody>
					
					{getCode()}

					<p>{props.attendanceType === "qrCode" ? MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.QR_CODE_TIP : MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.CODE_TIP}</p>
					<h4>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.REGISTERED_STUDENTS}</h4>
					<StudentsListContainer>
						{
							Array.from({ length: 10 }).map((_, index) => (
								<StudentItem key={index} index={index}>
									Nome do aluno
								</StudentItem>
							))
						}
					</StudentsListContainer>
				</ModalBody>

				<ModalFooter>
					<MainButton onClick={handleStopAttendance} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE} enabled />

				</ModalFooter>
			</ModalContent>
		</ModalContainer>
	);
};

export default AttendanceInProgressModal;