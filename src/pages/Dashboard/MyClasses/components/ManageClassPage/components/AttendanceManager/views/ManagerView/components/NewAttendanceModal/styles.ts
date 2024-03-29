import styled from "styled-components";

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
	width: 60%;
	background-color: ${props => props.theme.surface1};
	border-radius: 24px;
	padding: 20px;
	box-sizing: border-box;
    max-width: 1000px;
`;

export const ModalHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;

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
	align-items: center;
	width: 100%;
	padding-left: 10px;
	padding-right: 10px;
	max-height: 500px;
	overflow-y: auto;
	overflow-x: hidden;

	> span {
		color: ${props => props.theme.primary};
		font-size: 14px;
		font-family: "light";
		margin-top: 4px;
		margin-left: 24px;
		width: 100%;
	}
`;

export const SelectContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-top: 16px;
	margin-left: 24px;

	&:hover {
		cursor: pointer;
	}

	input {
		margin-right: 8px;
	}

	label {
		font-size: 14px;
		font-family: "normal";
		color: ${props => props.theme.primary};

		&:hover {
		cursor: pointer;
	}
	}
`;

export const OptionLabel = styled.h3`
	font-size: 16px;
	width: 100%;
	padding-left: 8px;
	box-sizing: border-box;
	font-family: "normal";
	color: ${props => props.theme.primary};
	margin-top: 16px;
	margin-bottom: 8px;
`;


export const ModalFooter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	padding: 10px;

	> button {
		max-width: 250px;
		border-radius: 16px;
	}
`;