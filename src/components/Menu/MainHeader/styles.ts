import styled from "styled-components";
import { TRANSITION_TIME } from "../../../constants/menu";

interface ContainerProps {
    sideBarOpen: boolean,
}

export const HeaderStyled = styled.header<ContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 1%;
    padding-bottom: 1%;
    height: 8%;
    position: fixed;
    width: 100%;
    background-color: ${props => props.theme.background};
    z-index: 99;


    > h1 {
        color: ${props => props.theme.primary};
        display: flex;
        width: 100%;
        min-width: 280px;
        padding-left: ${props => props.sideBarOpen ? 310 : 100}px;
        font-family: "bold";

        transition: padding-left ${TRANSITION_TIME};
        transition-delay: ${props => props.sideBarOpen ? TRANSITION_TIME : 0};

    }
`;