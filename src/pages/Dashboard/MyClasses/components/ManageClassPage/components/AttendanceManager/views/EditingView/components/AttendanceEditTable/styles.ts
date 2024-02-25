import styled from "styled-components";

const firstItemWidth = 350;
const otherItemWidth = 130;


export const DivTableContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow-x: scroll;
`;

export const HeaderContainer = styled.div<ContainersProps>`
	height: 60px;
	width: ${props => props.itemCount * otherItemWidth + firstItemWidth}px;
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid ${props => props.theme.surface2};
`;

export const HeaderItem = styled.div <ItemProps>`
	width: ${props => props.isFirst ? firstItemWidth+"px" : otherItemWidth+"px"};
	display: flex;
	justify-content: center;
	align-items: ${props => props.isFirst ? "flex-start" : "center"};
	flex-direction: column;
	padding: 0px 10px;
	margin: 5px 1px;
	box-sizing: border-box;
	/* background-color: tomato; */

	h3 {
		color: ${props => props.theme.primary};
		font-size: 18px;
		font-family: "bold"
	}

	p {
		color: ${props => props.theme.secondaryText};
		font-family: "light";
		font-size: 12px;
		line-height: 12px;
	}
`;

export const RowContainer = styled.div<ContainersProps>`
	width: ${props => props.itemCount * otherItemWidth + firstItemWidth}px;
	height: 500px;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
`;

export const RowStyled = styled.div<RowStyledProps>`
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: ${props => props.index % 2 === 0 ? props.theme.surface1 : props.theme.surface2};
	border-radius: 8px;
`;

export const RowItem = styled.div<ItemProps>`
	width: ${props => props.isFirst ? firstItemWidth + "px" : otherItemWidth + "px"};
	display: flex;
	flex-direction: row;
	justify-content: ${props => props.isFirst ? "flex-start" : "center"};
	align-items: center;
	padding: 0px 10px;
	margin: 5px 1px;
	box-sizing: border-box;
	/* background-color: blue; */

	
	color: ${props => props.value === "F" ? props.theme.error : props.theme.primary};
	font-size: 16px;
	font-family: ${props => props.isFirst ? "light" : "bold"};
	
`;

interface ItemProps {
	isFirst?: boolean;
	value?: string;
}

interface ContainersProps {
	itemCount: number;
}

interface RowStyledProps {
	index: number;
}