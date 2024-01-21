import React, { useCallback, useEffect, useState } from "react";
import { Body, Content, Footer, Header, PageBackground, QrCodeContainer, StudentItem, StudentsListContainer } from "./styles";

import MESSAGES from "../../constants/messages";
import { MainLoader } from "../../components/Loaders";
import { QRCodeSVG } from "qrcode.react";
import { MainButton } from "../../components/Buttons";
import { useParams } from "react-router-dom";
import { Storage } from "../../services";
import { AttendanceInProgress as AttendanceInProgressType, WebSocketRequest } from "../../types/Attendance";
import { AttendanceErrorModal } from "./components";
import { useSession } from "../../contexts/Session";

const AttendanceInProgress = () => {

	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [attendanceErrorModalVisible, setAttendanceErrorModalVisible] = useState<boolean>(false);
	const [attendanceSession, setAttendanceSession] = useState<AttendanceInProgressType | null>(null);

	const { currentSession } = useSession();
    
	const cacheDataId = useParams<{ id: string }>().id;
	const url = "wss://resource-server-89f6660ebc95.herokuapp.com/v1/api/attendances/ws?token=" + currentSession?.accessToken;

	const websocket = new WebSocket(url);

	useEffect(() => {
		websocket.onopen = () => {
			console.log("Connection Established");
			setTimeout(() => {
				setIsConnected(true);
			}, 1000);
		};
			
		websocket.onmessage = (event) => {
			console.log("Cod: ", event.data);
			setCurrentCodeValue(event.data);
		};
	
		websocket.onerror = (event) => {
			console.log("Error:  ", event);
			setIsConnected(false);
		};
			
		websocket.onclose = (event) => {
			console.log("Close: ", event.reason);
			setIsConnected(false);
			window.open("/", "_self");
		};

		return () => {
			websocket.close();
		};
	}, []);

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
		if(isConnected && attendanceSession){
			handleStartAttendance();
		}
	}, [isConnected, attendanceSession]);
    


	const handleStartAttendance = useCallback(() => {
		if(!attendanceSession) return;
        
		const request: WebSocketRequest = {
			courseId: attendanceSession.courseId,
			date: attendanceSession.date,
			type: "START"
		};
		console.log("Solicitando início de chamada: ", request);
		websocket.send(JSON.stringify(request));
	}, [attendanceSession]);

	const handleStopAttendance = useCallback(() => {
		if(!attendanceSession) return;

		const request: WebSocketRequest = {
			courseId: attendanceSession.courseId,
			date: attendanceSession.date,
			type: "STOP"
		};
		websocket.send(JSON.stringify(request));
	}, [attendanceSession]);


	const getCode = () => {
		if (currentCodeValue === "" || attendanceSession === null) {
			return <MainLoader />;
		}

		if (attendanceSession.type === "qrCode") {
			return (
				<QrCodeContainer>
					<QRCodeSVG value={currentCodeValue} width={180} height={180} />
				</QrCodeContainer>
			);
		}

		return <h1>ABC123</h1>;
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

					{/* <p>{props.attendanceType === "qrCode" ? MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.QR_CODE_TIP : MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.CODE_TIP}</p> */}
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
				</Body>

				<Footer>
					<MainButton onClick={handleStopAttendance} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE} enabled />
				</Footer>
			</Content>
		</PageBackground>
	);
};

export default AttendanceInProgress;