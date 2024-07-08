import React, { useEffect, useMemo, useState } from "react";
import { Container, ContentContainer, EmptyContainer, InfoRow, InfosContainer } from "./styles";
import { VictoryPie } from "victory";
import MESSAGES from "../../../../../../../constants/messages";
import { useAppTheme } from "../../../../../../../contexts/Theme";
import { Course } from "../../../../../../../types/Course";
import moment from "moment";
import Api from "../../../../../../../services/api";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../constants/frequency";
import { MainLoader } from "../../../../../../../components/Loaders";
import emptyImg from "../../../../../../../assets/images/emptyClassImg.svg";

interface StudentsFrequencyProps {
	currentClass: Course;
}

const StudentsFrequency = (props: StudentsFrequencyProps) => {

	const { currentTheme } = useAppTheme();
	const [presentStudents, setPresentStudents] = useState<number | undefined>(undefined);
	const [faultStudents, setFaultStudents] = useState<number | undefined>(undefined);
	const [sumClass, setSumClass] = useState<number>(0);
	const [error, setError] = useState("");
	const startDate = useMemo(() => {
		if (!props.currentClass.period) return;
		return props.currentClass.period.split(".")[1] === "1" ? moment().startOf("year") : moment().startOf("year").add(6, "months");
	}, [props.currentClass.period]);

	const endDate = useMemo(() => {
		if (!props.currentClass.period) return;
		return props.currentClass.period.split(".")[1] === "1" ? moment().startOf("year").add(7, "months") : moment().endOf("year");
	}, [props.currentClass.period]);

	const chartData = useMemo(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = [];
	
		if (presentStudents !== undefined && presentStudents > 0) {
			data.push({ x: "Presença: " + presentStudents, y: presentStudents });
		}
	
		if (faultStudents !== undefined && faultStudents > 0) {
			data.push({ x: "Faltas: " + faultStudents, y: faultStudents });
		}
	
		return data;
	}, [presentStudents, faultStudents]);

	useEffect(() => {
		if (!props.currentClass.period || !startDate || !endDate) return;
		Api.Frequencies.getFrequencyByDate(props.currentClass.id, startDate.format(), endDate.format())
			.then((response) => {
				let presents = 0;
				let faults = 0;
				response.forEach((item) => {
					if (item.frequencies.length > sumClass) setSumClass(item.frequencies.length);

					item.frequencies.forEach((frequency) => {
						if (frequency.status === AVAILABLE_FREQUENCY_STATUS.get(1)?.id) {
							presents++;
						} else if (frequency.status === AVAILABLE_FREQUENCY_STATUS.get(2)?.id) {
							faults++;
						}
					});
				});
				setPresentStudents(presents);
				setFaultStudents(faults);
			}).catch(() => {
				setError(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_LOADING_FREQUENCY);
			});
	}, []);

	const getContent = () => {
		if (error) return <h3>{error}</h3>;

		if (presentStudents === undefined || faultStudents === undefined) return <MainLoader />;

		if (presentStudents === 0 && faultStudents === 0) {
			return (
				<EmptyContainer>
					<img src={emptyImg} alt="Nada para mostrar" />
					<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.NOTHING_TO_SHOW}</h3>
					<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.NOTHING_TO_SHOW_TIP}</p>
				</EmptyContainer>
			);
		}

		return (
			<>
				<VictoryPie
					style={{ parent: { maxWidth: "40%", minWidth: "300px" }, labels: { fontSize: 20, fill: "white" }}}
					colorScale={[currentTheme.primary, currentTheme.error]}
					labelRadius={50}
					data={chartData}
				/>
				<InfosContainer>
					<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FREQUENCY_DESCRIPTION + ((presentStudents * 100)/(presentStudents + faultStudents)).toFixed(0)}%</h3>
					<InfoRow>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.TOTAL_CLASSES}</h3>
						<p>{sumClass}</p>
					</InfoRow>
					<InfoRow>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.PRESENT_STUDENTS}</h3>
						<p>{presentStudents}</p>
					</InfoRow>
					<InfoRow>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.FAULT_STUDENTS}</h3>
						<p>{faultStudents}</p>
					</InfoRow>
					<InfoRow>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.SEARCH_INTERVAL}</h3>
						<p>{startDate?.format("DD/MM/YYYY")} a {endDate?.format("DD/MM/YYYY")}</p>
					</InfoRow>
					<InfoRow>
						<h3>{MESSAGES.MY_CLASSES.MANAGE_CLASS.CLASSROOM_FREQUENCY.PERIOD}</h3>
						<p>{startDate?.format("YYYY")}.{props.currentClass.period?.split(".")[1]} </p>
					</InfoRow>
				</InfosContainer>
			</>
		);
	};

	return (
		<Container>
			<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FREQUENCY}</h1>
			<ContentContainer>
				{getContent()}
			</ContentContainer>
		</Container>
	);
};

export default StudentsFrequency;