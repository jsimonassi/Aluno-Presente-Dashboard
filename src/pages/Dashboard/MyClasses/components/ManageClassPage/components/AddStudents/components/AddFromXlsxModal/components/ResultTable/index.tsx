import React from "react";
import MESSAGES from "../../../../../../../../../../../constants/messages";
import { TableHeaderStyled } from "./styles";

const ResultTable = () => {

	return (
		<div>
			<table>
				<thead>
					<TableHeaderStyled >
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.NAME}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.EMAIL}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.CPF}</th>
						<th>{MESSAGES.MY_CLASSES.MANAGE_CLASS.ADD_FROM_XLSX_MODAL.NUMBER}</th>
					</TableHeaderStyled>
				</thead>
				<tbody>
					{/* {
						props.result.map((user, index) => (
							<>
								<TableItem
									key={index}
									user={user}
									onClickEdit={props.onClickEdit}
									onClickDelete={props.onClickDelete}
								/>
								<LineTr theme={currentTheme}>
									<td colSpan={4}>
										<Line theme={currentTheme} />
									</td>
								</LineTr>
							</>
						))
					} */}
				</tbody>
			</table>
		</div>
	);

};

export default ResultTable;