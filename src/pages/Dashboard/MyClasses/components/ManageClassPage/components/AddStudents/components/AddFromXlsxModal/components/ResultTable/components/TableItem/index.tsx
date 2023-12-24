import React from "react";
import { Student } from "../../../../../../../../../../../../../types/Student";
import { TdItemStyled } from "./styles";

interface TableItemProps {
    currentStudent: Student;
    index: number;
}

const TableItem = (props: TableItemProps) => {

	return (
		<tr>
			<TdItemStyled index={props.index} style={{borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}}>{props.currentStudent.name}</TdItemStyled>
			<TdItemStyled index={props.index}>{props.currentStudent.email}</TdItemStyled>
			<TdItemStyled index={props.index} style={{borderTopRightRadius: "8px", borderBottomRightRadius: "8px"}}>{props.currentStudent.registration ?? ""}</TdItemStyled>
		</tr>
	);
};

export default TableItem;