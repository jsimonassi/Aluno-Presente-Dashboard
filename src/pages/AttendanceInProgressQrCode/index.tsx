import React, { useCallback, useEffect, useState } from "react";
import { Body, Content, Footer, Header, PageBackground, QrCodeContainer, StudentItem, StudentsListContainer } from "./styles";

import MESSAGES from "../../constants/messages";
import { MainLoader } from "../../components/Loaders";
import { QRCodeSVG } from "qrcode.react";
import { MainButton } from "../../components/Buttons";
import { useParams } from "react-router-dom";
import { Storage } from "../../services";
import { AttendanceInProgress as AttendanceInProgressType, WebSocketStartRequest, WebSocketResponse, WebSocketStopRequest } from "../../types/Attendance";
import { AttendanceErrorModal } from "./components";
import { useSession } from "../../contexts/Session";
import useWebSocket, { ReadyState } from "react-use-websocket";
import toast from "react-hot-toast";

const AttendanceInProgressQrCode = () => {

	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");
	const [attendanceErrorModalVisible, setAttendanceErrorModalVisible] = useState<boolean>(false);
	const [attendanceSession, setAttendanceSession] = useState<AttendanceInProgressType | null>(null);
	const [registeredStudents, setRegisteredStudents] = useState<string[]>([]);

	const { currentSession } = useSession();

	const cacheDataId = useParams<{ id: string }>().id;
	const url = "wss://resource-server-89f6660ebc95.herokuapp.com/v1/api/attendances/ws?token=" + currentSession?.accessToken;

	const { sendJsonMessage, readyState } = useWebSocket(url, {
		onOpen: (event) => handleConnectionOpened(event),
		onClose: (event) => handleConnectionClosed(event),
		onError: (event) => handleError(event),
		onMessage: (event) => onReceiveMessage(event),
	});

	useEffect(() => {
		if (!cacheDataId) {
			setAttendanceErrorModalVisible(true);
			return;
		}
		const cachedData = Storage.LocalStorage.getLocalData(cacheDataId);

		if (!cachedData) {
			setAttendanceErrorModalVisible(true);
			return;
		}
		setAttendanceSession(JSON.parse(cachedData));
	}, []);

	useEffect(() => {
		if(attendanceSession && readyState === ReadyState.OPEN){
			const request = {
				courseId: attendanceSession.courseId,
				date: attendanceSession.date,
				type: "START",
				location: attendanceSession.location
			} as WebSocketStartRequest;
			console.log("Solicitando início de chamada: ", request);
			sendJsonMessage(request);
		}
	}, [attendanceSession, readyState]);

	const handleConnectionOpened = (event: Event) => {
		console.log("Connection Established", event);
	};

	const handleConnectionClosed = (event: CloseEvent) => {
		console.log("Connection Closed", event);
	};

	const handleError = (event: Event) => {
		console.log("Error:  ", event);
	};

	const onReceiveMessage = (event: MessageEvent) => {
		console.log("Cod: ", event);
		
		//TODO: Add app deep link
		const data: WebSocketResponse = JSON.parse(event.data);
		switch (data.type) {
		case "CODE":
			setCurrentCodeValue(data.value);
			break;
		case "WARN":
			console.log("Vou chamar o warn!!");
			toast(data.value + "\n" + data.description, {
				icon: "⚠️",
				duration: 5000
			});
			break;
		default:
			console.log("Unknown message: ", data);
			break;
		}
	};

	const handleStopAttendance = useCallback(() => {
		if(!attendanceSession) return;

		const request = {
			courseId: attendanceSession.courseId,
			type: "STOP"
		} as WebSocketStopRequest;
		sendJsonMessage(request);
	}, [attendanceSession]);


	const getCode = () => {
		if (currentCodeValue === "" || attendanceSession === null) {
			return <MainLoader />;
		}

	
		return (
			<QrCodeContainer>
				<QRCodeSVG value={currentCodeValue} width={180} height={180} />
			</QrCodeContainer>
		);
	};

	return (
		<PageBackground  >
			<AttendanceErrorModal
				isOpen={attendanceErrorModalVisible}
				onRedirectRequested={() => window.open("/", "_self")}
			/>
			<Content >
				<Header >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
				</Header>
				<Body>

					{getCode()}

					<h4>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.REGISTERED_STUDENTS}</h4>
					<StudentsListContainer>
						{
							registeredStudents.map((name, index) => (
								<StudentItem key={index} index={index}>
									{name}
								</StudentItem>
							))
						}
						{registeredStudents.length === 0 && <p>Mostre o QrCode aos seu alunos para que eles registrem a presença.</p>}
					</StudentsListContainer>
				</Body>

				<Footer>
					<MainButton onClick={handleStopAttendance} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE} enabled={readyState === ReadyState.OPEN} />
				</Footer>
			</Content>
		</PageBackground>
	);
};

export default AttendanceInProgressQrCode;