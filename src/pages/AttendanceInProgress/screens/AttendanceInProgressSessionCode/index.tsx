import React, { useCallback, useEffect, useState } from "react";
import { Body, Content, Footer, Header, PageBackground } from "./styles";

import MESSAGES from "../../../../constants/messages";
import { MainLoader } from "../../../../components/Loaders";
import { MainButton } from "../../../../components/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import { Storage } from "../../../../services";
import { AttendanceInProgress as AttendanceInProgressType } from "../../../../types/Attendance";
import { AttendanceErrorModal } from "../../components";
import Api from "../../../../services/api";
import { useAttendance } from "../../../../contexts/Attendance";
import { AttendanceHeader } from "../../components/AttendanceHeader";
import { AttendanceFooter } from "../../components/AttendanceFooter";
import { StaticAttendanceInfos } from "../../../../types/api/Attendance";
import toast from "react-hot-toast";
import { CodeView } from "./components/CodeView";


const AttendanceInProgressSessionCode = () => {

	const [currentCodeValue, setCurrentCodeValue] = useState<string>("");
	const [attendanceErrorModalVisible, setAttendanceErrorModalVisible] = useState<boolean>(false);
	const [attendanceSession, setAttendanceSession] = useState<AttendanceInProgressType | null>(null);
	const [codeSessionFrequencyInProgress, setCodeSessionFrequencyInProgress] = useState<boolean>(false);
	const { cleanAttendance } = useAttendance();
	const navigate = useNavigate();
	const cacheDataId = useParams<{ id: string }>().id;

	useEffect(() => {
		const handleTabClose = event => {
			event.preventDefault();
			return (event.returnValue = MESSAGES.GENERAL.ARE_YOU_SURE);
		};

		window.addEventListener("beforeunload", handleTabClose);

		return () => {
			if(codeSessionFrequencyInProgress){
				handleStopAttendance();
			}
			window.removeEventListener("beforeunload", handleTabClose);
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
		if (attendanceSession) {
			const staticInfos: StaticAttendanceInfos = {
				courseId: attendanceSession.courseId,
				date: attendanceSession.date,
				type: "START",
			};

			if (attendanceSession?.location) {
				staticInfos.latitude = attendanceSession.location.latitude;
				staticInfos.longitude = attendanceSession.location.longitude;
			}

			Api.Frequencies.createFrequencyWithStaticCode(staticInfos)
				.then((response) => {
					setCurrentCodeValue(response.code);
					setCodeSessionFrequencyInProgress(true);
				}).catch(() => {
					setAttendanceErrorModalVisible(true);
				});
		}
	}, [attendanceSession]);

	const handleStopAttendance = useCallback(() => {
		const toastRef = toast.loading(MESSAGES.GENERAL.SAVING);
		if (attendanceSession) {
			const staticInfos: StaticAttendanceInfos = {
				courseId: attendanceSession.courseId,
				date: attendanceSession.date,
				type: "STOP",
			};
			Api.Frequencies.createFrequencyWithStaticCode(staticInfos)
				.then(() => {
					setCurrentCodeValue("");
					setCodeSessionFrequencyInProgress(false);
				}).finally(() => {
					cleanAttendance(attendanceSession.id);
					toast.dismiss(toastRef);
					navigate("/");
				});
		} else {
			navigate("/");
		}
	}, [attendanceSession]);


	const getCode = () => {
		if (currentCodeValue === "" || attendanceSession === null) {
			return <MainLoader />;
		}

		return <CodeView currentCodeValue={currentCodeValue} />;
	};

	return (
		<PageBackground  >
			<AttendanceErrorModal
				isOpen={attendanceErrorModalVisible}
				onRedirectRequested={() => window.open("/", "_self")}
			/>
			<AttendanceHeader />
			<Content >
				<Header >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
				</Header>
				<Body>
					{getCode()}
					<p>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TIP}</p>
				</Body>
				<Footer>
					<MainButton onClick={handleStopAttendance} text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.STOP_ATTENDANCE} enabled={codeSessionFrequencyInProgress} />
				</Footer>
			</Content>
			<AttendanceFooter />
		</PageBackground>
	);
};

export default AttendanceInProgressSessionCode;