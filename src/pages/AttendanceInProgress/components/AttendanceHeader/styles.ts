import styled from "styled-components";

export const LogoContainer = styled.div`
	display: flex;
	position: fixed;
	justify-content: center;
	top: 0;
	width: 100%;
	height: 70px;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.primary};

	img {
		height: 50px;
	}
`;