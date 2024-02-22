import React, { useState } from "react";
import { Course } from "../../../../../types/Course";
import { AddStudents, ManageClassHeader, AttendanceManager, StudentsFrequency } from "./components";
import MESSAGES from "../../../../../constants/messages";

interface ManageClassPageProps {
    selectedClass: Course;
	onRefreshClassRequested: () => void;
    onBack: () => void;
}

const ManageClassPage = (props: ManageClassPageProps) => {

	const [selectedOption, setSelectedOption] = useState<string>(props.selectedClass?.members?.length == 0 ?
		MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[1] : MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[0]);

	const renderSelectedOption = () => {
		switch (selectedOption) {
		case MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[0]:
			return <AttendanceManager currentClass={props.selectedClass} />;
		case MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[1]:
			return <AddStudents courseId={props.selectedClass.id} onRefreshClassRequested={props.onRefreshClassRequested} />;
		case MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[2]:
		default:
			return <StudentsFrequency />;
		}
	};
	

	return (
		<div>
			<ManageClassHeader
				onBack={props.onBack}
				className={props.selectedClass.name}
				onOptionSelected={(selection) => setSelectedOption(selection)}
				options={MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS}
				selectedOption={selectedOption}
			/>
			{renderSelectedOption()}
		</div>
	);
};

export default ManageClassPage;