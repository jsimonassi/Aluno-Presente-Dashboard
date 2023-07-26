import styled from "styled-components";

interface ITableItemProps {
    index: number;
}

export const TdItemStyled = styled.td<ITableItemProps>`
	color: ${props => props.theme.primary};
	justify-content: center;
	align-items: center;
	text-align: center;
	font-family: "Normal";
	height: 35px;
    background-color: ${props => props.index % 2 === 0 ? props.theme.secondary : props.theme.surface2};
`;