import React from "react";
import { Course } from "../../../../../types/Course";
import { Container, Footer, Header, Infos } from "./styles";
import { IoIosArrowForward } from "react-icons/io";
import { useAppTheme } from "../../../../../contexts/Theme";
import trashIcon from "../../../../../assets/images/trashIcon.svg";
import editIcon from "../../../../../assets/images/editIcon.svg";

export interface ClassCardProps {
    currentClass: Course;
	onClassSelected: () => void;
	onDeleteRequested: () => void;
	onEditRequested: () => void;
}

const ClassCard = (props: ClassCardProps) => {

	const {currentTheme} = useAppTheme();

	return (
		<Container>
			<Header  onClick={() => props.onClassSelected()}>
				<Infos>
					<h1>{props.currentClass.name}</h1>
					{
						props.currentClass.daysOfWeek?.map((_, index) => (
							<span key={index}>{}</span>
						))
					}
				</Infos>
				<IoIosArrowForward color={currentTheme.primary} fontSize="1.5em" />
			</Header>
			<Footer>
				<img onClick={props.onEditRequested} src={editIcon} alt="Edit button" style={{width: "25px"}} />
				<img onClick={props.onDeleteRequested} src={trashIcon} alt="Delete button" style={{width: "20px"}} />
			</Footer>
		</Container>
	);
};

export default ClassCard;