import styled from "styled-components";

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
	}
`;

export const TableContainer = styled.div`
	width: 100%;
	display: flex;
	max-height: 300px;
	overflow-y: scroll;

	table {
		width: 100%;
	}

	p {
		font-size: 14px;
		width: 100%;
		text-align: center;
		font-family: "light";
	}
`;