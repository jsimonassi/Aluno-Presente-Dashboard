import React, { useEffect, useState } from "react";
import { ButtonGroup, Container, FooterContainer, LoaderContainer, TipContainer, TipItem } from "./styles";
import { AttendanceTable, NewAttendanceModal } from "./components";
import { Course, CourseAttendance } from "../../../../../../../../../types/Course";
import DateNavigator from "../../../../../../../../../components/DateNavigator";
import moment from "moment";
import { MainButton, OutlineButton } from "../../../../../../../../../components/Buttons";
import MESSAGES from "../../../../../../../../../constants/messages";
import { AttendanceInProgress, LatLng } from "../../../../../../../../../types/Attendance";
import { Helpers } from "../../../../../../../../../helpers";
import { Storage } from "../../../../../../../../../services";
import CONSTANTS from "../../../../../../../../../constants";
import { MainLoader } from "../../../../../../../../../components/Loaders";
import { useAttendance } from "../../../../../../../../../contexts/Attendance";
import toast from "react-hot-toast";
import { EditingInProgress } from "../../types";

interface AttendanceManagerProps {
	currentClass: Course;
	onStartEditingAttendance: (editing: EditingInProgress) => void;
}

const ManagerView = (props: AttendanceManagerProps) => {

	const attendanceContext = useAttendance();
	const [attendance, setAttendance] = useState<CourseAttendance[] | null>(null);
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
	const [newAttendanceModalIsOpen, setNewAttendanceModalIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setAttendance(null);
		attendanceContext.getAttendanceByMonth(props.currentClass.id, currentDate.startOf("month").format())
			.then((response) => setAttendance(response))
			.catch(() => toast.error(MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.ERROR_LOADING_ATTENDANCE));
	}, [currentDate]);

	const increaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().add(1, "months"));
	};

	const decreaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().subtract(1, "months"));
	};

	const handleStartAttendance = (type: "qrCode" | "sessionCode", locationEnabled: boolean, location: LatLng | null) => {
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

		if (type === "qrCode") {
			window.open("/" + CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_QR_CODE + "/" + attendanceInProgress.id, "_blank");
		} else {
			window.open("/" + CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_SESSION_CODE + "/" + attendanceInProgress.id, "_blank");
		}
		//Através da cache as informações são passadas para a página e a chamada é iniciada via WS.
		//Aba atual vai para home
		window.open("/", "_self");
	};


	return (
		<Container>
			<NewAttendanceModal
				isOpen={newAttendanceModalIsOpen}
				onCancel={() => setNewAttendanceModalIsOpen(false)}
				onRequestStartAttendance={(type, locationEnabled, location) => handleStartAttendance(type, locationEnabled, location)}
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
					<p>- {MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.PRESENT_TIP}</p>
				</TipItem>
				<TipItem useRed>
					<h4>F</h4>
					<p>- {MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.ABSENT_TIP}</p>
				</TipItem>
				<TipItem>
					<h4>I</h4>
					<p>- {MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.UNKNOWN_TIP}</p>
				</TipItem>
				{/* <TipItem>
					<h4>J</h4>
					<p>- {MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.JUSTIFIED_TIP}</p>
				</TipItem> */}
			</TipContainer>
			<FooterContainer>
				<DateNavigator currentDate={currentDate} onNextMonth={increaseMonth} onPreviousMonth={decreaseMonth} />
				<ButtonGroup>
					<OutlineButton
						onClick={() => attendance &&
							props.onStartEditingAttendance({ courseAttendance: attendance, currentDate: currentDate.startOf("month").format() })}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.EDIT_BTN}
						enabled
					/>
					<OutlineButton
						onClick={() => null}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.EXPORT_BTN}
						enabled
					/>
					<MainButton
						onClick={() => setNewAttendanceModalIsOpen(!newAttendanceModalIsOpen)}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.NEW_FREQUENCY}
						enabled
					/>
				</ButtonGroup>
			</FooterContainer>
		</Container>
	);
};

export default ManagerView;