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
	visibility: ${props => props.isOpen ? "visible" : "hidden"};
	transition: visibility 0s, opacity 0.3s linear;
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	background-color: ${props => props.theme.surface1};
	border-radius: 24px;
	padding: 20px;
	box-sizing: border-box;
    max-width: 600px;
	min-width: 300px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

    > h1 {
        font-size: 26px;
        color: ${props => props.theme.primary};
        margin-bottom: 10px;
    }
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;

	h1 {
		font-size: 26px;
		color: ${props => props.theme.primary};
	}
`;

export const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	overflow-y: auto;
`;

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 20px;

	button {
		max-width: 200px;
	}
`;

export const CloseButtonContainer = styled.div`
	display: flex;

	&:hover {
		cursor: pointer;
	}
`;

export const AddContactButtonContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	width: 100%;
	margin-top: 20px;

	button {
		max-width: 150px;
		height: 40px;
		font-size: 16px;
	}
`;

export const ProfileLetterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: ${props => props.theme.primary};
	margin-bottom: 20px;

	h1 {
		font-size: 56px;
		line-height: 48px;
		margin-top: 10px;
		color: ${props => props.theme.whiteText};
	}
`;

export const ContactCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	overflow-x: hidden;
	margin-top: 10px;
	min-height: 100px;

	h3 {
		font-size: 12px;		
		width: 100%;
		padding-left: 8px;
		margin-bottom: 8px;
		box-sizing: border-box;
		text-align: left;
		color: ${props => props.theme.primary};
	}
`;

export const NoneContactContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: ${props => props.theme.surface2};
	border-radius: 16px;
	color: ${props => props.theme.primary};
	height: 80px;
`;