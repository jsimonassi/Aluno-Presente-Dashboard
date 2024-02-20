import styled from "styled-components";


export const PageBackground = styled.div`
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.primary};
`;


export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70%;
	background-color: ${props => props.theme.surface1};
	border-radius: 24px;
	padding: 20px;
	box-sizing: border-box;
    max-width: 700px;

	> span {
		color: ${props => props.theme.primary};
		font-size: 12px;
		font-family: "light";
		margin-top: 24px;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;

	h1 {
		font-size: 28px;
		margin-left: 10px;
		text-align: center;
		font-weight: 500;
		line-height: 30px;
		color: ${props => props.theme.primary};
        font-family: "bold";
	}

	div {
		margin-right: 10px;
		&:hover {
			cursor: pointer;
		}
	}
`;

export const Body = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 20px;

	p {
		font-size: 14px;
		font-family: "light";
		text-align: center;
		margin: 20px 0;
		color: ${props => props.theme.primary};
	}

	h4 {
		color: ${props => props.theme.primary};
		width: 100%;
		margin-left: 30px;
	}
`;

export const Footer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	margin-top: 20px;

	button {
		max-width: 300px;
		height: 55px;
		border-radius: 24px;
	}
`;

export const QrCodeContainer = styled.div`
	border: 2px solid ${props => props.theme.primary};
	padding: 10px;
	border-radius: 16px;
	margin-bottom: 16px;
`;

export const StudentsListContainer = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 10px;
	background-color: ${props => props.theme.surface2};
	padding: 24px;
	box-sizing: border-box;
	border-radius: 16px;
	max-height: 250px;
	overflow-y: scroll;
`;

export const StudentItem = styled.li<StudentItemProps>`
  	list-style-type: none;
	background-color: ${props => props.index % 2 === 0 ? props.theme.surface1 : props.theme.surface2};
	border-radius: 8px;
	padding: 8px;
	color: ${props => props.theme.primary};
`;

interface StudentItemProps {
	index: number
}