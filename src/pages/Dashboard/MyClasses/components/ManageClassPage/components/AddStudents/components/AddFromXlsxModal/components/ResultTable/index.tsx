import React from "react";
import MESSAGES from "../../../../../../../../../../../constants/messages";
import { TableContainer, TableHeaderStyled } from "./styles";
import { Student } from "../../../../../../../../../../../types/Student";
import { TableItem } from "./components";

interface ResultTableProps {
	finnedStudents: Student[] | null;
}

const ResultTable = (props: ResultTableProps) => {

	const getTableContent = () => {
		if (!props.finnedStudents) {
			return (<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.NULL_LIST}</p>);
		}

		if (props.finnedStudents.length === 0) {
			return (<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.EMPTY_LIST}</p>);
		}

		return (
			<table cellSpacing={0} cellPadding={0}>
				<thead>
					<TableHeaderStyled >
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.NAME}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.EMAIL}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.CPF}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.NUMBER}</th>
					</TableHeaderStyled>
				</thead>
				<tbody>
					{
						props.finnedStudents?.map((currentStudent, index) => (
							<TableItem
								key={index}
								index={index}
								currentStudent={currentStudent}
							/>
						))
					}
				</tbody>
			</table>
		);
	};

	return (
		<TableContainer>
			{getTableContent()}
		</TableContainer>
	);

};

export default ResultTable;