import React, { useEffect, useState } from "react";
import { ChartContainer, Container } from "./styles";
import { VictoryPie } from "victory";
import MESSAGES from "../../../../../../../constants/messages";
import { useAppTheme } from "../../../../../../../contexts/Theme";
import { Course } from "../../../../../../../types/Course";
import moment from "moment";
import Api from "../../../../../../../services/api";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../constants/frequency";

interface StudentsFrequencyProps {
	currentClass: Course;
}

const StudentsFrequency = (props: StudentsFrequencyProps) => {

	const {currentTheme} = useAppTheme();
	const [presentStudents, setPresentStudents] = useState(1);
	const [faultStudents, setFaultStudents] = useState(1);

	useEffect(() => {
		if(!props.currentClass.period) return;
		const startInterval = props.currentClass.period.split(".")[1] === "1" ? moment().startOf("year") :  moment().startOf("year").add(6, "months");
		const endInterval = props.currentClass.period.split(".")[1] === "1" ? moment().startOf("year").add(6, "months") :  moment().endOf("year");
		Api.Frequencies.getFrequencyByDate(props.currentClass.id, startInterval.format(), endInterval.format())
			.then((response) => {
				let presents = 0;
				let faults = 0;

				response.forEach((item) => {
					item.frequencies.forEach((frequency) => {
						if(frequency.status === AVAILABLE_FREQUENCY_STATUS.get(1)?.id){
							presents++;
						} else if(frequency.status === AVAILABLE_FREQUENCY_STATUS.get(2)?.id){
							faults++;
						}
					});
				});
			
				setPresentStudents(presents);
				setFaultStudents(faults);
			}).catch((error) => {
				console.log("Deu erro", error);
				//TODO: Finalizar tela!
			});
	}, []);

	return (
		<Container>
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FREQUENCY}</h1>
			<ChartContainer>
				<VictoryPie
					style={{parent: { maxWidth: "40%", minWidth: "300px" }}}
					colorScale={[currentTheme.primary, currentTheme.error ]}
					data={[
						{ x: "Presença", y: presentStudents},
						{ x: "Faltas", y: faultStudents },
					]}
				/>
				<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FREQUENCY_DESCRIPTION + ((presentStudents + faultStudents)/faultStudents).toFixed(2)}%.</h3>
			</ChartContainer>
		</Container>
	);
};

export default StudentsFrequency;