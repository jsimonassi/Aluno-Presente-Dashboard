import React, { useEffect, useMemo, useState } from "react";
import { ButtonGroup, Container, FooterContainer, LoaderContainer, TipContainer, TipItem } from "./styles";
import { AttendanceTable, NewAttendanceModal } from "./components";
import { Course } from "../../../../../../../../../types/Course";
import DateNavigator from "../../../../../../../../../components/DateNavigator";
import moment from "moment";
import { MainButton, OutlineButton } from "../../../../../../../../../components/Buttons";
import MESSAGES from "../../../../../../../../../constants/messages";
import { LatLng } from "../../../../../../../../../types/Attendance";
import CONSTANTS from "../../../../../../../../../constants";
import { MainLoader } from "../../../../../../../../../components/Loaders";
import { useAttendance } from "../../../../../../../../../contexts/Attendance";
import toast from "react-hot-toast";

interface AttendanceManagerProps {
	currentClass: Course;
	onSetEditingAttendance: (compositeKey: string) => void;
}

const ManagerView = (props: AttendanceManagerProps) => {

	const {attendanceData, getAttendanceByMonth, getCompositeKey, startAttendance} = useAttendance();
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
	const [newAttendanceModalIsOpen, setNewAttendanceModalIsOpen] = useState<boolean>(false);
	const monthData = useMemo(() => {
		if(attendanceData) {
			return attendanceData[getCompositeKey(props.currentClass.id, currentDate.startOf("month").format())];
		}
		return null;
	}, [attendanceData]);

	useEffect(() => {
		getAttendanceByMonth(props.currentClass.id, currentDate.startOf("month").format())
			.catch(() => toast.error(MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.ERROR_LOADING_ATTENDANCE));
	}, [currentDate]);

	const increaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().add(1, "months"));
	};

	const decreaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().subtract(1, "months"));
	};

	const handleStartAttendance = (type: "qrCode" | "sessionCode", location: LatLng | null) => {
		setNewAttendanceModalIsOpen(false);
		const attendanceInProgress = startAttendance(props.currentClass.id, type, location);

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
				onRequestStartAttendance={(type, location) => handleStartAttendance(type, location)}
			/>
			{monthData == null ?
				<LoaderContainer>
					<MainLoader />
				</LoaderContainer>
				:
				<AttendanceTable courseFrequency={monthData} />
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
			</TipContainer>
			<FooterContainer>
				<DateNavigator 
					currentDate={currentDate} 
					onNextMonth={increaseMonth} 
					onPreviousMonth={decreaseMonth}
					firstMonthLimit={ props.currentClass.createdAt ? moment(props.currentClass.createdAt) : undefined}
					endMonthLimit={moment()}
				/>
				<ButtonGroup>
					<OutlineButton
						onClick={() => monthData &&
							props.onSetEditingAttendance(getCompositeKey(props.currentClass.id, currentDate.startOf("month").format()))}
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