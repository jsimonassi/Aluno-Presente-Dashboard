import React, { useState } from "react";
import { StudentsClass } from "../../../../../types/StudentsClass";
import { AddStudents, ManageClassHeader, StartFrequency, StudentsFrequency } from "./components";
import MESSAGES from "../../../../../constants/messages";

interface ManageClassPageProps {
    selectedClass: StudentsClass;
    onBack: () => void;
}

const ManageClassPage = (props: ManageClassPageProps) => {

	const [selectedOption, setSelectedOption] = useState<string>(MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[1]);

	const renderSelectedOption = () => {
		switch (selectedOption) {
		case MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[0]:
			return <StartFrequency />;
		case MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[1]:
			return <AddStudents />;
		case MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[2]:
		default:
			return <StudentsFrequency />;
		}
	};
	

	return (
		<div>
			<ManageClassHeader
				onBack={props.onBack}
				className={props.selectedClass.courseName}
				onOptionSelected={(selection) => setSelectedOption(selection)}
				options={MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS}
				selectedOption={selectedOption}
			/>
			{renderSelectedOption()}
		</div>
	);
};

export default ManageClassPage;