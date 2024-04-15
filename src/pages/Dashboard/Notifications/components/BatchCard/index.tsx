/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { BatchProcess } from "../../../../../types/api/BatchProcess";
import { BatchInfos, CardBackground, IconContainer, InfosContainer, ListContainer, MainInfosContainer, StatusInfos, StudentName, StudentsInfoContainer, StudentsListContainer } from "./styles";
import MESSAGES from "../../../../../constants/messages";
import moment from "moment";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppTheme } from "../../../../../contexts/Theme";
import { useAddBatch } from "../../../../../contexts/AddBatch";

interface BatchCardProps {
    currentMainProcess: BatchProcess
}

export const BatchCard = ({ currentMainProcess }: BatchCardProps) => {

	const [isOpen, setIsOpen] = useState(false);
	const [currentProcess, setCurrentProcess] = useState<BatchProcess>(currentMainProcess);
	const { currentTheme } = useAppTheme();
	const { getFullBatchInfo } = useAddBatch();

	const getFullInfos = () => {
		getFullBatchInfo(currentProcess.id)
			.then((response) => {
				setCurrentProcess(response);
			});
	};

	useEffect(() => {
		if (isOpen && (!currentProcess.successes || !currentProcess.failures)) getFullInfos();
	}, [isOpen]);

	return (
		<CardBackground isNew={currentProcess.isViewed || false} isOpen={isOpen}>
			<MainInfosContainer isOpen={isOpen}>
				<InfosContainer>
					<BatchInfos>
						<h3>{MESSAGES.NOTIFICATIONS.ADD_MEMBER}</h3>
						<p> - {moment(currentProcess.createdAt).format("DD/MM/YYYY - HH:mm")}</p>
					</BatchInfos>
					<StatusInfos>
						<p><b>{MESSAGES.NOTIFICATIONS.STATUS}</b>{
							currentProcess?.isFinished ?
								MESSAGES.NOTIFICATIONS.FINISHED :
								MESSAGES.NOTIFICATIONS.WORKING}</p>
					</StatusInfos>
				</InfosContainer>
				<IconContainer onClick={() => setIsOpen(prev => !prev)}>
					{isOpen ?
						<IoIosArrowUp color={currentTheme.primary} fontSize="2.0em" /> :
						<IoIosArrowDown color={currentTheme.primary} fontSize="2.0em" />
					}
				</IconContainer>
			</MainInfosContainer>
			<StudentsInfoContainer isOpen={isOpen}>
				<hr />
				<StudentsListContainer>
					<h4>{MESSAGES.NOTIFICATIONS.ADDED_STUDENTS}</h4>
					<ListContainer>
						{
							currentProcess.successes && currentProcess.successes.map((student, index) => {
								return (
									<StudentName key={index} changeBackground={index % 2 !== 0} >{student}</StudentName>
								);
							})
						}
					</ListContainer>
				</StudentsListContainer>
				{
					currentProcess.failures && currentProcess.failures.length > 0 &&
                    (
                    	<>
                    		<StudentsListContainer>
                    			<h4>{MESSAGES.NOTIFICATIONS.FAILED_STUDENTS}</h4>
                    			<ListContainer>
                    				{
                    					currentProcess.failures && currentProcess.failures.map((student, index) => {
                    						return (
                    							<StudentName key={index} changeBackground={index % 2 !== 0}>{student.email}</StudentName>
                    						);
                    					})
                    				}
                    			</ListContainer>
                    		</StudentsListContainer>
                    		<small>{MESSAGES.NOTIFICATIONS.ERROR_TIP}</small>
                    	</>
                    )
				}
			</StudentsInfoContainer>
		</CardBackground>
	);

};