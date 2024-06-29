import styled from "styled-components";
import { DEVICE } from "../../../constants/screenSize";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.surface1};
    border-radius: 32px;
    padding: 32px;
    box-sizing: border-box;
    align-items: center;
`;

export const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 16px;
`;

export const ShowMoreInfoStyled = styled.p`
    /* font-size: 14px; */
    /* font-family: "bold"; */
    width: 100%;
    text-align: center;
    color: ${props => props.theme.primary};
    margin-top: 16px;
    text-decoration: underline;
    cursor: pointer;
`;


export const FooterInfos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    button {
        max-width: 200px;
        margin: 0;
    }
    
    b {
        font-size: 14px;
        font-family: "bold";
        color: ${props => props.theme.secondaryText};
    }

    p {
        font-size: 14px;
        font-family: "Light";
        color: ${props => props.theme.secondaryText};
    }

    @media ${DEVICE.MOBILE} {
        flex-direction: column-reverse;

        p {
            margin-top: 16px;
        }
    }
`;

