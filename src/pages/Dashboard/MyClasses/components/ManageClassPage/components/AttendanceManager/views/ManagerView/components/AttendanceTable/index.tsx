import React, { useMemo } from "react";
import { DivTableContainer, HeaderContainer, HeaderItem, RowContainer, RowItem, RowStyled, UnsubscribedText } from "./styles";
import { CourseAttendance } from "../../../../../../../../../../../types/Course";
import MESSAGES from "../../../../../../../../../../../constants/messages";
import { getPastClassesTimeByFrequency } from "../../../../utils";
import moment from "moment";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../../../constants/frequency";
import { MdUnsubscribe } from "react-icons/md";


interface AttendanceTableProps {
	courseFrequency: CourseAttendance[]
}

const AttendanceTable = (props: AttendanceTableProps) => {

	const dateHeaderItems = useMemo(() => {
		return getPastClassesTimeByFrequency(props.courseFrequency);
	}, [props.courseFrequency]);

	const formatStudentName = (name: string) => {
		if (name.length > 30) {
			return name.substring(0, 30) + "...";
		}

		return name;
	};

	return (
		<DivTableContainer>
			<HeaderContainer itemCount={dateHeaderItems.length}>
				<HeaderItem isFirst><h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.STUDENTS}</h3></HeaderItem>
				{
					dateHeaderItems.map((item, index) => {
						return (
							<HeaderItem key={index}>
								<h3>{item !== "" ? moment(item).format("DD/MM") : " "}</h3>
								<p>{item !== "" ? moment(item).format("HH:mm") : " "}</p>
							</HeaderItem>
						);
					})
				}
			</HeaderContainer>
			<RowContainer itemCount={dateHeaderItems.length}>
				{
					props.courseFrequency.map((frequency, index) => {
						return (
							<RowStyled key={index} index={index}>
								<RowItem isFirst>{formatStudentName(frequency.name)}</RowItem>
								{
									dateHeaderItems.map((headerDate, index) => {
										const statusName = AVAILABLE_FREQUENCY_STATUS.get(frequency.frequencies.find(item => item.date === headerDate)?.status ?? -1)?.name;
										return (
											<RowItem key={index} value={statusName}>
												{
													statusName === undefined && headerDate !== "" ?
														<p>Não inscrito</p>
														: <h3>{headerDate === "" ? " " : statusName}</h3>
												}
											</RowItem>
										);
									})
								}
							</RowStyled>
						);
					})
				}
			</RowContainer>
		</DivTableContainer>
	);
};

export default AttendanceTable;
