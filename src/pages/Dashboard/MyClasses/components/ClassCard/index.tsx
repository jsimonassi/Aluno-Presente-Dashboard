import React from "react";
import { ClassTime, Course } from "../../../../../types/Course";
import { Container, Footer, Header, Infos } from "./styles";
import { IoIosArrowForward } from "react-icons/io";
import { useAppTheme } from "../../../../../contexts/Theme";
import trashIcon from "../../../../../assets/images/trashIcon.svg";
import editIcon from "../../../../../assets/images/editIcon.svg";
import { Helpers } from "../../../../../helpers";
import { DAYS_OF_WEEK } from "../../../../../constants/dates";

export interface ClassCardProps {
    currentClass: Course;
	onClassSelected: (selectedClass: Course) => void;
}

const ClassCard = (props: ClassCardProps) => {

	const {currentTheme} = useAppTheme();

	const formatClassTime = (timeList: ClassTime[]) => {
		if (timeList.length === 0) return "";
		let weekDays = "";
		let times = "";
		timeList.forEach((time, index) => {
			weekDays += DAYS_OF_WEEK[time.dayOfWeek];
			if(index !== timeList.length - 1){
				weekDays += ", ";
			}

			times += Helpers.DateConverter.convertClassTimeToMoment(time).start.format("HH:mm") + " - " + Helpers.DateConverter.convertClassTimeToMoment(time).end.format("HH:mm");
		});


		return weekDays + ": " + times;
	};

	return (
		<Container onClick={() => props.onClassSelected(props.currentClass)}>
			<Header>
				<Infos>
					<h1>{props.currentClass.courseName}</h1>
					<span>{formatClassTime(props.currentClass.daysOfWeek ?? [])}</span>
				</Infos>
				<IoIosArrowForward color={currentTheme.primary} fontSize="1.5em" />
			</Header>
			<Footer>
				<img src={editIcon} alt="Edit button" style={{width: "25px"}} />
				<img src={trashIcon} alt="Delete button" style={{width: "20px"}} />
			</Footer>
		</Container>
	);
};

export default ClassCard;