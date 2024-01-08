import styled from "styled-components";
import { DEVICE } from "../../../constants/screenSize";

interface ContainerProps {
    disabled?: boolean;
    isError?: boolean;
}

export const StackContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    opacity: ${props => props.disabled ? 0.5 : 1};

    h5 {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
        margin-left: 10px;
        color: ${props => props.theme.primary};
    }

    div {
        &:hover {
            cursor: pointer;
        }
    }

    p {
        color: ${props => props.theme.primary};
        font-size: 16px;
        font-weight: 400;
        width: 100%;
    }

    span {
        color: ${props => props.theme.error};
        font-size: 12px;
        margin-left: 8px;
        margin-top: 3px;
        margin-bottom: 10px;
        font-family: "Normal";
    }
`;

interface pProps {
    hasValue?: boolean;
}

export const ValueStyled = styled.p<pProps>`
    color: ${props => props.theme.primary};
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    opacity: ${props => props.hasValue  ? 1 : 0.5};
`;

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    border-radius: 16px;
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${props => props.theme.background};
    border: ${props => props.isError ? `1px solid ${props.theme.error}` : "none"};
`;

export const Spacing = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 40px;
    width: 100%;
    padding-top: 10px;
    z-index: 999;

    @media ${DEVICE.MOBILE} {
        margin-top: 60px;
    }
`;

export const ItemsContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: ${props => props.theme.background};
    width: 200px;
    border-bottom-left-radius: 16px;
    border-top-left-radius: 16px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    max-height: 250px;
    overflow-y: scroll;
    z-index: 9999;
`; 

export const DropdownItem = styled.div<ContainerProps>`
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 5px;

    &:hover {
        background-color: ${props => props.theme.surface1};
    }
`;

