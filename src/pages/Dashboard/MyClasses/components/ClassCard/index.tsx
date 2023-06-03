import React from "react";
import { ClassTime, StudentsClass } from "../../../../../types/StudentsClass";
import { Container, Footer, Header, Infos } from "./styles";
import { IoIosArrowForward } from "react-icons/io";
import { useAppTheme } from "../../../../../contexts/Theme";
import trashIcon from "../../../../../assets/images/trashIcon.svg";
import editIcon from "../../../../../assets/images/editIcon.svg";

export interface ClassCardProps {
    currentClass: StudentsClass;
	onClassSelected: (selectedClass: StudentsClass) => void;
}

const ClassCard = (props: ClassCardProps) => {

	const {currentTheme} = useAppTheme();

	const formatClassTime = (timeList: ClassTime[]) => {
		if (timeList.length === 0) return "";
		let weekDays = "";
		let times = "";
		timeList.forEach((time, index) => {
			weekDays += time.dayOfWeek;
			if(index !== timeList.length - 1){
				weekDays += ", ";
			}
			times += time.start + " - " + time.end;
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