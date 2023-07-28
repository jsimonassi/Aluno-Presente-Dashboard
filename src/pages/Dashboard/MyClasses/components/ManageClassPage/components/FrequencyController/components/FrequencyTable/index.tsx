import React, { useMemo } from "react";
import { FrequencyDataStyled, TableHeaderStyled, TableRowStyled, TableStyled } from "./styles";
import { CourseFrequency } from "../../../../../../../../../types/Course";
import MESSAGES from "../../../../../../../../../constants/messages";
import { getPastClassesTimeByFrequency } from "../../utils";
import moment from "moment";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../constants/frequency";


interface FrequencyTableProps {
	courseFrequency: CourseFrequency[]
}

const FrequencyTable = (props: FrequencyTableProps) => {

	const dateHeaderItems = useMemo(() => {
		return getPastClassesTimeByFrequency(props.courseFrequency);
	}, [props.courseFrequency]);

	return (
		<div>
			<TableStyled cellSpacing={0} cellPadding={0}>
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
							<TableRowStyled key={index} index={index} >
								<FrequencyDataStyled value="">{currentStudent.name}</FrequencyDataStyled>
								{dateHeaderItems?.map((currentDate, index) => {
									const frequencyData = AVAILABLE_FREQUENCY_STATUS.get(currentStudent.frequencies.find((frequency) => moment(frequency.date).isSame(currentDate))?.status ?? -1)?.name ?? "";
									return (
										<FrequencyDataStyled key={index} value={frequencyData}>
											{
												frequencyData
											}
										</FrequencyDataStyled>
									);
								})}
							</TableRowStyled>
						))
					}
				</tbody>
			</TableStyled>

		</div>
	);
};

export default FrequencyTable;