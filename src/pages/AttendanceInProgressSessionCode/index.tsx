import React, { useCallback, useEffect, useState } from "react";
import { Body, Content, Footer, Header, PageBackground, StudentItem, StudentsListContainer } from "./styles";

import MESSAGES from "../../constants/messages";
import { MainLoader } from "../../components/Loaders";
import { MainButton } from "../../components/Buttons";
import { useParams } from "react-router-dom";
import { Storage } from "../../services";
import { AttendanceInProgress as AttendanceInProgressType } from "../../types/Attendance";
import { AttendanceErrorModal } from "./components";
import Api from "../../services/api";

const AttendanceInProgressSessionCode = () => {

	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");
	const [attendanceErrorModalVisible, setAttendanceErrorModalVisible] = useState<boolean>(false);
	const [attendanceSession, setAttendanceSession] = useState<AttendanceInProgressType | null>(null);
	const [registeredStudents, setRegisteredStudents] = useState<string[]>([]);
	const [codeSessionFrequencyInProgress, setCodeSessionFrequencyInProgress] = useState<boolean>(false);

	const cacheDataId = useParams<{ id: string }>().id;

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
		if(attendanceSession){
			Api.Frequencies.createFrequencyWithStaticCode(attendanceSession.courseId, attendanceSession.date)
				.then((response) => {
					setCurrentCodeValue(response.code);
					setCodeSessionFrequencyInProgress(true);
				}).catch(() => {
					setAttendanceErrorModalVisible(true);
				});
		}
	}, [attendanceSession]);

	const handleStopAttendance = useCallback(() => {
		if (!attendanceSession) return;

	}, [attendanceSession]);


	const getCode = () => {
		if (currentCodeValue === "" || attendanceSession === null) {
			return <MainLoader />;
		}

		return <h1>{currentCodeValue}</h1>;
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
						{registeredStudents.length === 0 && <p>Mostre o código aos seus alunos para que eles registrem a presença.</p>}
					</StudentsListContainer>
				</Body>

				<Footer>
					<MainButton onClick={handleStopAttendance} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE} enabled={codeSessionFrequencyInProgress} />
				</Footer>
			</Content>
		</PageBackground>
	);
};

export default AttendanceInProgressSessionCode;