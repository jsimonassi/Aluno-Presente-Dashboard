import React, {useEffect, useMemo, useState} from "react";
import { Container, FooterContainer } from "./styles";
import { FrequencyTable } from "./components";
import { CourseFrequency } from "../../../../../../../types/Course";
import DateNavigator from "../../../../../../../components/DateNavigator";
import moment from "moment";
import { filterFrequencyByMonth } from "./utils";
import { MainButton } from "../../../../../../../components/Buttons";


const mock =
	[
		{
			"id": "1",
			"name": "João Victor Simonassi",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "2",
			"name": "Lucas da Silva Lima",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "3",
			"name": "Pedrinho Feitosa",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "4",
			"name": "Sabrina dos Santos",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-28T12:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-07-01T12:00:00.685Z",
					"status": 1
				}
			]
		}
	] as CourseFrequency[];


const FrequencyController = () => {

	const [frequency, setFrequency] = useState<CourseFrequency[]>(mock); //TODO: Get frequency from API [CourseFrequency[]
	const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());
	const monthFrequencies = useMemo(() => {
		return filterFrequencyByMonth(frequency, currentDate.month());
	}, [currentDate]);

	const increaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().add(1, "months"));
	};

	const decreaseMonth = () => {
		setCurrentDate(previousDate => previousDate.clone().subtract(1, "months"));
	};

	return (
		<Container>
			<FrequencyTable courseFrequency={monthFrequencies} />

			<FooterContainer>
				<DateNavigator currentDate={currentDate} onNextMonth={increaseMonth} onPreviousMonth={decreaseMonth}/>
			</FooterContainer>
		</Container>
	);
};

export default FrequencyController;