import styled from "styled-components";
import { DEVICE } from "../../../../../../../../../constants/screenSize";


export const Container = styled.div`
    background-color: ${props => props.theme.surface1};
    width: 100%;
    max-width: 2000px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    padding: 24px;
    box-sizing: border-box;
`;


export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5%;
    justify-content: space-between;

    @media ${DEVICE.DESKTOP} {
        flex-direction: column;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;

    button {
        min-width: 150px;
        border-radius: 16px;
        padding: 16px;
        box-sizing: border-box;
        font-size: 16px;
        margin: 0;
        margin-left: 16px;

        @media ${DEVICE.DESKTOP} {
            margin: 32px 8px 0 8px;
        }
    }
`;

export const LoaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

export const TipContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 15px;
`;

export const TipItem = styled.div<TipProps>`
    margin-left: 8px;
    display: flex;
    color: ${props => props.theme.primary};

    h4 {
        font-size: 16px;
        color: ${props => props.useRed ? props.theme.error : props.theme.primary};
        margin-left: 8px;
        font-family: "Bold"
    }

    p {
        margin-left: 8px;
    }
`;


interface TipProps {
    useRed?: boolean;
}