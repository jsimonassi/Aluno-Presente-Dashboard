import React from "react";
import { Container } from "./styles";
import { ShowFrequencyTable } from "./components";
import { CourseFrequency } from "../../../../../../../types/Course";

const mock =
	[
		{
			"id": "1",
			"name": "John1",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 1
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 1
				}
			]
		},
		{
			"id": "2",
			"name": "Para1",
			"frequencies": [
				{
					"date": "2023-06-24T00:00:00.685Z",
					"status": 2
				},
				{
					"date": "2023-06-24T12:00:00.685Z",
					"status": 2
				}
			]
		}
	] as CourseFrequency[];


const FrequencyController = () => {

	return (
		<Container>
			<ShowFrequencyTable courseFrequency={mock} />
		</Container>
	);
};

export default FrequencyController;