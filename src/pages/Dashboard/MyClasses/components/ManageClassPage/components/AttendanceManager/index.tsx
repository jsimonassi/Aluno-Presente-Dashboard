import React, { useEffect, useState } from "react";
import { ButtonGroup, Container, FooterContainer, LoaderContainer, TipContainer, TipItem } from "./styles";
import { AttendanceTable, NewAttendanceModal } from "./components";
import { Course, CourseFrequency } from "../../../../../../../types/Course";
import DateNavigator from "../../../../../../../components/DateNavigator";
import moment from "moment";
import { MainButton, OutlineButton } from "../../../../../../../components/Buttons";
import MESSAGES from "../../../../../../../constants/messages";
import { AttendanceInProgress } from "../../../../../../../types/Attendance";
import { Helpers } from "../../../../../../../helpers";
import { Storage } from "../../../../../../../services";
import CONSTANTS from "../../../../../../../constants";
import Api from "../../../../../../../services/api";
import { MainLoader } from "../../../../../../../components/Loaders";

interface AttendanceManagerProps {
	currentClass: Course;
}

const AttendanceManager = (props: AttendanceManagerProps) => {

	const [attendance, setAttendance] = useState<CourseFrequency[] | null>(null); //TODO: Get frequency from API [CourseFrequency[]
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
	const [newAttendanceModalIsOpen, setNewAttendanceModalIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setAttendance(null);
		Api.Frequencies.getFrequencyByMonth(props.currentClass.id, currentDate.startOf("month").format(), currentDate.endOf("month").format())
			.then((response) => {
				setAttendance(response);
			}).catch((error) => {
				console.log(error);
			});
	}, [currentDate]);

	const increaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().add(1, "months"));
	};

	const decreaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().subtract(1, "months"));
	};

	return (
		<Container>
			<NewAttendanceModal
				isOpen={newAttendanceModalIsOpen}
				onCancel={() => {
					setNewAttendanceModalIsOpen(false);
				}}
				onRequestStartAttendance={(type, locationEnabled, location) => {
					setNewAttendanceModalIsOpen(false);
					const attendanceInProgress: AttendanceInProgress = {
						courseId: props.currentClass.id,
						type: type,
						date: moment().format(),
						status: "requested",
						id: Helpers.CodeGenerator.generateRandomId32(),
						useLocation: locationEnabled,
						location: location
					};
					Storage.LocalStorage.storeLocalData(attendanceInProgress.id, JSON.stringify(attendanceInProgress));
					//TODO: Redirect
					if(type === "qrCode"){
						window.open("/" + CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_QR_CODE + "/" + attendanceInProgress.id, "_blank");
					}else{
						window.open("/" + CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_SESSION_CODE + "/" + attendanceInProgress.id, "_blank");
					}
					//Através da cache as informações são passadas para a página e a chamada é iniciada via WS.
					//Aba atual vai para home
					window.open("/", "_self");
				}}
			/>
			{attendance == null ?
				<LoaderContainer>
					<MainLoader />
				</LoaderContainer>
				:
				<AttendanceTable courseFrequency={attendance ?? []} />
			}
			<TipContainer>
				<TipItem>
					<h4>P</h4>
					<p>- {MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.PRESENT_TIP}</p>
				</TipItem>
				<TipItem useRed>
					<h4>F</h4>
					<p>- {MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.ABSENT_TIP}</p>
				</TipItem>
				<TipItem>
					<h4>I</h4>
					<p>- {MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.UNKNOWN_TIP}</p>
				</TipItem>
				<TipItem>
					<h4>J</h4>
					<p>- {MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.JUSTIFIED_TIP}</p>
				</TipItem>
			</TipContainer>
			<FooterContainer>
				<DateNavigator currentDate={currentDate} onNextMonth={increaseMonth} onPreviousMonth={decreaseMonth} />
				<ButtonGroup>
					<OutlineButton onClick={() => null} text={MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.EDIT_BTN} enabled />
					<OutlineButton onClick={() => null} text={MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.EXPORT_BTN} enabled />
					<MainButton onClick={() => setNewAttendanceModalIsOpen(!newAttendanceModalIsOpen)} text={MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.NEW_FREQUENCY} enabled />
				</ButtonGroup>
			</FooterContainer>
		</Container>
	);
};

export default AttendanceManager;