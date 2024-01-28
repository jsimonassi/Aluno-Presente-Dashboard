import React, { useMemo } from "react";
import { DivTableContainer, HeaderContainer, HeaderItem, RowContainer, RowItem, RowStyled} from "./styles";
import { CourseFrequency } from "../../../../../../../../../types/Course";
import MESSAGES from "../../../../../../../../../constants/messages";
import { getPastClassesTimeByFrequency } from "../../utils";
import moment from "moment";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../constants/frequency";


interface AttendanceTableProps {
	courseFrequency: CourseFrequency[]
}

const AttendanceTable = (props: AttendanceTableProps) => {

	const dateHeaderItems = useMemo(() => {
		return getPastClassesTimeByFrequency(props.courseFrequency);
	}, [props.courseFrequency]);

	const formatStudentName = (name: string) => {
		if(name.length > 30) {
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
								<h3>{moment(item).format("DD/MM")}</h3>
								<p>{moment(item).format("HH:mm")}</p>
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
									frequency.frequencies.map((item, index) => {
										return (
											<RowItem key={index} value={AVAILABLE_FREQUENCY_STATUS[item.status].name}>
												{AVAILABLE_FREQUENCY_STATUS[item.status].name}
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
