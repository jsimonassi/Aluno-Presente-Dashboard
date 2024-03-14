import styled from "styled-components";
import { DEVICE } from "../../../constants/screenSize";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* background-color: ${props => props.theme.surface1}; */
    background-color: ${props => props.theme.surface1};
    border-radius: 32px;
    padding: 32px;
    box-sizing: border-box;
`;

export const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    > img {
        max-width: 350px;
    }

    > h1 {
        font-size: 24px;
        font-weight: 600;
        color: ${props => props.theme.primary};
        margin-top: 10px;
    }

    > p {
        font-size: 16px;
        font-family: "light";
        color: ${props => props.theme.secondaryText};
    }
`;

export const ContentContainer = styled.div<ClassCardContainerProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.gridStyle}, auto);
    justify-content: space-around;
    grid-gap: 5px;
    flex-wrap: wrap;
    width: 100%;
    max-width: 500px;
    margin-bottom: 30px;

    @media ${DEVICE.DESKTOP} {
        grid-template-columns: auto;
    }
`;

export const AllClassContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface ClassCardContainerProps {
    gridStyle?: 1 | 2 | 3;
}