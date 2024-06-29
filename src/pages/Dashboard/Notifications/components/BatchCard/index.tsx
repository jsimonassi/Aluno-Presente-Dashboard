/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { BatchProcess } from "../../../../../types/api/BatchProcess";
import { BatchInfos, CardBackground, IconContainer, InfosContainer, ListContainer, MainInfosContainer, StatusInfos, StudentName, StudentsInfoContainer, StudentsListContainer } from "./styles";
import MESSAGES from "../../../../../constants/messages";
import moment from "moment";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppTheme } from "../../../../../contexts/Theme";
import { useAddBatch } from "../../../../../contexts/AddBatch";
import { StudentListLoader } from "./components/StudentListLoader";

interface BatchCardProps {
    currentMainProcess: BatchProcess
}

export const BatchCard = ({ currentMainProcess: currentProcess }: BatchCardProps) => {

	const [isOpen, setIsOpen] = useState(false);
	const [isLoadingFullInfos, setIsLoadingFullInfos] = useState(false);
	const { currentTheme } = useAppTheme();
	const { getFullBatchInfo, markBatchAsRead } = useAddBatch();

	const getFullInfos = () => {
		setIsLoadingFullInfos(true);
		getFullBatchInfo(currentProcess.id)
			.then((response) => {
				if(response.isViewed || !response.isFinished) return;
				markBatchAsRead(response);
			}).finally(() => setIsLoadingFullInfos(false));
	};

	useEffect(() => {
		if (isOpen && (!currentProcess.successes || !currentProcess.failures)) getFullInfos();
	}, [isOpen]);


	const renderSuccesses = () => {
		if (isLoadingFullInfos) {
			return <StudentListLoader />;
		}

		if (!currentProcess.successes || currentProcess.successes.length === 0) {
			return <StudentName isEmptyList changeBackground={false}>{MESSAGES.NOTIFICATIONS.NOTHING_TO_SHOW}</StudentName>;
		}

		return (
			<>
				{
					currentProcess.successes && currentProcess.successes.map((student, index) => {
						return (
							<StudentName key={index} changeBackground={index % 2 !== 0} >{student}</StudentName>
						);
					})
				}
			</>
		);
	};

	const renderFailures = () => {
		if (isLoadingFullInfos) {
			return <StudentListLoader />;
		}

		if (isLoadingFullInfos) {
			return <StudentListLoader />;
		}

		if (!currentProcess.failures || currentProcess.failures.length === 0) {
			return <StudentName isEmptyList changeBackground={false}>{MESSAGES.NOTIFICATIONS.NOTHING_TO_SHOW}</StudentName>;
		}

		return (
			<>
				{
					currentProcess.failures && currentProcess.failures.map((student, index) => {
						return (
							<StudentName key={index} changeBackground={index % 2 !== 0} >{student.alias}</StudentName>
						);
					})
				}
			</>
		);
	};

	return (
		<CardBackground isNew={currentProcess.isViewed || false} isOpen={isOpen}>
			<MainInfosContainer isOpen={isOpen}>
				<InfosContainer>
					<BatchInfos>
						<h3>{MESSAGES.NOTIFICATIONS.ADD_MEMBER}</h3>
						<p> - {moment(currentProcess.createdAt).format("DD/MM/YYYY - HH:mm")}</p>
						{
							!currentProcess?.isViewed && <h5>{MESSAGES.NOTIFICATIONS.NEW}</h5>
						}
					</BatchInfos>
					<StatusInfos>
						<p><b>{MESSAGES.NOTIFICATIONS.STATUS}</b>{
							currentProcess?.isFinished ?
								MESSAGES.NOTIFICATIONS.FINISHED :
								MESSAGES.NOTIFICATIONS.WORKING}</p>
					</StatusInfos>
				</InfosContainer>
				{ currentProcess.isFinished &&
					<IconContainer onClick={() => setIsOpen(prev => !prev)}>
						{isOpen ?
							<IoIosArrowUp color={currentTheme.primary} fontSize="2.0em" /> :
							<IoIosArrowDown color={currentTheme.primary} fontSize="2.0em" />
						}
					</IconContainer>
				}
			</MainInfosContainer>
			<StudentsInfoContainer isOpen={isOpen}>
				<hr />
				<StudentsListContainer>
					<h4>{MESSAGES.NOTIFICATIONS.ADDED_STUDENTS}</h4>
					<ListContainer>
						{
							renderSuccesses()
						}
					</ListContainer>
				</StudentsListContainer>
				<StudentsListContainer>
					<h4>{MESSAGES.NOTIFICATIONS.FAILED_STUDENTS}</h4>
					<ListContainer>
						{
							renderFailures()
						}
					</ListContainer>
				</StudentsListContainer>
				<small>{MESSAGES.NOTIFICATIONS.ERROR_TIP}</small>
			</StudentsInfoContainer>
		</CardBackground>
	);

};