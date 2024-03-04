import styled from "styled-components";
import { DEVICE } from "../../../../../../../../../../../constants/screenSize";

interface ModalProps {
	isOpen: boolean,
}

export const ModalContainer = styled.div<ModalProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	opacity: ${props => props.isOpen ? 1 : 0};
	visibility: ${props => props.isOpen? "visible" : "hidden"};
	transition: visibility 0s, opacity 0.3s linear;
`;


export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 600px;
	background-color: ${props => props.theme.surface1};
	border-radius: 24px;
	padding: 20px;
	box-sizing: border-box;
`;

export const ModalHeader = styled.div`
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

export const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 30px;
	margin-top: 20px;

	justify-content: center;
	align-items: center;

    @media ${DEVICE.TABLET} {
        overflow-y: scroll;
        padding-right: 10px;
    }

	h3 {
		font-size: 24px;
		font-family: "Medium";
		color: ${props => props.theme.primary};
		text-align: center;
		margin-bottom: 28px;
		background-color: ${props => props.theme.surface2};
		border-radius: 16px;
		padding: 10px;
	}

	p {
		color: ${props => props.theme.primary};
		font-family: "Light";
		text-align: center;
	}
	
	b {
		font-family: "Bold"
	}
`;

export const RowItem = styled.div`
	display: flex;
	flex-direction: row;
	max-width: 500px;
	text-align: start;
	width: 95%;

	b {
		margin-right: 8px;
		min-width: 100px;
		white-space: nowrap;
	}
`;

export const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;

    @media ${DEVICE.TABLET} {
        flex-direction: column;
    }
`;


export const ModalFooter = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	align-items: center;
	margin-top: 30px;

	button {
		width: 30%;
		border-radius: 15px;
		background-color: ${props => props.theme.primaryColor};
        min-width: 200px;
		margin: 0;
	}

`;
