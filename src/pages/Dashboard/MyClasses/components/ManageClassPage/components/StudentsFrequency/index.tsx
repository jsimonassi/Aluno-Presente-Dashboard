import React from "react";
import { ChartContainer, Container } from "./styles";
import { VictoryPie } from "victory";
import MESSAGES from "../../../../../../../constants/messages";
import { useAppTheme } from "../../../../../../../contexts/Theme";


const StudentsFrequency = () => {

	const {currentTheme} = useAppTheme();

	const getClassFrequency = () => {
		return 80;
	};

	return (
		<Container>
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FREQUENCY}</h1>
			<ChartContainer>
				<VictoryPie
					style={{parent: { maxWidth: "40%", minWidth: "300px" }}}
					colorScale={[currentTheme.primary, currentTheme.error ]}
					data={[
						{ x: "Presença", y: getClassFrequency() },
						{ x: "Faltas", y: 100 - getClassFrequency() },
					]}
				/>
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FREQUENCY_DESCRIPTION + getClassFrequency()}%.</h3>
			</ChartContainer>
		</Container>
	);
};

export default StudentsFrequency;