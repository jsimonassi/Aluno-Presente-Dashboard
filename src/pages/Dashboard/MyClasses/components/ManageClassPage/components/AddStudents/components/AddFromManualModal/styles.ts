import styled from "styled-components";
import { DEVICE } from "../../../../../../../../../constants/screenSize";

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
	width: 80%;
	background-color: ${props => props.theme.surface1};
	border-radius: 24px;
	padding: 24px 24px 0px 24px;
	box-sizing: border-box;
    max-width: 1000px;
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
    max-height: 500px;

	input {
		margin-bottom: 10px;
	}

	small {
		margin-top: 20px;
	}


    @media ${DEVICE.TABLET} {
        overflow-y: scroll;
        padding-right: 10px;
    }
`;



export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	align-items: center;

	button {
		width: 30%;
		border-radius: 15px;
		background-color: ${props => props.theme.primaryColor};
        min-width: 200px;
	}

	p {
		text-decoration: underline;
		color: ${props => props.theme.textColor};
		font-family: "normal";
		font-size: 14px;

		&:hover {
			cursor: pointer;
		}
	}
`;

export const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
`;


