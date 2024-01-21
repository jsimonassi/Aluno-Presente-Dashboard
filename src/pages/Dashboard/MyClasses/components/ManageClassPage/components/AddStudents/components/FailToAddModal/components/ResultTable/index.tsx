import React from "react";
import MESSAGES from "../../../../../../../../../../../constants/messages";
import { TableContainer, TableHeaderStyled } from "./styles";
import { TableItem } from "./components";
import { FailAddedStudent } from "../../../../../../../../../../../types/api/Student";

interface ResultTableProps {
	studentsWithFail: FailAddedStudent[] | null;
}

const ResultTable = (props: ResultTableProps) => {

	console.log(props.studentsWithFail);

	const getTableContent = () => {
		if (!props.studentsWithFail || props.studentsWithFail.length === 0) {
			return null;
		}

		return (
			<table cellSpacing={0} cellPadding={0}>
				<thead>
					<TableHeaderStyled >
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FAIL_TO_ADD_MODAL.NAME}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FAIL_TO_ADD_MODAL.REASON}</th>
					</TableHeaderStyled>
				</thead>
				<tbody>
					{
						props.studentsWithFail?.map((currentStudent, index) => (
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