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
import { Helpers } from "../../../../../../../../../helpers";
import { useNavigate } from "react-router-dom";

interface AttendanceManagerProps {
	currentClass: Course;
	onSetEditingAttendance: (compositeKey: string) => void;
}

const ManagerView = (props: AttendanceManagerProps) => {

	const { attendanceData, getAttendanceByMonth, getCompositeKey, startAttendance, getPeriodAttendanceByDateWithoutCache } = useAttendance();
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
	const [newAttendanceModalIsOpen, setNewAttendanceModalIsOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const monthData = useMemo(() => {
		if (attendanceData) {
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
			navigate("/" + CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_QR_CODE + "/" + attendanceInProgress.id);
		} else {
			navigate("/" + CONSTANTS.ROUTES.ATTENDANCE_IN_PROGRESS_SESSION_CODE + "/" + attendanceInProgress.id);
		}
	};

	const handleExportAttendance = () => {

		if (!props.currentClass.period) return;

		const toastRef = toast.loading(MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.EXPORT_PROGRESS_DOWNLOADING);
		const startDate = props.currentClass.period.split(".")[1] === "1" ? moment().startOf("year") : moment().startOf("year").add(6, "months");
		const endDate = props.currentClass.period.split(".")[1] === "1" ? moment().startOf("year").add(6, "months") : moment().endOf("year");

		getPeriodAttendanceByDateWithoutCache(props.currentClass.id, startDate.format(), endDate.format())
			.then((response) => {
				toast.dismiss(toastRef);
				Helpers.XlsxManager.createAttendanceXlsx(response, props.currentClass);
			}).catch(() => {
				toast.error(MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.EXPORT_ERROR);
				toast.dismiss(toastRef);
			});
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
					firstMonthLimit={props.currentClass.createdAt ? moment(props.currentClass.createdAt) : undefined}
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
						onClick={() => handleExportAttendance()}
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