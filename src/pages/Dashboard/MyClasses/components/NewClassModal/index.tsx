import React, { useState } from "react";
import { DaysScroll, DeleteButtonContainer, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, RowContainer } from "./styles";
import { ClassTime, Course } from "../../../../../types/Course";
import { Dropdown, MainInput, TimeInput } from "../../../../../components/Inputs";
import { MainButton, OutlineButton } from "../../../../../components/Buttons";
import MESSAGES from "../../../../../constants/messages";
import closeIcon from "../../../../../assets/images/closeIcon.svg";
import bluePlusIcon from "../../../../../assets/images/bluePlusIcon.svg";
import trashIcon from "../../../../../assets/images/trashIcon.svg";
import { Feedback } from "../../../../../types/Feedback";
import { Helpers } from "../../../../../helpers";
import { DAYS_OF_WEEK } from "../../../../../constants/dates";
import moment from "moment";

interface NewClassModalProps {
	isOpen: boolean;
	onCancel: () => void;
	onFeedback: (feedback: Feedback) => void;
}


const NewClassModal = (props: NewClassModalProps) => {

	const [classDays, setClassDays] = useState<ClassTime []>([{ startHour: 7, startMinute: 0, endHour: 9, endMinute: 0, dayOfWeek: 0}]);
	const timesRef = React.createRef<HTMLDivElement>();
	const [newClass, setNewClass] = useState<Course>({ id: -1, courseName: "", daysOfWeek:classDays , period: "", about: "" });


	const handleNewClass = () => {
		//TODO: Tratar se está tudo certinho e salvar no backend
		// props.handleNewClass(newClass);
		props.onFeedback({isOpen: true, success: true});
	};

	const handleAddClassTime = () => {
		const newClassTime:ClassTime = { startHour: 7, startMinute: 0, endHour: 9, endMinute: 0, dayOfWeek: 0};
		setClassDays([...classDays, newClassTime]);
		timesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleUpdateClassTime = (newTime: ClassTime, index: number) => {
		console.log("Hora atual: ", newTime);
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
										onChange={(newValue) => handleUpdateClassTime({...time, dayOfWeek: DAYS_OF_WEEK.indexOf(newValue)}, index)}
										selected={DAYS_OF_WEEK[time.dayOfWeek]}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.WEEKDAY}
										style={{ marginRight: "8px", marginBottom: "8px" }}
									/>
									<TimeInput
										onChange={(newValue) => handleUpdateClassTime({...time, startHour: moment(newValue).hours(), startMinute: moment(newValue).minute()}, index)}
										value={Helpers.DateConverter.convertClassTimeToMoment(time).start.format("HH:mm")}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.FROM}
										style={{ marginRight: "8px" }}
									/>
									<TimeInput
										onChange={(newValue) => handleUpdateClassTime({...time, endHour: moment(newValue).hours(), endMinute:  moment(newValue).minute()}, index)}
										value={Helpers.DateConverter.convertClassTimeToMoment(time).end.format("HH:mm")}
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