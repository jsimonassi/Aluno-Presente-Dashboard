import React, { useState } from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, RowContainer } from "./styles";
import { StudentsClass } from "../../../../../types/StudentsClass";
import { MainInput } from "../../../../../components/Inputs";
import { MainButton } from "../../../../../components/Buttons";
import MESSAGES from "../../../../../constants/messages";
import closeIcon from "../../../../../assets/images/closeIcon.svg";

interface NewClassModalProps {
	isOpen: boolean;
	onCancel: () => void;
	handleNewClass: (studentClass: StudentsClass) => void;
}


const NewClassModal = (props: NewClassModalProps ) => {

	const [newClass, setNewClass] = useState<StudentsClass>({id: -1, courseName: ""});

	const handleNewClass = () => {
		//TODO: Tratar se está tudo certinho
		props.handleNewClass(newClass);
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => {props.onCancel();}}/>
					</div> 
				</ModalHeader>
				<ModalBody >
					<RowContainer >
						<MainInput
							type="text"
							title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.COURSE}
							value={newClass.courseName ?? ""}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.COURSE_PLACEHOLDER}
							onChange={(newValue) => setNewClass({ ...newClass, courseName: newValue })}
							errorText={""}
							inputStyle={{borderRadius: "16px", marginRight: "8px"}}
						/>
						<MainInput
							type="text"
							title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.PERIOD}
							value={newClass.period ?? ""}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.PERIOD_PLACEHOLDER}
							onChange={(newValue) => setNewClass({ ...newClass, period: newValue })}
							errorText={""}
							inputStyle={{borderRadius: "16px"}}
						/>
					</RowContainer>
					<RowContainer >
						<MainInput
							type="text"
							title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.ABOUT}
							value={newClass.courseName ?? ""}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.ABOUT_PLACEHOLDER}
							onChange={(newValue) => setNewClass({ ...newClass, courseName: newValue })}
							errorText={""}
							inputStyle={{borderRadius: "16px", marginRight: "8px"}}
							rowsNumber={4}
						/>
					</RowContainer>
					<ModalFooter >
						<MainButton enabled onClick={() => handleNewClass()} text={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.SAVE} />
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);
};

export default NewClassModal;