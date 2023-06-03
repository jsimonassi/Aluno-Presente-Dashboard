import React, { useState } from "react";
import { StudentsClass } from "../../../../../types/StudentsClass";
import { ManageClassHeader } from "./components";
import MESSAGES from "../../../../../constants/messages";

interface ManageClassPageProps {
    selectedClass: StudentsClass;
    onBack: () => void;
}

const ManageClassPage = (props: ManageClassPageProps) => {

	const [selectedOption, setSelectedOption] = useState<string>(MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS[0]);

	return (
		<div>
			<ManageClassHeader
				onBack={props.onBack}
				className={props.selectedClass.courseName}
				onOptionSelected={(selection) => setSelectedOption(selection)}
				options={MESSAGES.MY_CLASSES.MANAGE_CLASS.AVAILABLE_OPTIONS}
				selectedOption={selectedOption}
			/>
		</div>
	);
};

export default ManageClassPage;