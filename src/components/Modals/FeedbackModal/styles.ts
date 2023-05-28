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
	width: 80%;
	background-color: ${props => props.theme.surface1};
	border-radius: 24px;
	padding: 20px;
	box-sizing: border-box;
    max-width: 400px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

    h1 {
        font-size: 26px;
        color: ${props => props.theme.primary};
        margin-bottom: 10px;
    }
`;