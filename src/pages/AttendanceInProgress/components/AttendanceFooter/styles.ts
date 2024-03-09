import styled from "styled-components";

export const PageFooter = styled.div`
	display: flex;
	position: fixed;
	justify-content: center;
	align-items: center;
	bottom: 0;
	width: 100%;
	height: 70px;
	background-color: ${props => props.theme.primary};

	span {
		font-size: 16px;
		color: ${props => props.theme.whiteText};
		font-family: "light";
		margin-right: 5px;
	}

	a {
		font-size: 16px;
		color: ${props => props.theme.whiteText};
		font-family: "normal";
		text-decoration: underline;

		&:hover {
			cursor: pointer;
		}
	}
`;