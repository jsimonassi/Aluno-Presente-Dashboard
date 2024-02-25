import React, { useMemo } from "react";
import { DivTableContainer, HeaderContainer, HeaderItem, RowContainer, RowItem, RowStyled} from "./styles";
import { CourseAttendance } from "../../../../../../../../../../../types/Course";
import MESSAGES from "../../../../../../../../../../../constants/messages";
import { getPastClassesTimeByFrequency } from "../../../../utils";
import moment from "moment";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../../../constants/frequency";
import EditBtnGroup from "../EditBtnGroup";

interface AttendanceEditTableProps {
	courseFrequency: CourseAttendance[];
	onEditFrequency: (studentAttendanceId: string, memberId: string, newStatusValue: number) => void
}

const AttendanceEditTable = (props: AttendanceEditTableProps) => {

	const dateHeaderItems = useMemo(() => {
		return getPastClassesTimeByFrequency(props.courseFrequency);
	}, [props.courseFrequency]);

	const formatStudentName = (name: string) => {

		if(name.length > 35) {
			return name.substring(0, 35) + "...";
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
								<h3>{ item !== "" ? moment(item).format("DD/MM") : " "}</h3>
								<p>{ item !== "" ? moment(item).format("HH:mm") : " "}</p>
							</HeaderItem>
						);
					})
				}
			</HeaderContainer>
			<RowContainer itemCount={dateHeaderItems.length}>
				{
					props.courseFrequency.map((studentAttendance, index) => {
						return (
							<RowStyled key={index} index={index}>
								<RowItem isFirst>{formatStudentName(studentAttendance.name)}</RowItem>
								{
									dateHeaderItems.map((headerDate, index) => {
										const statusName = AVAILABLE_FREQUENCY_STATUS.get(studentAttendance.frequencies.find(item => item.date === headerDate)?.status ?? 3)?.name;
										return (
											<RowItem key={index} value={statusName}>
												<EditBtnGroup 
													status={headerDate === "" ? undefined : statusName}
													onNewStatusSelected={(newStatus) => {
														const frequencyId = studentAttendance.frequencies.find(item => item.date === headerDate)?.id ?? "";
														const newStatusValue = Array.from(AVAILABLE_FREQUENCY_STATUS.values()).findIndex(item => item.name === newStatus);
														props.onEditFrequency(frequencyId, studentAttendance.id, newStatusValue);
													}}
												/>
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

export default AttendanceEditTable;
