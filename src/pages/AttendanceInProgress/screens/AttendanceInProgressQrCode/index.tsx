import React, { useCallback, useEffect, useState } from "react";
import { Body, Content, Footer, Header, PageBackground, QrCodeContainer, StudentItem, StudentsListContainer } from "./styles";

import MESSAGES from "../../../../constants/messages";
import { MainLoader } from "../../../../components/Loaders";
import { QRCodeSVG } from "qrcode.react";
import { MainButton } from "../../../../components/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import { Storage } from "../../../../services";
import { AttendanceInProgress as AttendanceInProgressType, WebSocketStartRequest, WebSocketResponse, WebSocketStopRequest } from "../../../../types/Attendance";
import { AttendanceErrorModal } from "../../components";
import { useSession } from "../../../../contexts/Session";
import useWebSocket, { ReadyState } from "react-use-websocket";
import toast from "react-hot-toast";
import { useAttendance } from "../../../../contexts/Attendance";
import { AttendanceHeader } from "../../components/AttendanceHeader";
import { AttendanceFooter } from "../../components/AttendanceFooter";

const AttendanceInProgressQrCode = () => {

	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");
	const [attendanceErrorModalVisible, setAttendanceErrorModalVisible] = useState<boolean>(false);
	const [attendanceSession, setAttendanceSession] = useState<AttendanceInProgressType | null>(null);
	const [registeredStudents, setRegisteredStudents] = useState<string[]>([]);
	const timeoutCheckRef = React.useRef<NodeJS.Timeout | null>(null);

	const { currentSession } = useSession();
	const { cleanAttendance } = useAttendance();
	const navigate = useNavigate();

	const cacheDataId = useParams<{ id: string }>().id;
	const url = process.env.REACT_APP_WS_FULL_URL + "?token=" + currentSession?.accessToken;

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
		if (attendanceSession && readyState === ReadyState.OPEN) {
			const request = {
				courseId: attendanceSession.courseId,
				date: attendanceSession.date,
				type: "START",
			} as WebSocketStartRequest;
			if (attendanceSession.location) {
				request.location = attendanceSession.location;
			}
			console.log("Solicitando início de chamada: ", request);
			sendJsonMessage(request);
		}

		timeoutCheckRef.current = setTimeout(() => {
			setAttendanceErrorModalVisible(true);
		}, 15000);

		return () => {
			if (timeoutCheckRef.current) {
				clearTimeout(timeoutCheckRef.current);
			}
		};

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

		const data: WebSocketResponse = JSON.parse(event.data);
		switch (data.type) {
		case "CODE":
			if (timeoutCheckRef.current) {
				clearTimeout(timeoutCheckRef.current);
				timeoutCheckRef.current = null;
			}
			setCurrentCodeValue(data.value);
			break;
		case "WARN":
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
		if (attendanceSession) {
			const request = {
				courseId: attendanceSession.courseId,
				type: "STOP"
			} as WebSocketStopRequest;
			sendJsonMessage(request);
			cleanAttendance(attendanceSession.id);
		}
		navigate("/");
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
				onRedirectRequested={() => navigate("/")}
			/>
			<AttendanceHeader />
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
					<MainButton
						onClick={handleStopAttendance}
						text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE}
						enabled
					/>
				</Footer>
			</Content>
			<AttendanceFooter />
		</PageBackground>
	);
};

export default AttendanceInProgressQrCode;