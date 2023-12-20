import React, { useEffect, useState } from "react";
import { DaysScroll, DeleteButtonContainer, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, RowContainer } from "./styles";
import { ClassTime, Course } from "../../../../../../types/Course";
import { Dropdown, MainInput, TimeInput } from "../../../../../../components/Inputs";
import { MainButton, OutlineButton } from "../../../../../../components/Buttons";
import MESSAGES from "../../../../../../constants/messages";
import closeIcon from "../../../../../../assets/images/closeIcon.svg";
import bluePlusIcon from "../../../../../../assets/images/bluePlusIcon.svg";
import trashIcon from "../../../../../../assets/images/trashIcon.svg";
import { Feedback } from "../../../../../../types/Feedback";
import { Helpers } from "../../../../../../helpers";
import { DAYS_OF_WEEK } from "../../../../../../constants/dates";
import moment from "moment";
import Api from "../../../../../../services/api";

const newClassInitialState = {
	id: "",
	name: "",
	daysOfWeeks: [],
	period: undefined,
	about: ""
};

interface NewClassModalProps {
	isOpen: boolean;
	onCancel: () => void;
	onFeedback: (feedback: Feedback) => void;
}


const NewClassModal = (props: NewClassModalProps) => {

	const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
	const [classDays, setClassDays] = useState<ClassTime[]>([{
		momentStart: moment().set({ hour: 7, minute: 0, second: 0 }),
		momentEnd: moment().set({ hour: 9, minute: 0, second: 0 })
	}]);
	const timesRef = React.createRef<HTMLDivElement>();
	const [newClass, setNewClass] = useState<Course>({ id: "", name: "", daysOfWeeks: classDays, period: undefined, about: "" });
	const [nameError, setNameError] = useState<string>("");
	const [aboutError, setAboutError] = useState<string>("");
	const [periodError, setPeriodError] = useState<string>("");

	useEffect(() => {
		setNewClass(newClassInitialState);
		setNameError("");
		setAboutError("");
		setPeriodError("");
		setClassDays([{
			momentStart: moment().set({ hour: 7, minute: 0, second: 0 }),
			momentEnd: moment().set({ hour: 9, minute: 0, second: 0 })
		}]);
	}, [props.isOpen]);

	useEffect(() => {
		Api.Periods.getPeriods()
			.then((response) => {
				setAvailablePeriods(response);
			});
	}, []);

	const handleNewClass = () => {
		let allRight = true;
		if (newClass.name === "") {
			allRight = false;
			setNameError(MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.MANDATORY_FIELD);
		} else {
			setNameError("");
		}

		if(newClass.period === undefined){
			allRight = false;
			setPeriodError(MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.MANDATORY_FIELD);
		}else {
			setPeriodError("");
		}

		if(newClass.about === ""){
			allRight = false;
			setAboutError(MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.MANDATORY_FIELD);
		} else {
			setAboutError("");
		}

		if (allRight) {
			classDays.forEach((day) => {
				day.start = day.momentStart.format(Helpers.DateHelpers.APP_DATE_FORMAT);
				day.end = day.momentEnd.format(Helpers.DateHelpers.APP_DATE_FORMAT);
			});
			newClass.daysOfWeeks = classDays;
			Api.Classes.addClass(newClass).then(() => {
				props.onFeedback({ isOpen: true, success: true });
			}).catch((error) => {
				console.log(error);
				props.onFeedback({ isOpen: true, success: false });
			});
		}
	};

	const handleAddClassTime = () => {
		const newClassTime: ClassTime = { momentStart: classDays[classDays.length - 1].momentStart.clone().add(1, "day"), momentEnd: classDays[classDays.length - 1].momentEnd.clone().add(1, "day") };
		setClassDays([...classDays, newClassTime]);
		timesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleUpdateClassTime = (newTime: ClassTime, index: number) => {
		console.log("Hora atual: ", newTime.momentStart.format(Helpers.DateHelpers.APP_DATE_FORMAT));
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
							value={newClass.name ?? ""}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.COURSE_PLACEHOLDER}
							onChange={(newValue) => setNewClass({ ...newClass, name: newValue })}
							errorText={nameError}
							inputStyle={{ borderRadius: "16px", marginRight: "8px" }}
						/>
						<Dropdown
							items={availablePeriods}
							onChange={(selectedValue) =>  setNewClass({ ...newClass, period: selectedValue })}
							selected={newClass.period}
							title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.PERIOD}
							containerItemsStyle={{ width: "30%" }}
							style={{ marginBottom: "10px" }}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.PERIOD_PLACEHOLDER}
							errorText={periodError}
						/>
					</RowContainer>
					<RowContainer>
						<DaysScroll ref={timesRef}>
							{classDays.map((time, index) => (
								<RowContainer key={index}>
									<Dropdown
										items={DAYS_OF_WEEK}
										onChange={(newValue) => handleUpdateClassTime({ ...time, momentStart: time.momentStart.weekday(DAYS_OF_WEEK.indexOf(newValue) + 1), momentEnd: time.momentEnd.weekday(DAYS_OF_WEEK.indexOf(newValue) + 1) }, index)}
										selected={DAYS_OF_WEEK[time.momentStart.isoWeekday() - 1]}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.WEEKDAY}
										style={{ marginRight: "8px", marginBottom: "8px" }}
									/>
									<TimeInput
										onChange={(newValue) => {
											const newStartDate = Helpers.DateHelpers.updateHourAndMinute(time.momentStart, newValue);
											handleUpdateClassTime(
												{
													...time,
													momentStart: newStartDate,
													momentEnd: Helpers.DateHelpers.getNextValidEndDate(newStartDate, time.momentEnd)
												}, index);
										}}
										value={time.momentStart.format("HH:mm")}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.FROM}
										style={{ marginRight: "8px" }}
									/>
									<TimeInput
										onChange={(newValue) => {
											const newEndDate = Helpers.DateHelpers.updateHourAndMinute(time.momentEnd, newValue);

											if (!Helpers.DateHelpers.endDateIsValid(time.momentStart, newEndDate)) {
												return;
											}

											handleUpdateClassTime(
												{
													...time,
													momentEnd: newEndDate
												}, index);
										}}
										value={time.momentEnd.format("HH:mm")}
										title={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.TO}
										style={{ marginRight: "8px" }}
									/>
									{index != 0 &&
										<DeleteButtonContainer onClick={() => setClassDays(classDays.filter((_, i) => i != index))}>
											<img src={trashIcon} alt="Delete" style={{ width: "20px" }} />
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
							value={newClass.about ?? ""}
							placeholder={MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.ABOUT_PLACEHOLDER}
							onChange={(newValue) => setNewClass({ ...newClass, about: newValue })}
							errorText={aboutError}
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