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
    z-index: 100;
    opacity: ${props => props.isOpen ? 1 : 0};
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    transition: visibility 0s, opacity 0.3s linear;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    height: 40%;
    min-width: 400px;
    background-color: ${props => props.theme.backgroundCard};
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h3 {
        font-size: 28px;
        padding: 10px;
        text-align: center;
        font-weight: 500;
        line-height: 30px;
        color: ${props => props.theme.surface2};
    }

    div {
        &:hover {
            cursor: pointer;
        }
    }
`;

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: scroll;

    p {
        color: ${props => props.theme.primary};
    }

    h4 {
        color: ${props => props.theme.primary};
    }

    h6 {
        color: ${props => props.theme.primary};
    }  
`;

export const UpdateInfos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
`;

export const ChangeInfos = styled.p`
    font-weight: 300;
    font-size: 13px;
    font-family: "Normal";
    margin-left: 10px;
`;




