import React, { useMemo } from "react";
import { Container, TableHeaderStyled } from "./styles";
import { CourseFrequency } from "../../../../../../../../../types/Course";
import MESSAGES from "../../../../../../../../../constants/messages";
import { getPastClassesTimeByFrequency } from "../../utils";
import moment from "moment";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../constants/frequency";


interface ShowFrequencyTableProps {
    courseFrequency: CourseFrequency[]
}

const ShowFrequencyTable = (props: ShowFrequencyTableProps) => {

	const dateHeaderItems = useMemo(() => {
		return getPastClassesTimeByFrequency(props.courseFrequency);
	}, [props.courseFrequency]);

	return (
		<Container>
			<table cellSpacing={0} cellPadding={0}>
				<thead>
					<TableHeaderStyled >
						<th>{MESSAGES.MY_CLASSES.FREQUENCY_CONTROLLER.STUDENTS}</th>
						{dateHeaderItems?.map((currentDate, index) => (
							<th key={index}>
								<h5>{moment(currentDate).format("DD/MM")}</h5>
								<p>{moment(currentDate).format("hh:mm")}</p>
							</th>
						))}
					</TableHeaderStyled>
				</thead>
				<tbody>
					{
						props.courseFrequency?.map((currentStudent, index) => (
							<tr key={index}>
								<td>{currentStudent.name}</td>
								{dateHeaderItems?.map((currentDate, index) => (
									<td key={index}>
										{
											AVAILABLE_FREQUENCY_STATUS.get(currentStudent.frequencies.find((frequency) => moment(frequency.date).isSame(currentDate))?.status ?? -1)?.name ?? ""
										}
									</td>
								))}
							</tr>
						))
					}
				</tbody>
			</table>

		</Container>
	);
};

export default ShowFrequencyTable;