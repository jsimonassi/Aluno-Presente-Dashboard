import styled from "styled-components";
import { DEVICE } from "../../../constants/screenSize";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    h2 {
        margin-top: 40px;
        font-size: 20px;
        max-width: 800px;
        width: 80%;
        text-align: left;
    }

    p {
        width: 80%;
        text-align: justify;
        margin-top: 20px;
        max-width: 800px;
        font-family: 'XLight';
    }

    h3 {
        width: 70%;
        margin-top: 30px;
        text-align: end;
        padding-bottom: 50px;
        max-width: 800px;
    }

    b {
        font-family: 'medium';
    }
`;

export const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 200px;
    margin-top: 20px;
    box-sizing: border-box;
    background-color: ${props => props.theme.primary};
    border-radius: 24px;
    max-width: 800px;

    img {
        width: 13rem;
        height: 8rem;
    }

    h1 {
        font-size: 36px;
        color: ${props => props.theme.surface1};
        margin-left: 10px;
        margin-top: 10px;
    }

    @media ${DEVICE.DESKTOP} {
        display: none;
    }
`;