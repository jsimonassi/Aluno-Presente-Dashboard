import React, { useState } from "react";
import { DaysScroll, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, RowContainer } from "./styles";
import { StudentsClass } from "../../../../../types/StudentsClass";
import { Dropdown, MainInput, TimeInput } from "../../../../../components/Inputs";
import { MainButton, OutlineButton } from "../../../../../components/Buttons";
import MESSAGES from "../../../../../constants/messages";
import closeIcon from "../../../../../assets/images/closeIcon.svg";
import { DAYS_OF_WEEK } from "../../../../../constants/dates";
import bluePlusIcon from "../../../../../assets/images/bluePlusIcon.svg";

interface NewClassModalProps {
	isOpen: boolean;
	onCancel: () => void;
	handleNewClass: (studentClass: StudentsClass) => void;
}


const NewClassModal = (props: NewClassModalProps) => {

	const [newClass, setNewClass] = useState<StudentsClass>({ id: -1, courseName: "", daysOfWeek: [{ start: "07:00", end: "09:00", dayOfWeek: DAYS_OF_WEEK[0] }], period: "", about: "" });

	const handleNewClass = () => {
		//TODO: Tratar se está tudo certinho
		props.handleNewClass(newClass);
	};

	const handleAddTime = () => {
		console.log("Add Time");
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onCancel(); }} />
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
							inputStyle={{ borderRadius: "16px", marginRight: "8px" }}
						/>
						<MainInput
							type="text"
							title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.PERIOD}
							value={newClass.period ?? ""}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.PERIOD_PLACEHOLDER}
							onChange={(newValue) => setNewClass({ ...newClass, period: newValue })}
							errorText={""}
							inputStyle={{ borderRadius: "16px" }}
						/>
					</RowContainer>
					<RowContainer>
						<DaysScroll>
							{newClass.daysOfWeek && newClass.daysOfWeek.map((day, index) => (
								<RowContainer key={index}>
									<Dropdown
										items={DAYS_OF_WEEK}
										onChange={() => null}
										selected="a"
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.WEEKDAY}
										style={{ marginRight: "8px", marginBottom: "8px" }}
									/>
									<TimeInput
										onChange={() => null}
										value="00:00"
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.FROM}
										style={{ marginRight: "8px" }}
									/>
									<TimeInput
										onChange={() => null}
										value="00:30"
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.TO}
										style={{ marginRight: "8px" }}
									/>
								</RowContainer>)
							)}
						</DaysScroll>
						<OutlineButton
							enabled
							onClick={() => handleAddTime()}
							text={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.NEW_TIME}
							leftIcon={bluePlusIcon}
							styles={{ maxWidth: "300px", width: "50%", marginLeft: "16px" }}
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
							inputStyle={{ borderRadius: "16px", marginRight: "8px" }}
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