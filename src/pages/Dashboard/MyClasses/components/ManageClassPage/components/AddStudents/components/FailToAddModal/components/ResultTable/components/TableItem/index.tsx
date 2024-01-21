import React from "react";
import { TdItemStyled } from "./styles";
import { FailAddedStudent } from "../../../../../../../../../../../../../types/api/Student";

interface TableItemProps {
    currentStudent: FailAddedStudent;
    index: number;
}

const TableItem = (props: TableItemProps) => {

	return (
		<tr>
			<TdItemStyled index={props.index} style={{borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}}>{props.currentStudent.alias}</TdItemStyled>
			<TdItemStyled index={props.index}>{props.currentStudent.reason}</TdItemStyled>
		</tr>
	);
};

export default TableItem;