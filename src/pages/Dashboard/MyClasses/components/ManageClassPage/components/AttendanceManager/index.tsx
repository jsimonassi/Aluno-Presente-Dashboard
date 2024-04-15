import React, { useState } from "react";
import { Course } from "../../../../../../../types/Course";
import ManagerView from "./views/ManagerView";
import EditingView from "./views/EditingView";
import { NoDataView } from "./views/NoDataView";

interface AttendanceManagerProps {
	currentClass: Course;
}

const AttendanceManager = (props: AttendanceManagerProps) => {
	const [attendanceKeyInEditing, setAttendanceKeyInEditing] = useState<string | null>(null);

	if(!props.currentClass.members || props.currentClass.members?.length <= 0) {
		return (
			<NoDataView />
		);
	}

	if(attendanceKeyInEditing) {
		return (
			<EditingView 
				compositeKey={attendanceKeyInEditing}
				onStopEditing={() => setAttendanceKeyInEditing(null)} 
			/>
		);
	}

	return (
		<ManagerView 
			currentClass={props.currentClass} 
			onSetEditingAttendance={(compositeKey) => setAttendanceKeyInEditing(compositeKey)}
		/>
	);

};

export default AttendanceManager;