import styled from "styled-components";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../constants/frequency";

export const TableHeaderStyled = styled.tr`
  
	th {
		font-size: 18px;
		font-weight: 100;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 10px;
		font-family: "Bold";
		color: ${props => props.theme.primary};

		h5 {
			font-size: 18px;
			font-family: "Bold";
		}

		p {
			font-size: 13px;
			font-family: "Normal";
			color: ${props => props.theme.secondaryText};
			margin-top: -3px;
		}

	}
`;


interface TableRowStyledProps {
	index: number;
}

export const TableRowStyled = styled.tr<TableRowStyledProps>`
	background-color: ${props => props.index % 2 === 0 ? props.theme.background : props.theme.backgroundLight};
	height: 30px;
	text-align: center;
`;

interface FrequencyDataStyledProps {
	value: string;
}

export const FrequencyDataStyled = styled.td<FrequencyDataStyledProps>`
	color: ${props => props.value === AVAILABLE_FREQUENCY_STATUS.get(2)?.name ? props.theme.error : props.theme.primary};
	font-family: "Bold";
	min-width: 100px;
`;


export const TableStyled = styled.table`
	width: 100%;
	/* min-width: 1000px; */
	flex-direction: column;
	/* overflow-x: scroll; TODO: Not working - Maybe a month filter work better? */

	td:first-child {
		text-align: left;
		padding-left: 16px;
		border-top-left-radius:11px;
   		border-bottom-left-radius:11px;
	}

	th:first-child {
		text-align: left;
		padding-left: 16px;
	}

	td:last-child {
   		border-bottom-right-radius:11px;
   		border-top-right-radius:11px;
	}
`;




