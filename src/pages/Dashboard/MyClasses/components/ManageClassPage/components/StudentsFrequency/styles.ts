import styled from "styled-components";
import { DEVICE } from "../../../../../../../constants/screenSize";


export const Container = styled.div`
    background-color: ${props => props.theme.surface1};
    width: 100%;
    max-width: 2000px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    border-radius: 32px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    padding: 24px 32px 24px 32px;
    box-sizing: border-box;

    h1 {
        font-size: 20px;
        font-family: "bold";
        color: ${props => props.theme.primary};
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h3 {
        color: ${props => props.theme.primary};
    }

    @media ${DEVICE.TABLET} {
        flex-direction: column;
    }
`;

export const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8px;
`;

export const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    color: ${props => props.theme.primary};

    h3 {
        font-style: "Bold";
        font-size: 16px;
        margin-left: 8px;
    }

    p {
        font-size: 16px;
        margin-left: 4px;
    }
`;

export const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    img {
        max-width: 350px
    }

    p {
        font-size: 18px;
        color: ${props => props.theme.secondaryText};
        font-family: "Light";
        text-align: center;
    }
`;