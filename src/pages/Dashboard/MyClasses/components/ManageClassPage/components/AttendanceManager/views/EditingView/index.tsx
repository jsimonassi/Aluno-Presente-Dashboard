import React, { useMemo, useState } from "react";
import { ButtonGroup, Container, FooterContainer } from "./styles";
import MESSAGES from "../../../../../../../../../constants/messages";
import { MainButton, OutlineButton } from "../../../../../../../../../components/Buttons";
import AttendanceEditTable from "./components/AttendanceEditTable";
import { useAttendance } from "../../../../../../../../../contexts/Attendance";
import { Helpers } from "../../../../../../../../../helpers";
import HelpModal from "./components/HelpModal";

interface EditingViewProps {
	compositeKey: string;
	onStopEditing: () => void;
}

const EditingView = (props: EditingViewProps) => {

	const { updateFrequency, attendanceData } = useAttendance();
	const [helpModalVisible, setHelpModalVisible] = useState<boolean>(false);

	const monthData = useMemo(() => {
		if (!attendanceData || !attendanceData[props.compositeKey]) return [];

		return attendanceData[props.compositeKey];
	}, [attendanceData, props.compositeKey]);

	const handleEditFrequency = (studentAttendanceId: string, memberId: string, newStatusValue: number) => {
		const updatedMonthData = Helpers.AttendanceHelper.generateNewAttendance(monthData, memberId, studentAttendanceId, newStatusValue);
		updateFrequency(studentAttendanceId, memberId, newStatusValue, updatedMonthData, props.compositeKey);
	};

	return (
		<Container>
			<AttendanceEditTable
				courseFrequency={monthData}
				onEditFrequency={(studentAttendanceId, memberId, newStatusValue) => handleEditFrequency(studentAttendanceId, memberId, newStatusValue)}
			/>
			<FooterContainer>
				<p>{MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.EDIT_TIP}</p>
				<ButtonGroup>
					<OutlineButton
						onClick={() => setHelpModalVisible(true)}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.HELP}
						enabled
					/>
					<MainButton
						onClick={() => {
							props.onStopEditing();
						}}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.FINISH_EDITING}
						enabled
					/>
				</ButtonGroup>
			</FooterContainer>
			<HelpModal
				isOpen={helpModalVisible}
				onClose={() => setHelpModalVisible(false)}
			/>
		</Container>
	);

};

export default EditingView;