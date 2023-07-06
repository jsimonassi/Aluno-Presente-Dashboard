import styled from "styled-components";


export const Container = styled.div`

`;

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

// export const ThDateContainer = styled.th`
// 	display: flex;
// 	justify-content: center;
// 	flex-direction: column;
// `;