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
    align-items: center;
    color: ${props => props.theme.primary};

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
