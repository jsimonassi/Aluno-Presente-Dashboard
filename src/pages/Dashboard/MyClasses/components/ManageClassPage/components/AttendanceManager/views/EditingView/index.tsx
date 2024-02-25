import React from "react";
import { EditingInProgress } from "../../types";
import { ButtonGroup, Container, FooterContainer } from "./styles";
import MESSAGES from "../../../../../../../../../constants/messages";
import { MainButton, OutlineButton } from "../../../../../../../../../components/Buttons";
import AttendanceEditTable from "./components/AttendanceEditTable";
import { useAttendance } from "../../../../../../../../../contexts/Attendance";
import toast from "react-hot-toast";

interface EditingViewProps {
    editingInProgress: EditingInProgress;
    onStopEditing: () => void;
}

const EditingView = (props: EditingViewProps) => {

	const { updateFrequency } = useAttendance();
	const [editingInProgress, setEditingInProgress] = React.useState<EditingInProgress>(props.editingInProgress);

	const handleEditFrequency = (studentAttendanceId: string, memberId: string, newStatusValue: number) => {
		updateFrequency(studentAttendanceId, memberId, props.editingInProgress.currentDate, newStatusValue)
			.then((newAttendance) => newAttendance && setEditingInProgress({...editingInProgress, courseAttendance: newAttendance}))
			.catch(() => toast.error(MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.ERROR_UPDATING_ATTENDANCE));
	};

	return (
		<Container>
			<AttendanceEditTable 
				courseFrequency={editingInProgress.courseAttendance}
				onEditFrequency={(studentAttendanceId, memberId, newStatusValue) => handleEditFrequency(studentAttendanceId, memberId, newStatusValue)}
			/>
			<FooterContainer>
				<p>{MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.EDIT_TIP}</p>
				<ButtonGroup>
					<OutlineButton
						onClick={() => null}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.HELP}
						enabled
					/>
					<MainButton
						onClick={props.onStopEditing}
						text={MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.FINISH_EDITING}
						enabled
					/>
				</ButtonGroup>
			</FooterContainer>
		</Container>
	);

};

export default EditingView;