import React, { useState } from "react";
import { DaysScroll, DeleteButtonContainer, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, RowContainer } from "./styles";
import { ClassTime, StudentsClass } from "../../../../../types/StudentsClass";
import { Dropdown, MainInput, TimeInput } from "../../../../../components/Inputs";
import { MainButton, OutlineButton } from "../../../../../components/Buttons";
import MESSAGES from "../../../../../constants/messages";
import closeIcon from "../../../../../assets/images/closeIcon.svg";
import { DAYS_OF_WEEK } from "../../../../../constants/dates";
import bluePlusIcon from "../../../../../assets/images/bluePlusIcon.svg";
import trashIcon from "../../../../../assets/images/trashIcon.svg";
import { Feedback } from "../../../../../types/Feedback";

interface NewClassModalProps {
	isOpen: boolean;
	onCancel: () => void;
	onFeedback: (feedback: Feedback) => void;
}


const NewClassModal = (props: NewClassModalProps) => {

	const [classDays, setClassDays] = useState<ClassTime []>([{ start: "07:00", end: "09:00", dayOfWeek: DAYS_OF_WEEK[0] }]);
	const timesRef = React.createRef<HTMLDivElement>();
	const [newClass, setNewClass] = useState<StudentsClass>({ id: -1, courseName: "", daysOfWeek:classDays, period: "", about: "" });


	const handleNewClass = () => {
		//TODO: Tratar se está tudo certinho e salvar no backend
		// props.handleNewClass(newClass);
		props.onFeedback({isOpen: true, success: true});
	};

	const handleAddClassTime = () => {
		const newClassTime:ClassTime = {start: "07:00", end: "09:00", dayOfWeek: DAYS_OF_WEEK[0]};
		setClassDays([...classDays, newClassTime]);
		timesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleUpdateClassTime = (newTime: ClassTime, index: number) => {
		const oldList = [...classDays];
		oldList[index] = newTime;
		setClassDays(oldList);
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
						<DaysScroll ref={timesRef}>
							{classDays.map((time, index) => (
								<RowContainer key={index}>
									<Dropdown
										items={DAYS_OF_WEEK}
										onChange={(newValue) => handleUpdateClassTime({...time, dayOfWeek: newValue}, index)}
										selected={time.dayOfWeek}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.WEEKDAY}
										style={{ marginRight: "8px", marginBottom: "8px" }}
									/>
									<TimeInput
										onChange={(newValue) => handleUpdateClassTime({...time, start: newValue}, index)}
										value={time.start}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.FROM}
										style={{ marginRight: "8px" }}
									/>
									<TimeInput
										onChange={(newValue) => handleUpdateClassTime({...time, end: newValue}, index)}
										value={time.end}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.TO}
										style={{ marginRight: "8px" }}
									/>
									{index != 0 &&
										<DeleteButtonContainer>
											<img src={trashIcon} alt="Delete" onClick={() => setClassDays(classDays.filter((_, i) => i != index))} style={{width:"20px"}} />
										</DeleteButtonContainer>
									}
								</RowContainer>)
							)}
						</DaysScroll>
						<OutlineButton
							enabled
							onClick={() => handleAddClassTime()}
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