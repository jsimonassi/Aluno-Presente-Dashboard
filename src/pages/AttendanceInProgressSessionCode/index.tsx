import React, { useCallback, useEffect, useState } from "react";
import { Body, Content, Footer, Header, LogoContainer, PageBackground, PageFooter, StudentItem, StudentsListContainer } from "./styles";

import MESSAGES from "../../constants/messages";
import { MainLoader } from "../../components/Loaders";
import { MainButton } from "../../components/Buttons";
import { useParams } from "react-router-dom";
import { Storage } from "../../services";
import { AttendanceInProgress as AttendanceInProgressType } from "../../types/Attendance";
import { AttendanceErrorModal } from "./components";
import Api from "../../services/api";
import logo from "../../assets/images/whiteLogo.png";


const AttendanceInProgressSessionCode = () => {

	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");
	const [attendanceErrorModalVisible, setAttendanceErrorModalVisible] = useState<boolean>(false);
	const [attendanceSession, setAttendanceSession] = useState<AttendanceInProgressType | null>(null);
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
		if (attendanceSession) {
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
			<LogoContainer>
				<img src={logo} alt="logo" />
			</LogoContainer>
			<Content >
				<Header >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
				</Header>
				<Body>
					{getCode()}
				</Body>
				<Footer>
					<MainButton onClick={handleStopAttendance} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE} enabled={codeSessionFrequencyInProgress} />
				</Footer>
			</Content>
			<PageFooter>
				<span>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_PAGE.TIPS}</span>
				<a onClick={() => window.location.reload()}>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_PAGE.TIPS_REFRESH}.</a>
			</PageFooter>
		</PageBackground>
	);
};

export default AttendanceInProgressSessionCode;