import React from "react";
import { Container } from "./styles";
import { ShowFrequencyTable } from "./components";
import { CourseFrequency } from "../../../../../../../types/Course";

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

	return (
		<Container>
			<ShowFrequencyTable courseFrequency={mock} />
		</Container>
	);
};

export default FrequencyController;