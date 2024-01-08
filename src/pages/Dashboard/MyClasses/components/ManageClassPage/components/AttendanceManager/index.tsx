import React, { useEffect, useMemo, useState } from "react";
import { ButtonGroup, Container, FooterContainer } from "./styles";
import { AttendanceInProgressModal, AttendanceTable, NewAttendanceModal } from "./components";
import { Course, CourseFrequency } from "../../../../../../../types/Course";
import DateNavigator from "../../../../../../../components/DateNavigator";
import moment from "moment";
import { filterFrequencyByMonth } from "./utils";
import { MainButton, OutlineButton } from "../../../../../../../components/Buttons";
import MESSAGES from "../../../../../../../constants/messages";
import { AttendanceInProgressType } from "./shared/types";


const mock =
	[
		{
			"id": "1",
			"name": "João Victor Simonassi",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "2",
			"name": "Lucas da Silva Lima",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "3",
			"name": "Pedrinho Feitosa",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "4",
			"name": "Sabrina dos Santos",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		}
	] as CourseFrequency[];

interface AttendanceManagerProps {
	currentClass: Course;
}


const AttendanceManager = (props: AttendanceManagerProps) => {

	const [attendance, setAttendance] = useState<CourseFrequency[]>(mock); //TODO: Get frequency from API [CourseFrequency[]
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
	const monthFrequencies = useMemo(() => {
		return filterFrequencyByMonth(attendance, currentDate.month());
	}, [currentDate]);
	const [newAttendanceModalIsOpen, setNewAttendanceModalIsOpen] = useState<boolean>(false);
	const [attendanceType, setAttendanceType] = useState<AttendanceInProgressType | null>(null);

	useEffect(() => {
		setAttendance(mock); //Replace with API call
	}, []);

	const increaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().add(1, "months"));
	};

	const decreaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().subtract(1, "months"));
	};

	return (
		<Container>

			<AttendanceInProgressModal
				isOpen={attendanceType !== null} 
				attendanceType={attendanceType}
				onCancel={() => setAttendanceType(null)}
				courseId={props.currentClass.id}
			/>
			<NewAttendanceModal
				isOpen={newAttendanceModalIsOpen}
				onCancel={() => {
					setNewAttendanceModalIsOpen(false);
					setAttendanceType(null);
				}}
				onRequestStartAttendance={(type) => {
					setNewAttendanceModalIsOpen(false);
					setAttendanceType(type);
				}}
			/>
			<AttendanceTable courseFrequency={monthFrequencies} />
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