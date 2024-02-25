import React, { useState } from "react";
import { Course } from "../../../../../../../types/Course";
import ManagerView from "./views/ManagerView";
import EditingView from "./views/EditingView";
import { EditingInProgress } from "./types";

interface AttendanceManagerProps {
	currentClass: Course;
}

const AttendanceManager = (props: AttendanceManagerProps) => {
	const [editingAttendance, setEditingAttendance] = useState<EditingInProgress | null>(null);

	if(editingAttendance) {
		return (
			<EditingView 
				editingInProgress={editingAttendance}
				onStopEditing={() => setEditingAttendance(null)} 
			/>
		);
	}

	return (
		<ManagerView 
			currentClass={props.currentClass} 
			onStartEditingAttendance={(editing) => setEditingAttendance(editing)} 
		/>
	);

};

export default AttendanceManager;